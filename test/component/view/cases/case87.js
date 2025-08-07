export const title       = '87) value attribute (boolean)';
export const description = `value="false"`;

export default `<grapper-view value="false">
  <svg viewBox="0 0 110 110">
    <text x="50" y="50" dominant-baseline="middle" text-anchor="middle"
          g-if="!value"
          g-content="value">test</text>
  </svg>
</grapper-view>
`;