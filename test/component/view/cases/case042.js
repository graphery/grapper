export const title       = '42) keep-aspect plugin and data update';
export const description = `Keep font size and stroke when the SVG is resized and data is updated`;

export function script () {
  const view = document.querySelector('grapper-view');
  document.querySelector('#run').addEventListener('click', () => {
    view.style.width  = (Number.parseInt(view.style.width) + 100) + 'px';
    view.style.height = (Number.parseInt(view.style.height) + 100) + 'px';
  });
  document.querySelector('#minus').addEventListener('click', () => {
    view.style.width  = (Number.parseInt(view.style.width) - 100) + 'px';
    view.style.height = (Number.parseInt(view.style.height) - 100) + 'px';
  });
  document.querySelector('#init').addEventListener('input', function () {
    view.data.n = Number(this.value);
  });
}

export default `
<grapper-view data="n: 1" style="width: 100px; height: 100px">
  <svg viewBox="0 0 100 100" width="100%" height="100%" style="border: 1px solid lightgray">
    <text text-anchor="middle"
          alignment-baseline="middle"
          x="50"
          y="50"
          font-size="40"
          g-content="n"
          g-keep-aspect="size"/>
  </svg>
  <script type="plugin" src="./src/plugins/non.scaling.size.js"></script>
</grapper-view>
<p>
  <button id="run">up size</button>
  <button id="minus">down size</button>
  value: <input id="init" type="number" value="1"/>
</p>
`;