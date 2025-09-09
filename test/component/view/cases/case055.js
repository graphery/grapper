export const title       = '55) Error: g-content expression';
export const description = 'launch an error expression in g-content ';


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
      <text x="0" y="0" g-content="wrong"></text>
    </svg>
  </grapper-view>
</div>
<pre id="result"></pre>
`;