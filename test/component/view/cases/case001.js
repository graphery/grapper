export const title       = '1) Simple example'
export const description = `Display a svg file`;


export default () => {
  return `<grapper-view style="width: 200px; height: 200px;">
    <template src="/test/component/view/assets/image.svg"></template> 
  </grapper-view>`;
}