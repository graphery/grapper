export const title       = '98) Unsafe content data';
export const description = 'Load data with unsafe javascript content';


export default `<grapper-view intersection-ratio="1" style="width: 50px;" value="0">
  <template>
    <svg viewBox="0 0 100 100">
      <text x="10" y="50" font-size="40" g-content="value">0</text>
    </svg>
  </template>
  <script type="data" src="/test/component/view/assets/unsafe.data.txt"/>
</grapper-view>
<div id="result"></div>
`