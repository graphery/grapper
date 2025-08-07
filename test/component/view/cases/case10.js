export const title       = '10) Intersection events'
export const description = 'You can capture the event intersection.enter and ' +
                           'intersection.exitViewport when the content is in and off the viewport.';

export function script () {
  const component = document.querySelector('grapper-view');
  component.addEventListener('intersection.enter', () => {
    component.svg.fill('red');
  });
  component.addEventListener('intersection.exit', () => {
    component.svg.fill('blue');
  });
}

export default `<div style="width: 100px; height: 100px; overflow-y: scroll; overflow-x: hidden; border: 1px solid grey; text-align: center">
  <grapper-view svg-src="/test/component/view/assets/check.svg" intersection-ratio="1" style="width: 50px; margin-top: 120px;"></grapper-view>
</div>`