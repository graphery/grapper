export const title       = '81) datum: data-src (boolean)';
export const description = `data-src="datum-boolean.txt"`;

export default `<grapper-view data-src="/test/component/view/assets/datum-boolean.txt">
  <svg viewBox="0 0 110 110">
    <text x="50" y="50" dominant-baseline="middle" text-anchor="middle"
          g-if="!data"
          g-content="data">test</text>
  </svg>
</grapper-view>
`;