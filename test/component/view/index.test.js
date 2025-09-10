import { test, expect } from '@playwright/test';
import getName          from '../../../tools/playwright-helper/getname.js';
import wait             from '../../../tools/playwright-helper/wait.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT   = '/';
const IMPORT = ROOT + 'src/component/view.js';
const URL    = ROOT + 'test/component/view/cases/';
const FOLDER = './test/component/view/cases/';

const errors = {
  case007 : `Not Found (404): http://localhost:7200/src/grapper-view/test/assets/unknown.svg in svg /src/grapper-view/test/assets/unknown.svg`,
  case054 : `wrong is not defined in g-bind:x="wrong" <rect :x="wrong" :y="fail" width="100" height="100" fill="red"></rect> fail is not defined in g-bind:y="fail" <rect :x="wrong" :y="fail" width="100" height="100" fill="red"></rect>`,
  case055 : `wrong is not defined in g-content="wrong" <text x="0" y="0" g-content="wrong"></text>`,
  case056 : `wrong is not defined in g-for="x of wrong" <g g-for="x of wrong"> <rect :x="x" :y="y" width="10" height="10"></rect> </g>`,
  case057 : `wrong is not defined in g-if="wrong" <g g-if="wrong"> <rect x="0" y="0" width="100" height="100" fill="red"></rect> </g> `,
  case058 : `wrong is not defined in g-on:click="wrong" <rect @click="wrong" x="0" y="0" width="100" height="100" fill="red" style="cursor: pointer"></rect> `,
  case059 : `Invalid or unexpected token in data {a": 10}`,
  case060 : `y is not defined in methods x = y; `,
  case061 : `x is not defined in config {conf: x + 10}`,
  case062 : `Failed to fetch dynamically imported module: http://localhost:7200/non-exist.js in plugin ./non-exist.js`,
  case063 : `Not Found (404): http://localhost:7200/non-exist.json in data ./non-exist.json`,
  case064 : `Not Found (404): http://localhost:7200/non-exist.js in methods ./non-exist.js`,
  case065 : `y is not defined in methods x = y * 10;`,
  case089 : `Failed to fetch dynamically imported module: http://localhost:7200/non-exist.js in plugin ./non-exist.js The expression "value * 2" return NaN (Not a Number) value in g-bind:x="value * 2" <rect :x="value * 2" @click="wrong()" y="0" width="100" height="100" fill="red"></rect> wrong is not defined in g-on:click="wrong()" <rect :x="value * 2" @click="wrong()" y="0" width="100" height="100" fill="red"></rect> `,
  case090 : `{"message":"Failed to fetch dynamically imported module: http://localhost:7200/non-exist.js","scope":"plugin","code":"./non-exist.js"} {"message":"The expression \\"value * 2\\" return NaN (Not a Number) value","scope":{"directive":"g-bind","argument":"x","expression":"value * 2"},"code":"<rect :x=\\"value * 2\\" @click=\\"wrong()\\" y=\\"0\\" width=\\"100\\" height=\\"100\\" fill=\\"red\\"></rect>"} {"message":"wrong is not defined","scope":{"directive":"g-on","argument":"click","expression":"wrong()"},"code":"<rect :x=\\"value * 2\\" @click=\\"wrong()\\" y=\\"0\\" width=\\"100\\" height=\\"100\\" fill=\\"red\\"></rect>"}`,
  case100 : `Failed to fetch in methods http://127.0.0.1:7200/test/component/view/assets/colors.js`,
  case102 : `Failed to fetch in config http://127.0.0.1:7200/test/component/view/assets/config.json`,
  case104 : `Failed to fetch in svg http://127.0.0.1:7200/test/component/view/assets/circles.svgFailed to fetch in data http://127.0.0.1:7200/test/component/view/assets/circles.csv`,
  case107 : `Unexpected token '(', ..." "value": (() => con"... is not valid JSON in config { "value": (() => console.log('!!! UNSAFE CODE !!!') || 10)() }`,
  case108 : `Unexpected token '(', ..." "value": (() => con"... is not valid JSON in data { "value": (() => console.log('!!! UNSAFE CODE !!!') || 10)() }`,
}

const dir = await opendir(FOLDER);
for await (const dirent of dir) {
  const file = dirent.name;
  const code = file.replace('.js', '');
  const name = await getName(join(process.cwd(), FOLDER, file));
  test.describe(name, () => {

    test.beforeEach(async ({page}) => {
      await page.goto(`/load.html?case=${ URL }${ dirent.name }&imp=${ IMPORT }`);
    });

    if (!['case007', 'case008', 'case051', 'case052', 'case053', 'case104'].includes(code)) {
      test('compare image', async ({page}) => {
        const show = page.locator(
          code === 'case091' ? '#group' :
            code === 'case094' ? 'g-composer' :
              'grapper-view');
        await expect(show).toHaveScreenshot()
      });
    }

    if (['case004', 'case005', 'case040', 'case041', 'case043', 'case051', 'case052', 'case053'].includes(code)) {
      test('compare image after run action', async ({page}) => {
        const run = page.locator('#run');
        await run.click();
        await wait(500);
        const show = page.locator('grapper-view');
        await expect(show).toHaveScreenshot()
      });
    }

    if (['case029', 'case030', 'case031', 'case032'].includes(code)) {
      test('compare image after run action', async ({page}) => {
        const run = page.locator('grapper-view', {hasText : 'click'});
        await run.click();
        await wait(500);
        const show = page.locator('#case grapper-view');
        await expect(show).toHaveScreenshot()
      });
    }
    if (['case035', 'case096', 'case097'].includes(code)) {
      test('compare image after run action', async ({page}) => {
        const run = page.locator('#check');
        await run.click();
        await wait(500);
        const show = page.locator('#case grapper-view');
        await expect(show).toHaveScreenshot()
      });
    }

    if ('case008' === code) {
      test('events', async ({page}) => {
        const result = page.locator('#events');
        await expect(result).toHaveText(/resize/)
        await expect(result).toHaveText(/render/)
      });
    }

    if ('case009' === code) {
      test('hidden', async ({page}) => {
        const select = page.locator('#_hidden');
        await select.selectOption('');
        await wait(500);
        const show = page.locator('#case grapper-view');
        await expect(show).toHaveScreenshot()
      });
    }

    if (errors[code]) {
      test('error', async ({page}) => {
        const result = page.locator('#result');
        if (['case058', 'case089', 'case090'].includes(code)) {
          const run = page.locator('grapper-view');
          await run.click();
          await wait(500);
        }
        await expect(result).toHaveText(errors[code]);
      });
    }

    if (['case096', 'case097'].includes(code)) {
      test('events', async ({page}) => {
        await wait(500);
        const result = page.locator('#result');
        await expect(result).toHaveText(/init/);
        await expect(result).toHaveText(/render/);
        await expect(result).toHaveText(/intersection.enter/);
      });
      test('events after run action', async ({page}) => {
        const run = page.locator('#check');
        await run.click();
        await wait(1000);
        const result = page.locator('#result');
        await expect(result).toHaveText(/render(.*)render/);
      });
    }

  });
}
