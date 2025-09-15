export const title       = '50) parents()';
export const description = `
get all parent elements
`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const g    = svg.add('g').add('g').add('g').add('g');
  svg.attachTo(div);
  for (let el of g.parents()) {
    el.add('circle').cx(50).cy(50).r(40);
  }
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
