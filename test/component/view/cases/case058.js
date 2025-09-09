export const title       = '58) Error: g-on expression';
export const description = 'launch an error expression in g-if';

export function script () {
  const result    = document.querySelector('#result');
  const component = document.querySelector('grapper-view');
  const show      = () => result.innerHTML = component.errors
                                                      .map(r => String(r).replace(/</g, '&lt;'))
                                                      .join('\n');
  component.addEventListener('error', show);
}

export default `
<div id="container">
  <grapper-view>
    <svg viewBox="0 0 100 100">
      <rect @click="wrong" x="0" y="0" width="100" height="100" fill="red" style="cursor: pointer"/>
    </svg>
  </grapper-view>
</div>
<pre id="result"></pre>
`;