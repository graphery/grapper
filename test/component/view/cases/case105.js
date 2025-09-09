export const title       = '105) Safe svg origin';
export const description = `Load svg from different origin with safe-origin`;

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

export default `<grapper-view  style="width: 100px">       
  <template src="http://127.0.0.1:${ window.location.port }/test/component/view/assets/circles.svg"
            safe-origin></template> 
  <script type="data"
          src="http://127.0.0.1:${ window.location.port }/test/component/view/assets/circles.csv"
          safe-origin></script>
</grapper-view>
<div id="result"></div>
`;