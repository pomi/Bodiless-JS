/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// editorMenu.spec.ts
import { expect, Page, test } from '@playwright/test';
import { EditorMenuPage } from '../../pages/editor-menu-page';

const docsIcon = '//*[@aria-label="Docs"]';

test.describe.parallel('Editor Menu (left and right)', () => {
  let page: Page;
  let context:any;
  test.beforeEach(async ({ browser }) => {
    // { viewport: { width: 1200, height: 850 } }
    context = await browser.newContext({ viewport: { width: 1200, height: 850 } });
    page = await context.newPage();
    await page.goto('/');
  });

  test.afterEach(async () => {
    await page.close();
  });

  // eslint-disable-next-line jest/expect-expect
  test('editorMenu: 1 - checking Switcher button in Preview Mode', async () => {
    const editorMenuPage = new EditorMenuPage(page);
    await editorMenuPage.checkSwitcherAndMenuIcons();
  });

  // eslint-disable-next-line jest/expect-expect
  test('editorMenu: 4 - checking Switcher button in Edit Mode (left and right)', async () => {
    const editorMenuPage = new EditorMenuPage(page);
    await editorMenuPage.toggleEditMode();
    await editorMenuPage.checkSwitcherAndMenuIcons();
  });

  // eslint-disable-next-line jest/expect-expect
  test('editorMenu: 7 - checking Add a New Page button in Edit Mode', async () => {
    const editorMenuPage = new EditorMenuPage(page);
    await editorMenuPage.toggleEditMode();
    await editorMenuPage.checkAddNewPageButton();
    await editorMenuPage.toggleMenuRight();
    await editorMenuPage.checkAddNewPageButton();
  });

  test('Check doc icon leads to documentation', async () => {
    const newPagePromise = new Promise(resolve => context.once('page', resolve));
    await page.click(docsIcon);
    const newPage = await newPagePromise;
    // @ts-ignore
    expect(newPage.url()).toEqual('http://localhost:8005/___docs/');
  });
});
