import { isFunction, isUndefined } from "../core/helpers/types.js";

const PROFILE_LEVEL  = Symbol('Template Profile - 3');
const PROFILE_LOGGER = Symbol('Template Profile - Logger');
const url            = new URL(import.meta.url);
const initialLevel          = Number(url.searchParams.get("level")) || 0;

const PRECISION = 8;

function install (setup) {

  let data = new Map();

  // Helper: log a table to the logger
  function logTable (logger, arr) {
    if (arr.length === 0) {
      return;
    }
    const keys = Object.keys(arr[0]);

    // widths
    const widths = keys.map(k =>
      Math.max(k.length, ...arr.map(r => String(r[k]).length))
    );

    // header
    const header    = "| " + keys.map((k, i) => k.padEnd(widths[i])).join(" | ") + " |";
    const separator = "| " + widths.map(w => "-".repeat(w)).join(" | ") + " |";

    logger.log(`Template Profile - directives:\n${ header }\n${ separator }`);

    // rows
    arr.forEach(row => {
      const line = "| " + keys.map((k, i) => String(row[k]).padEnd(widths[i])).join(" | ") + " |";
      logger.log(line);
    });
  }


  // Helper: record a measured duration for a key
  function recordTiming (data, key, duration) {
    const entry = data.get(key) || {count : 0, total : 0};
    entry.count += 1;
    entry.total += duration;
    data.set(key, entry);
  }

  // Helper: build a displayable array/object for table
  function buildTimingTable (data) {
    const rows = [];
    for (const [key, {count, total}] of data) {
      rows.push({
        code: key,
        count,
        total   : Number(total.toFixed(PRECISION)),
        average : Number((total / count).toFixed(PRECISION))
      });
    }
    return rows;
  }

  // Create a profiler wrapper for directive exec functions
  function createDirectiveProfiler (originalExec, keyFn) {
    return function (gObject, opts) {
      const top   = gObject.top();
      const level = top[PROFILE_LEVEL];
      if (level < 2) return originalExec.call(this, gObject, opts);
      const start  = performance.now();
      const result = originalExec.call(this, gObject, opts);
      const end    = performance.now();
      const key    = keyFn(gObject, opts);
      recordTiming(data, key, end - start);
      return result;
    };
  }

  // -----------------------
  // Profile render()
  // -----------------------
  setup.extendInstance((obj) => {
    if (isFunction(obj.render)) {
      const originalRender = obj.render;
      obj.render           = function (...args) {
        const level = this[PROFILE_LEVEL];
        if (level < 1) return originalRender.apply(this, args);
        this[PROFILE_LOGGER].log(`Template Profile - level = ${ level }`);
        data         = new Map();
        const start  = performance.now();
        const result = originalRender.apply(this, args);
        const end    = performance.now();
        logTable(this[PROFILE_LOGGER], buildTimingTable(data));
        this[PROFILE_LOGGER].log(`Template Profile - render(): ${ (end - start).toFixed(PRECISION) }ms`);
        return result;
      };
    }
  });

  // -----------------------
  // Profile directives
  // -----------------------
  const {getDirective} = setup.extendTemplate;

  // Directives
  const directives = {
    'g-for'     : (gObject, opts) => `<${ gObject.tagName() } g-for="${ opts.expr }" >`,
    'g-bind'    : (gObject, opts) => `<${ gObject.tagName() } g-bind:${ opts.arg }="${ opts.expr }" >`,
    'g-on'      : (gObject, opts) => `<${ gObject.tagName() } g-on:${ opts.arg }="${ opts.expr }" >`,
    'g-if'      : (gObject, opts) => `<${ gObject.tagName() } g-if="${ opts.expr }" >`,
    'g-content' : (gObject, opts) => `<${ gObject.tagName() } g-content="${ opts.expr }" >`
  };

  for (const name of Object.keys(directives)) {
    const directive = getDirective(name);
    directive.exec  = createDirectiveProfiler(directive.exec, directives[name]);
  }

  // ----------------------
  // Define logger
  // ----------------------
  // Update gSVG
  setup.extendInstance(
    {
      profileLogger (v) {
        if (isUndefined(v)) {
          return this.top()[PROFILE_LOGGER];
        }
        this.top()[PROFILE_LOGGER] = v;
      },
      profileLevel (v) {
        if (isUndefined(v)) {
          return this.top()[PROFILE_LEVEL];
        }
        this.top()[PROFILE_LEVEL] = v;
      },
      [PROFILE_LOGGER] : console,
      [PROFILE_LEVEL]  : initialLevel
    }
  );

}

export default install;