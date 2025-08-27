export const title       = '97) Live cicle event handler width $.addEventListener()';
export const description = 'You can capture events with $.addEventListener()';


export default `<grapper-view intersection-ratio="1" style="width: 50px;" value="0">
  <template>
    <svg viewBox="0 0 100 100">
      <text x="10" y="50" font-size="40" g-content="value">
    </svg>
  </template>
  <script type="methods">
    $.addEventListener('init', () => {
      document.querySelector('#result').innerHTML += 'init<br/>';
    });
    $.addEventListener('render', () => {
      document.querySelector('#result').innerHTML += 'render<br/>';
    });
    $.addEventListener('intersection.enter', () => {
      document.querySelector('#result').innerHTML += 'intersection.enter<br/>';
    });
    $.addEventListener('intersection.exit', () => {
      document.querySelector('#result').innerHTML += 'intersection.exit<br/>';
    });
  </script>
</grapper-view>
<p><input id="check" type="button" value="change value" onclick="document.querySelector('grapper-view').data.value++"></p>
<div id="result">
</div>`;