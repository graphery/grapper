export const title       = '51) top()';
export const description = `
get top parent element
`;

export function script () {
  const div    = document.querySelector('#show');
  const code   = document.querySelector('#result');
  const svg    = gSVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const circle = svg.add('g').add('g').add('g').add('g').add('circle').cx(50).cy(50).r(40);
  svg.attachTo(div);
  circle.top().fill('red')
  svg.top().stroke('black')
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
