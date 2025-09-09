export const title       = '4) Define the source after the creation'
export const description = 'Display a svg lazy.';

export function script() {
  const component        = document.querySelector('grapper-view');
  const alternativeImage = '/test/component/view/assets/check.svg';
  document.querySelector('#run').addEventListener('click', () => {
    component.svgSrc = alternativeImage;
  });
}

export default `<grapper-view style="width: 200px; height: 200px;"></grapper-view>
<button id="run">Add the content</button>`;
