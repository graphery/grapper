export const title       = '7) Wrong source';
export const description = 'Do not display a svg with a wrong source.';

export function script () {
  const component = document.querySelector('grapper-view');
  component.addEventListener('error', (evt) => {
    document.querySelector('#result').innerHTML = evt.detail;
  });
  component.svgSrc = "/src/grapper-view/test/assets/unknown.svg";
}

export default `<grapper-view ></grapper-view>
<div id="result"></div>`;
