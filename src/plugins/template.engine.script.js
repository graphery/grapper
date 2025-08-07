import svgPlugin from './template.engine.js';

if (globalThis.gSVG) {
  globalThis.gSVG.install(svgPlugin);
}

customElements
  .whenDefined('grapper-view')
  .then(view => {
    view.install(svgPlugin);
  });
