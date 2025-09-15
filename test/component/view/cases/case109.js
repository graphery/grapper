export const title       = '109) FOUC';
export const description = 'Flash of unstyled content';

export default `
<grapper-view>
  <template>
    <style>
      svg:focus { outline: none; }
    </style>
    <svg :viewBox="[0, 0, 700, data.length * 23 + 170]" width="700"
         font-family="sans-serif" font-size="14"
         tabindex="0"
         @init="init"
         @keydown="(e) => e.code === 'Escape' ? ($.config.selected = null) : void(0)">
      
      <!-- background -->
      <rect x="0" y="0" width="700" :height="data.length * 23 + 110" 
        @pointerdown="$.config.selected= null" opacity="0"/>
      
      <!-- title -->
      <text x="20" y="30" font-size="22">Perceptions of the future in EU countries</text>
      <text x="680" y="26" text-anchor="end" font-size="10" font-style="italic">European Quality Life Survey, 2024 & 2016</text>
      <text x="20" y="54" font-size="16">2024 vs 2016</text>
      
      <!-- leyend -->
      <text x="300" y="75" text-anchor="end">pessimistic</text>
      <line x1="320" x2="320" 
            y1="58" :y2="data.length * 22 + 110" :stroke="$.config.colors.axis"></line>
      <text x="340" y="75">optimistic</text>
      
      <!-- values -->
      <g g-for="(country, n) of data" style="cursor: pointer"
         :transform="$.translate(0, n * 23 + 86)"
         :opacity="$.config.selected !== null && $.config.selected !== n ? 0.5 : 1"
         @pointerdown="$.config.selected = n">
        <!-- country lable -->
        <text x="90" y="14" 
              text-anchor="end" 
             :font-style="country.name === 'EU' ? 'italic' : 'normal'"
              g-content="country.name"></text>
        <!-- bar -->
        <g :opacity="$.config.selected === null && country.name === 'EU' ? 0.5 : 1">
          <circle :cx="320 + country.value * 2.5" cy="10" r="10" 
                  :fill="$.config.colors.optimistic"/>
          <rect x="320" y="0" 
                height="20" :width="country.value * 2.5" 
                :fill="$.config.colors.optimistic"/>
          <circle :cx="320 - (100 - country.value) * 2.5" cy="10" 
                  r="10" :fill="$.config.colors.pessimistic"/>
          <rect :x="320 - (100 - country.value) * 2.5" y="0" 
                height="20" :width="(100 - country.value) * 2.5" 
                :fill="$.config.colors.pessimistic"/>
        </g>
        <!-- data labels -->
        <text :x="320 + country.value * 2.5 - 18" y="14" 
              font-size="10" :fill="$.config.colors.labelOnBar"
              g-content="country.value + '%'" ></text>
        <text :x="320 - (100 - country.value) * 2.5 - 3" y="14" 
              font-size="10" :fill="$.config.colors.labelOnBar"
              g-content="(100 - country.value) + '%'"></text>
        <!-- previous values -->
        <rect g-if="country.previous" 
              :x="320 - (100 - country.previous) * 2.5" y="0.5" 
              height="19" width="250" 
              rx="10" ry="10" 
              fill="transparent" :stroke="$.config.colors.previousStroke"/>
      </g>
      <!-- tooltips -->
      <g g-for="(country, n) of data" g-if="n === $.config.selected" data-tooltip="true" 
        :transform="$.translate((country.previous ? 580 : 590) - (100 - Math.max(country.value, country.previous || 0)) * 2.5, n * 23 + 86)">
        <rect width="140" height="90" rx="3" ry="3" :fill="$.config.colors.tooltipFill" :stroke="$.config.colors.tooltipStroke" stroke-width="1" opacity="0.98"/>
        <text x="10" y="18" font-size="12" font-weight="bold" g-content="country.name"></text>
        <text x="48" y="40" font-size="11">Pessim. | Optim.</text>
        <text x="15" y="60" font-size="11">2016:</text>
        <text x="65" y="60" font-size="11" g-if="country.previous">
          <tspan g-content="100 - country.previous + '%'" :fill="$.config.colors.pessimistic"></tspan> | 
          <tspan g-content="country.previous + '%'" :fill="$.config.colors.optimistic"></tspan>
        </text>
        <text x="72" y="60" font-size="11" g-if="!country.previous">(no data)</text>
        <text x="15" y="76" font-size="11">2024:</text>
        <text x="65" y="76" font-size="11">
          <tspan g-content="100 - country.value + '%'" :fill="$.config.colors.pessimistic"></tspan> | 
          <tspan g-content="country.value + '%'" :fill="$.config.colors.optimistic"></tspan>
        </text>
        <!-- close 'x' -->
        <text x="124" y="16" font-size="13" font-family="monospace" font-weight="bold" style="cursor:pointer" 
              @pointerdown="$.config.selected = null">x</text>
      </g>
    </svg>
  </template>
  <script type="data">
    name;value;previous
    Ireland;49;81
    Denmark;48;
    Austria;44;73
    Spain;44;66
    Germany;43;68
    Czechia;42;60
    Bulgaria;39;58
    Luxembourg;39;77
    Lithuania;38;63
    Sweden;38;85
    Netherlands;38;74
    Malta;37;72
    Slovenia;36;66
    Finland;35;81
    EU;34;64
    Romania;32
    Belgium;31;62
    Latvia;30;69
    Poland;29;71
    Estonia;29;73
    Slovakia;29;52
    France;28;59
    Cyprus;27;55
    Portugal;26;54
    Croatia;26;
    Hungary;22;58
    Greece;20;31
    Italy;20;
  </script>
  <script type="config">
    {
      selected: null,
      colors: {
        optimistic: 'green',
        pessimistic: 'red',
        axis: 'black',
        tooltipFill: 'white',
        tooltipStroke: '#333',
        previousStroke: '#555',
        labelOnBar: 'white'
      }
    }
  </script>
  <script type="plugin" src="/src/plugins/template.profile.js?level=2"></script>
  <script type="methods">
  function init() {
    const result = document.querySelector('#result');
    const logger = {
      log(v) {
        result.innerHTML += v.replace('<','&lt;').replace('>','&gt;') + '<br/>';
      }
    };
    $.svg.profileLogger(logger);
  }
</script>
</grapper-view>
<pre id="result"></pre>
`