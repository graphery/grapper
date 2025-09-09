export const title       = '108) Unsafe content data';
export const description = 'Load data with unsafe javascript content';

export function script () {
  const result    = document.querySelector('#result');
  const component = document.querySelector('grapper-view');
  const show = () => result.innerHTML = component.errors
                                                 .map(r => String(r).replace(/</g, '&lt;'))
                                                 .join('<br/>');
  if (!component.errors?.length) {
    component.addEventListener('error', show);
  } else {
    show();
  }
}

export default `<grapper-view intersection-ratio="1" style="width: 50px;" value="0">
  <template>
    <svg viewBox="0 0 100 100">
      <text x="10" y="50" font-size="40" g-content="value">0</text>
    </svg>
  </template>
  <script type="data" src="/test/component/view/assets/unsafe.data.txt"></script>
</grapper-view>
<div id="result"></div>
`