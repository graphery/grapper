import {
  Base, define,
  RENDER, CONTEXT, FIRE_EVENT, CHANGE
}                         from '../core/base.js';
import {
  STRING, OBJECT, jsStr2obj, csvStr2obj, isLikeObject, isLikeArray, isFunction, isArray
}                         from '../core/helpers/types.js';
import intersection       from "../core/intersection.js";
import { debounceMethod } from "../core/helpers/functions.js";
import { getFunctions }   from "../core/helpers/function.create.js";
import { operations }     from "../core/helpers/array.operations.js";
import { clone }          from "../core/helpers/objects.js";
import gSVG               from '../lib/gsvg.js';
import render             from '../plugins/template.engine.js';
import shapes             from '../plugins/shapes.js';

const UPDATE      = 'update';
const LOAD        = 'load';
const TEMPLATE    = 'template';
const SVG         = 'svg';        // Keep in lowercase for Safari
const DATA        = 'data';
const METHODS     = 'methods';
const CONFIG      = 'config';
const PLUGIN      = 'plugin';
const SRC_PROP    = 'Src';
const SRC_ATTR    = 'src';
const SAFE_ORIGIN = 'safe-origin';
const SAME_ORIGIN = 'same-origin';
const queryScript = (kind) => `script[type=${ kind }],g-script[type=${ kind }]`;
const query       = (t, s) => t.querySelector(s);
const getAttr     = (el, attr) => el?.getAttribute(attr);
const hasAttr     = (el, attr) => el?.hasAttribute(attr);
const noneSize    = ['0px', 'auto'];
const isNotSize   = (svg) => {
  const style = getComputedStyle(svg.el);
  return noneSize.includes(style.width) && noneSize.includes(style.height);
};

/**
 * Returns the context of the given component.
 * @param ctx
 * @returns {{svg, config, methods, polar2cartesian, degrees2radians}}
 */
const toContext = (ctx) => {
  return {
    get svg () {
      return ctx.svg
    },
    get data () {
      return ctx.data
    },
    get config () {
      return ctx.config
    },
    get methods () {
      return ctx.methods
    },
    polar2cartesian : ctx.polar2cartesian,
    degrees2radians : ctx.degrees2radians,
    grapperView     : ctx,
  }
};

/**
 * Class representing a Grapper View.
 * @fires 'load' - This event fires when the component load the external resources.
 * @fires 'update' - This event fires when the component update the content.
 * @property {object} svg - Return the gSVG object for the graph.
 * @property {boolean} [rendered] - It's true if the component is rendering.
 * @property {boolean} [loaded] - It's true if the component is loaded.
 */
export default class View extends Base {

  /**
   * Installs the given plugin.
   * @param {Object|Function} svgPlugin - The plugin to install.
   */
  static install (svgPlugin) {
    gSVG.install(svgPlugin);
  }

