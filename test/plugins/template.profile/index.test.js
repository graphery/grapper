import { test, expect } from '@playwright/test';
import getName          from '../../../tools/playwright-helper/getname.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT            = '/src';
const IMPORT_LIB      = ROOT + '/lib/gsvg.script.js';
const IMPORT_TEMPLATE = ROOT + '/plugins/template.engine.script.js';
const IMPORT_PLUGIN   = ROOT + '/plugins/template.profile.script.js';
const URL             = '/test/plugins/template.profile/cases/';
const FOLDER          = './test/plugins/template.profile/cases/';

const results = {
  case02 : ['Template Profile - level = 1', 'Template Profile - render():'],
  case03 : ['Template Profile - level = 2', 'Template Profile - directives:', '<rect g-bind:x="x" >', '<rect g-bind:y="y" >', '<rect g-bind:width="width" >', '<rect g-bind:height="height" >', '<rect g-bind:fill="color" >', 'Template Profile - render():'],
  case04 : ['Template Profile - level = 2', 'Template Profile - directives:', 'Template Profile - render():'],
  case05 : ['Template Profile - level = 2', 'Template Profile - directives:', 'Template Profile - render():'],
}

const dir = await opendir(FOLDER);
for await (const dirent of dir) {
  const file = dirent.name;
  const code = file.replace('.js', '');
  const name = await getName(join(process.cwd(), FOLDER, file));
  test.describe(name, () => {

    test.beforeEach(async ({page}) => {
      await page.goto(`/load.html?case=${ URL }${ dirent.name }&imp=${ IMPORT_LIB }&imp=${ IMPORT_TEMPLATE }&imp=${ IMPORT_PLUGIN }`);
    });

    if (['case01'].includes(code)) {
      test('compare log result', async ({page}) => {
        const result = page.locator('#result');
        await expect(result).toBeEmpty()
      });
    } else {
      test('compare log result', async ({page}) => {
        const result = page.locator('#result');
        for (const line of results[code]) {
          await expect(result).toContainText(line)
        }
      });
    }

    test('compare image', async ({page}) => {
      const show = page.locator('svg#svg');
      await expect(show).toHaveScreenshot()
    });

  });
}
