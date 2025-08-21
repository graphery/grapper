export const title       = '94) use g-component alias';
export const description = 'support for component name alias';

export default `<g-composer>
  <svg viewBox="0 0 200 100" width="200px" height="100px">
    <g stroke-width="12" stroke-linecap="round">
      <g g-for="(record, index) of data">
        <line  x1="22"
              :x2="record.value"
              :y1="index * 20 + 30"
              :y2="index * 20 + 30"
              :stroke="record.color"
        ></line>
      </g>
    </g>
  </svg>
  <script type="data">
    [
      {"color": "#D80000", "value": 130},
      {"color": "#00D800", "value": 170},
      {"color": "#0000D8", "value": 100}
    ]
  </script>
</g-composer>
`;