  #svg           = null;
  #loaded        = false;
  #isRendering   = false;
  #errorsRender  = [];
  #errorsLoading = [];
  #delayEvent    = debounceMethod(function (event, detail) {
    this[FIRE_EVENT](event, detail)
  }, 1);


  /**
   * Logs an error message and triggers the 'error' event.
   * @param {string} message - The error message.
   * @param {string|object} scope - The scope in which the error occurred.
   * @param {string} code - Additional code related to the error. (Optional)
   * @param {Array} storage - Additional code related to the error. (Optional)
   * @return {void}
   */
  #error (message, scope, code, storage) {
    const errMsg = {
      message,
      scope,
      code,
      toString : () => `${ message }${ scope ? ` in ${ scope }` : '' }\n${ code }`
    };
    storage.push(errMsg);
    console.warn(`Grapper view - Error:\n${ errMsg }`);
    this.#delayEvent.call(this, 'error', this.errors);
  }

  /**
   * Initializes a new array for storing errors and returns a bound version of the error handler method.
   * @return {Function} A bound version of the error handler method that can be used to log errors.
   */
  #createErrorHandler (storage) {
    storage.length = 0;
    return (message, scope = '', code = '') => this.#error(message, scope, code, this.#errorsRender);
  }

  /**
   * Fetches the content from the specified URL.
   * @param {string} url - The URL to fetch data from.
   * @param {boolean} [safe=false] - Whether to use safe mode for getting the content.
   * @throws {Error} If the fetch request failed or the status code is not 200.
   * @returns {Promise<string>} A promise that resolves to the fetched content as text.
   */
  async #fetch (url, safe) {
    const res = await fetch(url, safe ? {} : {mode : SAME_ORIGIN, credentials : SAME_ORIGIN});
    if (res.status !== 200) {
      throw new Error(`${ res.statusText } (${ res.status }): ${ res.url }`);
    }
    return res.text();
  }

  /**
   * Loads plugins.
   * @private
   * @returns {Promise<void>} - A promise that resolves when all plugins are loaded.
   */
  async #loadPlugins () {
    const plugins = [...this.querySelectorAll(queryScript(PLUGIN))];
    for (let plugin of plugins) {
      const src = getAttr(plugin, SRC_ATTR);
      if (src) {
        const url = new URL(src, document.location.href);
        try {
          const lib = await import(url.href);
          if (lib?.default) {
            gSVG.install(lib.default);
          }
        } catch (err) {
          this.#error(err.message, PLUGIN, src, this.#errorsLoading);
        }
      }
    }
  }

  /**
   * Loads an SVG into the element's content area.
   * @private
   * @returns {Promise<boolean>} A promise that resolves to true if SVG loading is successful, or false otherwise.
   */
  async #loadSVG () {
    const ctx             = this [CONTEXT];
    this.#svg             = null;
    ctx.content.innerHTML = '';
    const template        = query(this, TEMPLATE);
    if (!ctx.templateSrc) {
      ctx.templateSrc = getAttr(template, SRC_ATTR);
    }
    if (ctx.templateSrc) {
      try {
        ctx.content.innerHTML = await this.#fetch(ctx.templateSrc, template?.hasAttribute(SAFE_ORIGIN));
      } catch (err) {
        this.#error(err.message, SVG, ctx.templateSrc, this.#errorsLoading);
      }
    } else {
      const templateContent = template?.content || query(this, SVG);
      if (templateContent) {
        ctx.content.append(templateContent.cloneNode(true));
      }
    }
    const svg = query(ctx.content, SVG);
    this.#svg = svg ? gSVG(svg) : null;
    return true;
  }

  async #loadScript (kind, reviver) {
    const ctx = this[CONTEXT];
    const key = kind + 'Src';
    const el  = query(this, queryScript(kind));
    let safe  = true;
    if (el) {
      ctx[key] = getAttr(el, SRC_ATTR);
      safe     = hasAttr(el, SAFE_ORIGIN);
    }
    let content = ctx[key] ?
      await this.#fetch(ctx[key], safe).catch(err => this.#error(err.message, kind, ctx[key], this.#errorsLoading)) :
      el?.textContent;
    if (content) {
      try {
        ctx[kind] = reviver(content, !ctx[key]);
      } catch (err) {
        this.#error(err.message, kind, content, this.#errorsLoading);
      }
    }
  }

  /**
   * Load methods.
   * @return {Promise<void>} A Promise that resolves once the methods are loaded.
   */
  #loadMethods () {
    return this.#loadScript(METHODS, (content) => getFunctions({
      $ : toContext(this),
    }, content));
  }

  /**
   * Loads the configuration.
   * @private
   * @return {Promise<void>} A promise that resolves after loading the configuration.
   */
  #loadConfig () {
    return this.#loadScript(CONFIG, (content, safe) => safe ?
      jsStr2obj(content) :
      JSON.parse(content));
  }

  /**
   * Loads the data.
   * @private
   * @returns {Promise<void>} A promise that resolves when the data is loaded.
   */
  #loadData () {
    return this.#loadScript(DATA, (content, safe) => {
      return isLikeObject(content) || isLikeArray(content) ?
        (safe ? jsStr2obj(content) : JSON.parse(content)) :
        csvStr2obj(content)
    });
  }

  constructor () {
    super();
    const ctx                 = this [CONTEXT];
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display : inline-block;
          width   : max-content;
          height  : max-content;
        }
      </style>
      <span></span>`;
    ctx.content               = query(this.shadowRoot, 'span');
  }

  /**
   * Render method
   * private
   */
  [RENDER] () {
    return !this.load();
  }

  /**
   * Handles changes to the mutations.
   *
   * @async
   * @param {Array} mutations - The mutations to be handled.
   * @returns {boolean} - True if the mutations were successfully handled, false otherwise.
   */
  async [CHANGE] (mutations) {
    const promises = [];
    for (let mutation of mutations) {
      const target = mutation.target;
      if (target === this && !mutation.attributeName) {
        return this.load();
      }
      if ([SVG, TEMPLATE].includes(target.tagName.toLowerCase())) {
        promises.push(this.#loadSVG());
      } else if (target.tagName === 'SCRIPT') {
        const load = {
          data    : this.#loadData,
          methods : this.#loadMethods,
          config  : this.#loadConfig
        }[target.type.toLowerCase()];
        if (load) {
          promises.push(load.bind(this)());
        }
      }
    }
    if (promises.length) {
      await Promise.all(promises);
      return this.update();
    }
  }

  /**
   * Loads necessary resources and initializes the component.
   *
   * @returns {Promise<boolean|void>} A promise that resolves to true if the loading is successful, or false if an error occurs.
   */
  async load () {

    this.#loaded        = false;
    this.#errorsLoading = [];

    // Plugins
    await this.#loadPlugins();

    await Promise.all([
      // SVG
      this.#loadSVG(),
      // Config
      this.#loadConfig(),
      // Methods
      this.#loadMethods(),
      // Data
      this.#loadData()
    ]);

    this.#loaded = true;
    this[FIRE_EVENT](LOAD);

    // Call to update
    return this.update(true);

  }

  /**
   * Updates the SVG if rendering is not in progress, unless when forced parameter is set to true.
   * If update is allowed, it clones the current data object, performs operations on it, and then renders the SVG.
   * @param {boolean} [forced=false] - Determines whether the update should be forced even if rendering is in progress.
   * @return {Promise<void>} - A promise that resolves once the SVG is rendered.
   */
  async update (forced = false) {
    if (this.#isRendering && !forced) {
      return;
    }
    if (this.#svg) {
      this.rendered     = false;
      this.#isRendering = true;
      const ctx         = this [CONTEXT];
      const data        = ctx.methods?.data ?
        ctx.methods.data(operations(clone(ctx.data))) :
        operations(clone(ctx.data));
      const renderCtx   = {
        ...ctx.methods,
        ...(isArray(data) ? {} : data),
        data,
        $ : toContext(this),
      };
      await this.#svg.render(renderCtx, this.#createErrorHandler(this.#errorsRender));
      if (isNotSize(this.#svg)) {
        this.#svg.width('100%').height('100%');
      }
      this.#isRendering = false;
      this.rendered     = true;
    }
  }

  /**
   * Returns the SVG object associated with this instance.
   * @returns {object} The SVG object.
   */
  get [SVG] () {
    return this.#svg;
  }

  /**
   * Retrieves the loaded status of the resource.
   * @returns {boolean} The loaded status of the resource.
   */
  get loaded () {
    return this.#loaded;
  }

  /**
   * Retrieves the list of errors.
   *
   * @return {Array} An array containing the errors.
   */
  get errors () {
    return [...this.#errorsLoading, ...this.#errorsRender];
  }

  get version () {
    return '%VERSION%';
  }

}

View.prototype.update = debounceMethod(View.prototype.update, 1)

// Define the component
const def = define(View)
  .ext(intersection)
  .attr({name : DATA, type : OBJECT, value : [], posUpdate : UPDATE})
  .attr({
    name : 'value',
    set (v) {
      this.data = {value : v}
    },
    get () {
      return this.data?.value;
    }
  })
  .attr({name : CONFIG, type : OBJECT, value : {}, posUpdate : UPDATE})
  .prop({name : METHODS, type : OBJECT, value : {}, posUpdate : UPDATE});

[
  TEMPLATE + SRC_PROP,
  DATA + SRC_PROP,
  METHODS + SRC_PROP,
  CONFIG + SRC_PROP
].forEach(name => {
  def.prop({name, type : STRING, value : '', posUpdate : LOAD})
});

def.tag('grapper-view')
   .alias('g-composer');

// Extension
const viewPlugin = (setup) => {
  setup.extendSetup({
    extendview (extension) {
      isFunction(extension) ?
        extension(View.prototype) :
        Object.assign(View.prototype, extension);
    }
  });
};
gSVG.install(viewPlugin)
    .install(render)
    .install(shapes);
