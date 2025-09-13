import svgPlugin from './template.profile.js';

if (globalThis.gSVG) {
  globalThis.gSVG.install(svgPlugin);
}

customElements
  .whenDefined('grapper-view')
  .then(view => {
    view.install(svgPlugin);
  });
