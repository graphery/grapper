export const title       = '12) intersection-once-class';
export const description = 'A class can be defined when the intersection occurs once.';

export default `<div style="width: 100px; height: 100px; overflow-y: scroll; overflow-x: hidden; border: 1px solid grey; text-align: center">
  <grapper-view intersection-ratio="0.5" intersection-once-class="red" style="width: 50px; margin-top: 120px;">
    <template src="/test/component/view/assets/check.svg" ></template>
  </grapper-view>
</div>`