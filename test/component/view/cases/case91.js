export const title       = '91) Dynamic viewPort';
export const description = 'and component default size';

export default `
<div id="group" style="width:fit-content; height: fit-content">
  <grapper-view value="5" >
    <svg :viewBox="[0, 0, 100, 100]">
      <g g-for="n of value">
        <circle :cx="(n + 1) * 10"
                :cy="(n + 1) * 10"
                :r="(n + 1) * 5"
                fill="none"
                stroke="green"
                stroke-width="2"/>
      </g>
    </svg>
  </grapper-view>
  <grapper-view value="5" >
    <svg viewBox="0, 0, 100, 100">
      <g g-for="n of value">
        <circle :cx="(n + 1) * 10"
                :cy="(n + 1) * 10"
                :r="(n + 1) * 5"
                fill="none"
                stroke="orange"
                stroke-width="2"/>
      </g>
    </svg>
  </grapper-view>
</div>
`;