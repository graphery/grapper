export const title       = '77) datum: attribute (boolean)';
export const description = `data="false"`;

export default `<grapper-view data="false">
  <svg viewBox="0 0 110 110">
    <text x="50" y="50" dominant-baseline="middle" text-anchor="middle"
          g-if="!data"
          g-content="data">test</text>
  </svg>
</grapper-view>
`;