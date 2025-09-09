export const title       = '2) Update the svg';
export const description = `Display a svg and update the image.`;

export function script () {
  const component = document.querySelector('grapper-view');
  if (component.rendered) {
    component.svg.querySelector('path').fill('red');
  } else {
    component.addEventListener('render', () => {
      component.svg.querySelector('path').fill('red');
    });
  }
}

export default `
<grapper-view style="width: 200px; height: 200px;">
  <template src="/test/component/view/assets/image.svg" >
</grapper-view>
`;