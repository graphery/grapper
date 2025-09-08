export const title       = '105) Unsafe content config';
export const description = 'Load config with unsafe javascript content';


export default `<grapper-view intersection-ratio="1" style="width: 50px;" value="0">
  <template>
    <svg viewBox="0 0 100 100">
      <text x="10" y="50" font-size="40" g-content="$.config.value">0</text>
    </svg>
  </template>
  <script type="config" src="/test/component/view/assets/unsafe.data.txt"/>
</grapper-view>
<div id="result"></div>
`