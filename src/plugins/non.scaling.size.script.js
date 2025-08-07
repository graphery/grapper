import svgPlugin from './non.scaling.size.js';

if (globalThis.gSVG) {
  globalThis.gSVG.install(svgPlugin);
}

customElements
  .whenDefined('grapper-view')
  .then(view => {
    view.install(svgPlugin);
  });
