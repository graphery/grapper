export const title       = '96) Live cicle event handler';
export const description = 'You can capture events with @event="handler"';


export default `<grapper-view intersection-ratio="1" style="width: 50px;" value="0">
  <template>
    <svg viewBox="0 0 100 100"  @init="handler" @render="handler" @intersection.enter="handler" @intersection.exit="handler">
      <text x="10" y="50" font-size="40" g-content="value">
    </svg>
  </template>
  <script type="methods">
    function handler(e) {
      result.innerHTML += e.type + '<br>';  
    }
  </script>
</grapper-view>
<p><input id="check" type="button" value="change value" onclick="document.querySelector('grapper-view').data.value++"></p>
<div id="result">
</div>`;