export const title       = '4) Profile update render';
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
  svg.render({
    values : [
      {cx : 20, cy : 20, color : 'red'},
      {cx : 50, cy : 50, color : 'green'},
      {cx : 80, cy : 80, color : 'blue'},
    ]
  });
  svg.render({
    values : [
      {cx : 80, cy : 20, color : 'red'},
      {cx : 50, cy : 50, color : 'green'},
      {cx : 20, cy : 80, color : 'blue'},
    ]
  });
}

export default `
<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <circle g-for="(circle, n) of values" 
     :id   = '"circle" + n'
     :cx   = "circle.cx"
     :cy   = "circle.cy"
     r     = "10"
     :fill = "circle.color"/>
</svg>
<pre id="result"></pre>`;