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

async function checkEditorMenuButtonsPreviewMode(page: Page, editorMenuPage: EditorMenuPage) {
  expect.soft(await page.locator(editorMenuPage.switcherIcon).isVisible).toBeTruthy();
  expect.soft(await page.locator(editorMenuPage.docsIcon).isVisible).toBeTruthy();
  expect.soft(await page.locator(editorMenuPage.editIcon).isVisible).toBeTruthy();
  expect.soft(await page.locator(editorMenuPage.pageIcon).isVisible).toBeTruthy();
}

async function checkSwitcherAndMenuIcons(page: Page, editorMenuPage: EditorMenuPage) {
  await editorMenuPage.toggleMenuRight();
  expect(await page.locator(editorMenuPage.menuBarRight).isVisible()).toBeTruthy();
  await checkEditorMenuButtonsPreviewMode(page, editorMenuPage);
  await editorMenuPage.toggleMenuLeft();
  expect(await page.locator(editorMenuPage.menuBarLeft).isVisible()).toBeTruthy();
  await checkEditorMenuButtonsPreviewMode(page, editorMenuPage);
}

async function checkAddNewPageButton(page: Page, editorMenuPage: EditorMenuPage) {
  await page.click(editorMenuPage.pageIcon);
  await page.click(editorMenuPage.newPageIcon);
  expect(await page.locator(editorMenuPage.headerAddPageForm).isVisible()).toBeTruthy();
  expect(await page.locator(editorMenuPage.fieldAddPageForm).isVisible()).toBeTruthy();
  expect(await page.locator(editorMenuPage.checkmarkIconAddPageForm).isVisible()).toBeTruthy();
  await page.click(editorMenuPage.closeIconAddPageForm);
}

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
    await checkSwitcherAndMenuIcons(page, editorMenuPage);
  });

  // eslint-disable-next-line jest/expect-expect
  test('editorMenu: 4 - checking Switcher button in Edit Mode (left and right)', async () => {
    const editorMenuPage = new EditorMenuPage(page);
    await editorMenuPage.toggleEditMode();
    await checkSwitcherAndMenuIcons(page, editorMenuPage);
  });

  // eslint-disable-next-line jest/expect-expect
  test('editorMenu: 7 - checking Add a New Page button in Edit Mode', async () => {
    const editorMenuPage = new EditorMenuPage(page);
    await editorMenuPage.toggleEditMode();
    await checkAddNewPageButton(page, editorMenuPage);
    await editorMenuPage.toggleMenuRight();
    await checkAddNewPageButton(page, editorMenuPage);
  });

  test('Check doc icon leads to documentation', async () => {
    const editorMenuPage = new EditorMenuPage(page);
    const newPagePromise = new Promise(resolve => context.once('page', resolve));
    await page.click(editorMenuPage.docsIcon);
    const newPage = await newPagePromise;
    // @ts-ignore
    expect(newPage.url()).toEqual('http://localhost:8005/___docs/');
  });
});
