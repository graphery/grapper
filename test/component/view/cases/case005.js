export const title       = '5) Update the source'
export const description = 'Display a svg, config the content. Change the source, and update the image after the second rendering.';

export function script () {
  const component = document.querySelector('grapper-view');
  const initSrc   = '/test/component/view/assets/image.svg';
  const altSrc    = '/test/component/view/assets/check.svg';
  document.querySelector('#run').addEventListener('click', () => {
    component.svgSrc = component.svgSrc === initSrc ? altSrc : initSrc;
  });
  const update = () => {
    if (component.svgSrc === altSrc) {
      component.svg.fill('green');
    } else {
      component.svg.fill('red');
    }
  };
  component.addEventListener('render', update);
  if (component.rendered) {
    update();
  }
}

export default `<grapper-view svg-src="/test/component/view/assets/image.svg" style="width: 200px; height: 200px;"></grapper-view>
<button id="run">Change the content</button>
`;
