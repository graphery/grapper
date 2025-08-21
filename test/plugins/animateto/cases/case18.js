export const title       = '18) animateTo() delay x & y with text';
export const description = 'move text width delay';

export function script () {
  const div  = document.querySelector('#show');
  const run  = document.querySelector('#run');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const el = svg.add('text').x(10).y(10).fill('red').content('test');
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
  run.addEventListener('click', () => {
    el.animateTo(
      [ {x: 10, y : 10, fill : 'red'},
        {x: 70, y : 90, fill : 'black'} ],
      {duration: 500, delay: 1000},
      () => code.innerHTML = 'moving...',
      () => code.innerHTML = sourceFormat(svg.source())
    );});
}

export default `<div id="show"></div>
<button id="run">move</button>
<pre id="result"></pre>`;
