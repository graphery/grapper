export const title       = '100) Unsafe methods origin';
export const description = `Load methods from different origin`;

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

export default `<grapper-view>
  <svg viewBox="0 0 100 100" id="svg" width="100">
    <g g-for="value of data">
        <circle   :cx="value.cx"
                  :cy="value.cy"
                    r="25"
                :fill="color(value.cx)">
        </circle>
    </g>
    <text x="50" y="12">circles</text>
  </svg>
  <script type="data">[
    {cx: 25, cy: 25},
    {cx: 50, cy: 50},
    {cx: 75, cy: 75}
  ]</script>
  <script type="methods" src="http://127.0.0.1:${ window.location.port }/test/component/view/assets/colors.js"></script>
</grapper-view>
<div id="result"></div>
`;