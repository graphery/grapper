export const title       = '13) render with script type="data" embebed';
export const description = 'Use the render template with an external data loaded with script type="data".';

export default `<grapper-view style="width: 100px">
  <template src="/test/component/view/assets/circles.svg"></template>
  <script type="data" src="/test/component/view/assets/circles.csv"></script>
</grapper-view>
`