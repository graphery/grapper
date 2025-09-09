export const title       = '36) add a plugin with a static method';
export const description = `
define a static method by plugin extension
`;

export function script () {
  const div    = document.querySelector('#show');
  const code   = document.querySelector('#result');
  const svg    = gSVG().viewBox(0, 0, 100, 100).width(100).height(100);
  svg.add('circle').cx(50).cy(50).r(40);
  svg.attachTo(div);
  gSVG.install((setup) => {
    setup.extendConstructor(
      {
        test (element) {
          return gSVG.isWrapped(element) ? 'is a Grapper Object' : 'is not a Grapper object'
        }
      }
    );
  });
  code.innerHTML = gSVG.test(svg);
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
