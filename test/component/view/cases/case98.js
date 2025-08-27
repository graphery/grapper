export const title       = '98) Live cicle event handler with grapperView.addEventListener()';
export const description = 'You can capture events with grapperView.addEventListener()';


export function script () {
  const result      = document.querySelector('#result');
  const grapperView = document.querySelector('grapper-view');
  if (grapperView.loaded) {
    result.innerHTML += 'init<br/>';
  }
  if (grapperView.rendered) {
    result.innerHTML += 'render<br/>';
  }
  grapperView.addEventListener('init', () => {
    result.innerHTML += 'init<br/>';
  });
  grapperView.addEventListener('render', () => {
    result.innerHTML += 'render<br/>';
  });
  grapperView.addEventListener('intersection.enter', () => {
    result.innerHTML += 'intersection.enter<br/>';
  });
  grapperView.addEventListener('intersection.exit', () => {
    result.innerHTML += 'intersection.exit<br/>';
  });
}


export default `<grapper-view intersection-ratio="1" style="width: 50px;" value="0">
  <template>
    <svg viewBox="0 0 100 100">
      <text x="10" y="50" font-size="40" g-content="value">
    </svg>
  </template>
</grapper-view>
<p><input id="check" type="button" value="change value" onclick="document.querySelector('grapper-view').data.value++"></p>
<div id="result">
</div>`;