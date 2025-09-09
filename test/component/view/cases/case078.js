export const title       = '78) datum: property (boolean)';
export const description = `component.data=false`;

export function script () {
  const component = document.querySelector('grapper-view');
  component.data  = false;
}

export default `<grapper-view>
  <svg viewBox="0 0 110 110">
    <text x="50" y="50" dominant-baseline="middle" text-anchor="middle"
          g-if="!data"
          g-content="data">test</text>
  </svg>
</grapper-view>
`;