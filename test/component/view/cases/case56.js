export const title       = '56) Error: g-for expression';
export const description = 'launch an error expression in g-for';

export function script () {
  const result    = document.querySelector('#result');
  const component = document.querySelector('grapper-view');
  const show      = () => result.innerHTML = component.errors
                                                      .map(r => String(r).replace(/</g, '&lt;'))
                                                      .join('\n');
  if (!component.rendered) {
    component.addEventListener('render', show);
  } else {
    show();
  }
}

export default `
<div id="container">
  <grapper-view>
    <svg viewBox="0 0 100 100">
      <g g-for="x of wrong">
        <rect :x="x" :y="y" width="10" height="10"/>
      </g>
    </svg>
  </grapper-view>
</div>
<pre id="result"></pre>
`;