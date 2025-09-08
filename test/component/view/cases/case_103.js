export const title       = '103) Unsafe data origin';
export const description = `Load data from different origin`;

export default `<grapper-view  style="width: 100px">       
  <template src="/test/component/view/assets/circles.svg"></template> 
  <script type="data" src="http://127.0.0.1:7000/test/component/view/assets/circles.csv"></script>
</grapper-view>
`;