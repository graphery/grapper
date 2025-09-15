export const title       = '2) Profile a template (level 1)';
export const description = 'profile a very simple SVG template';

export function script () {
  const result = document.querySelector('#result');
  const logger = {
    log(v) {
      result.innerHTML += v.replace('<','&lt;').replace('>','&gt;') + '<br/>';
    }
  };
  const svg = gSVG(document.querySelector('#svg'));
  svg.profileLogger(logger);
  svg.profileLevel(1);
  svg.render({
    x      : 10,
    y      : 10,
    width  : 80,
    height : 80,
    color  : 'red'
  });
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <rect :x="x" :y="y" :width="width" :height="height" :fill="color"></rect>
</svg>
<pre id="debug"></pre>
<pre id="result"></pre>`;
