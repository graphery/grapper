export const title       = '6) Dynamic creation'
export const description = 'Create a grapper-view from JS.';

export function script () {
  const div              = document.querySelector('div#content');
  const component        = document.createElement('grapper-view');
  component.templateSrc  = "/test/component/view/assets/image.svg";
  component.style.width  = '200px';
  component.style.height = '200px';
  component.addEventListener('render', () => {
    component.svg.fill('violet');
  });
  div.appendChild(component);
}

export default `<div id="content"></div>`;
