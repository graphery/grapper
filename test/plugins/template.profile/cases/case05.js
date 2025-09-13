export const title       = '5) Complex example';
export const description = 'update values and render again';

export function script () {
  const result = document.querySelector('#result');
  const svg = gSVG(document.querySelector('#svg'));
  svg.profileLogger({
    log (v) {
      result.innerHTML += v.replace('<', '&lt;').replace('>', '&gt;') + '<br/>';
    }
  });
  svg.profileLevel(2);
  svg.render({ value: 23, label: "example", color: 'green' });
  document.querySelector('#run').addEventListener('click', () => {
    svg.render({ value: 40, label: "changed", color: 'violet' });
  });
}

export default `
<svg id="svg" viewBox="0 0 200 270" width="270" height="270">
  <defs>
      <rect
        id="element"
        height="18"
        width="18"
        :fill="color"/>
  </defs>
  <g g-for="y of 10">
    <g g-for="x of 10">
      <use 
        href="#element"
        g-bind:x="x * 20"
        g-bind:y="y * 20"
        g-bind:opacity="100 - ((y * 10) + x + 1) < value ? 1 : 0.3"/>
    </g>
  </g>
  <text
    x="100"
    y="100"
    dominant-baseline="middle"
    text-anchor="middle"
    font-size="32">
    <tspan g-content="Math.round(value)"></tspan>%</text>
  <text
    x="100"
    y="220"
    font-size="16"
    dominant-baseline="middle"
    text-anchor="middle"
    g-content="label"></text>
</svg>
<p><button id="run">update</button></p>
<pre id="result"></pre>`;