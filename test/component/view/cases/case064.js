export const title       = '64) Error: methods src';
export const description = 'launch an error script type="methods" src="..."';

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
      <rect :x="0"
            @click="wrong()" 
            y="0" width="100" height="100" fill="red"/>
    </svg>
    <script type="methods" src="./non-exist.js"></script>
  </grapper-view>
</div>
<pre id="result"></pre>
`;