export const title       = '95) accessing to $.svg, $.data and $.config from methods';
export const description = 'support access';

export default `<grapper-view style="width: 100%">
    <template>
      <svg viewBox="0 0 100 100" width="100" @render="run">
        <rect></rect>
      </svg>
    </template>
    <script type="data">
      {
        x: 10, y: 10, width: 90, height: 90, fill: 'red',
      }
    </script>
    <script type="config">
      {
        stroke: 'black'
      }
    </script>
    <script type="methods">
      function run() {
        const rect = $.svg.querySelector('rect');
        for (let key in $.data) {
          rect[key]($.data[key]);
        }
        for (let key in $.config) {
          rect[key]($.config[key]);
        }
      }
    </script>
  </grapper-view>
`;