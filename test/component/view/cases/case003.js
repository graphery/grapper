export const title       = '3) Update the svg after the rendering';
export const description = 'Display a svg and update the image after the rendering.';

export function script () {
  const component = document.querySelector('grapper-view');
  const run       = () => component.svg.querySelector('path').fill('red');
  setTimeout(() => {
    if (component.rendered) {
      run();
    } else {
      component.addEventListener('render', run);
    }
  }, 1000);
}

export default `<grapper-view style="width: 200px; height: 200px;">
  <template src="/test/component/view/assets/image.svg" ></template>
</grapper-view>`;
