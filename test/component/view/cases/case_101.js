export const title       = '101) Unsafe config origin';
export const description = `Load config from different origin`;

export default `<grapper-view style="width: 100px">
  <svg viewBox="0 0 100 100" id="svg">
    <g g-for="n of $.config.value">
        <circle   :cx="(n + 1) * 25"
                  :cy="(n + 1) * 25"
                    r="25"
                :fill="['red','green','blue'][n]">
        </circle>
    </g>
    <text x="50" y="12">circles</text>
  </svg>
  <script type="config" src="http://127.0.0.1:7000/test/component/view/assets/config.json"></script>
</grapper-view>
`;