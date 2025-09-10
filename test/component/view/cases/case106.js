export const title       = '106) Unsafe plugin origin (no error)';
export const description = `Load plugin from different origin`;

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
    <path fill="none" stroke="#D80000" stroke-width="2" 
      :d="$.regularPolygon(30, 26, 25, 6, 30)"/>
    <path fill="none" stroke="#00D800" stroke-width="2" 
      :d="$.regularPolygon(71, 50, 25, 6, 30)"/>
    <path fill="none" stroke="#0000D8" stroke-width="2" 
      :d="$.regularPolygon(30, 74, 25, 6, 30)"/>
  </svg>
  <script type="plugin" src="https://cdn.jsdelivr.net/npm/grapper/dist/module/plugins/shapes.extra.js"></script>
</grapper-view>
<div id="result"></div>
`;