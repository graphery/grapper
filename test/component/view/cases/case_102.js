export const title       = '102) Unsafe svg origin';
export const description = `Load svg from different origin`;

export default `<grapper-view  style="width: 100px">       
  <template src="http://127.0.0.1:7000/test/component/view/assets/circles.svg"></template> 
  <script type="data" src="/test/component/view/assets/circles.csv"></script>
</grapper-view>
`;