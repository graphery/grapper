import '../component/view.js';
import {
  Base,
  define,
  FIRE_EVENT
}                           from '../core/base.js';
import {
  csvStr2obj,
  isLikeArray,
  isLikeObject,
  jsStr2obj,
}                           from "../core/helpers/types.js";
import { deepObjectAssign } from "../core/helpers/objects.js";

class ComponentBase extends Base {
  constructor () {
    super();
    this.shadowRoot.addEventListener('load', (e) => {
      this[FIRE_EVENT]('load', {...e.detail, data: this.data, config: this.config});
    });
    this.shadowRoot.addEventListener('update', (e) => {
      this[FIRE_EVENT]('update', {...e.detail, data: this.data, config: this.config});
    });
    this.shadowRoot.addEventListener('render', (e) => {
      this[FIRE_EVENT]('render', {...e.detail, data: this.data, config: this.config});
    });
    this.#loadData();
    this.#loadConfig();
  }

  async #fetch (url) {
    const res = await fetch(url)
    if (res.status !== 200) {
      throw new Error(`${ res.statusText } (${ res.status }): ${ res.url }`);
    }
    return res.text();
  }

  async #loadData () {
    const el    = this.querySelector(`script[type=data],g-script[type=data]`);
    const url   = el?.getAttribute('src') || this.getAttribute('data-src');
    let content = url ?
      await this.#fetch(url) :
      el?.textContent;
    if (content) {
      this.data = isLikeObject(content) || isLikeArray(content) ?
        jsStr2obj(content) :
        csvStr2obj(content);
    }
  }

  async #loadConfig () {
    const el    = this.querySelector(`script[type=config],g-script[type=config]`);
    const url   = el?.getAttribute('src') || this.getAttribute('config-src');
    let content = url ?
      await this.#fetch(url) :
      el?.textContent;
    if (content) {
      this.config = jsStr2obj(content);
    }
  }

  get #gview () {
    return this.shadowRoot.querySelector('grapper-view');
  }

  set data (data) {
    if (this.#gview?.loaded) {
      this.#gview.data = data;
    } else {
      const eventHandler = () => {
        this.#gview.data = data;
        this.removeEventListener('load', eventHandler);
      }
      this.addEventListener('load', eventHandler);
    }
  }

  get data () {
    return this.#gview.data;
  }

  set config (config) {
    if (this.#gview?.loaded) {
      deepObjectAssign(this.#gview.config, config);
    } else {
      const eventHandler = () => {
        deepObjectAssign(this.#gview.config, config);
        this.removeEventListener('load', eventHandler);
      }
      this.addEventListener('load', eventHandler);
    }
  }

  get config () {
    return this.#gview.config;
  }

  get loaded () {
    return this.#gview.loaded;
  }

}

define(ComponentBase)
  .attr({
    name : 'value',
    set (v) {
      this.data = {value : v}
    },
    get () {
      return this.data?.value;
    }
  });

export default function defineComponent (name, code) {
  let Component = customElements.get(name);
  if (!Component) {
    Component = class extends ComponentBase {
      constructor () {
        super();
        this.shadowRoot.innerHTML = `
          <style>
            :host {
              display : inline-block;
              width   : max-content;
              height  : max-content;
            }
            grapper-view {
              width  : auto;
              height : auto;
            }
          </style>
          ${ code }
        `;
      }
    }
    customElements.define(name, Component);
  }
  return Component;
}