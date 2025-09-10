export const title       = '102) Unsafe config origin';
export const description = `Load config from different origin`;

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

export default `<grapper-view style="width: 100px">
  <svg viewBox="0 0 100 100" id="svg">
    <g g-for="n of $.config.value">
        <circle   :cx="(n + 1) * 25"
                  :cy="(n + 1) * 25"
                    r="25"
                :fill="['red','green','blue'][n]">
        </circle>
    </g>
    <text x="50" y="12">circles</text>
  </svg>
  <script type="config" src="http://127.0.0.1:${ window.location.port }/test/component/view/assets/config.json"></script>
</grapper-view>
<div id="result"></div>
`;