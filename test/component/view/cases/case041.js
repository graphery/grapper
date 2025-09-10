export const title       = '41) non-scaling-size plugin with directive';
export const description = `Keep font size and stroke with when the SV is resized`;

export function script () {
  const view = document.querySelector('grapper-view')
  document.querySelector('#run').addEventListener('click', () => {
    view.style.width  = (Number.parseInt(view.style.width) + 50) + 'px';
    view.style.height = (Number.parseInt(view.style.height) + 50) + 'px';
  });
  document.querySelector('#minus').addEventListener('click', () => {
    view.style.width  = (Number.parseInt(view.style.width) - 50) + 'px';
    view.style.height = (Number.parseInt(view.style.height) - 50) + 'px';
  });
}

export default `
<grapper-view style="width: 300px; height: 300px">
  <svg viewBox="0 0 202 202" 
       width="100%" 
       height="100%">
    <g style="stroke: #c0c0c0">
      <g g-for="column of 11">
        <g>
          <line :x1="(column * 20) + 1"
                :x2="(column * 20) + 1"
                y1="1"
                y2="201"
                vector-effect="non-scaling-stroke"/>
        </g>
      </g>
      <g g-for="row of 11">
        <line :y1="(row * 20) + 1"
              :y2="(row * 20) + 1"
              x1="1"
              x2="201"
              vector-effect="non-scaling-stroke"/>
      </g>
    </g>
    <g style="stroke: none; font-family: sans-serif; font-size: 8">
      <g g-for="n of 100">
        <g class="text">
          <text text-anchor="middle"
                alignment-baseline="middle"
                :x="(n % 10 * 20) + 12"
                :y="(Math.floor(n / 10) * 20) + 12"
                g-content="n + 1"
                g-non-scaling-size/>
        </g>
      </g>
    </g>
  </svg>
  <script type="plugin" src="./src/plugins/non.scaling.size.js"></script>
</grapper-view>
<p>
  <button id="run">up size</button>
  <button id="minus">down size</button> <script type="module">
</p>
`;