import svgPlugin from './observe.style.js';

if (globalThis.gSVG) {
  globalThis.gSVG.install(svgPlugin);
}

customElements
  .whenDefined('grapper-view')
  .then(view => {
    view.install(svgPlugin);
  });
