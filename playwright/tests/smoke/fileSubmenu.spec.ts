/**
 * Copyright © 2021 Johnson & Johnson
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
// fileSubmenu.spec.ts
import { expect, Page, test } from '@playwright/test';
import { FileSubmenuPage } from '../../pages/file-submenu-page';

test.describe.parallel('Editor Menu (left and right)', () => {
  let page: Page;
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/');
  });

  test.afterEach(async () => {
    await page.close();
  });

  // eslint-disable-next-line jest/expect-expect
  test('File Submenu: 1 - Checking file submenu buttons in preview mode', async () => {
    const fileSubmenuPage = new FileSubmenuPage(page);
    await fileSubmenuPage.togglePreviewMode();
    await fileSubmenuPage.checkFileSubMenuButtonsPreviewMode();
  });

  test('File Submenu: 2 - Checking History button in Preview Mode (left)', async () => {
    const fileSubmenuPage = new FileSubmenuPage(page);
    await page.click(fileSubmenuPage.fileFormButton);
    await fileSubmenuPage.checkHistoryForm();
    expect(await page.locator(fileSubmenuPage.fileForm).isVisible()).toBeTruthy();
    await page.click(fileSubmenuPage.fileFormCloseButton);
  });

  test('File Submenu: 3 - Checking History button in Preview Mode (right)', async () => {
    const fileSubmenuPage = new FileSubmenuPage(page);
    await fileSubmenuPage.toggleMenuRight();
    await page.click(fileSubmenuPage.fileFormButton);
    await fileSubmenuPage.checkHistoryForm();
    expect(await page.locator(fileSubmenuPage.fileForm).isVisible()).toBeTruthy();
    await page.click(fileSubmenuPage.fileFormCloseButton);
  });

  // eslint-disable-next-line jest/expect-expect
  test('File Submenu: 4 - Checking file submenu buttons in Edit Mode', async () => {
    const fileSubmenuPage = new FileSubmenuPage(page);
    await fileSubmenuPage.toggleEditMode();
    await fileSubmenuPage.checkFileSubMenuButtonsEditMode();
  });

  // eslint-disable-next-line jest/expect-expect
  test('File Submenu: 5 - Checking History button in Edit Mode (left)', async () => {
    const fileSubmenuPage = new FileSubmenuPage(page);
    await fileSubmenuPage.toggleEditMode();
    await page.click(fileSubmenuPage.fileFormButton);
    await fileSubmenuPage.checkHistoryForm();
    await page.click(fileSubmenuPage.fileFormCloseButton);
  });

  test('File Submenu: 6 - Checking Revert button in Edit Mode (left)', async () => {
    const fileSubmenuPage = new FileSubmenuPage(page);
    await fileSubmenuPage.toggleEditMode();
    await page.click(fileSubmenuPage.fileFormButton);
    await fileSubmenuPage.checkRevertForm();
    expect(await page.locator(fileSubmenuPage.fileForm).isVisible()).toBeTruthy();
    await page.click(fileSubmenuPage.fileFormCloseButton);
  });

  test('File Submenu: 7 - Checking Revert button in Edit Mode (right)', async () => {
    const fileSubmenuPage = new FileSubmenuPage(page);
    await fileSubmenuPage.toggleEditMode();
    await fileSubmenuPage.toggleMenuRight();
    await page.click(fileSubmenuPage.fileFormButton);
    await fileSubmenuPage.checkRevertForm();
    expect(await page.locator(fileSubmenuPage.fileForm).isVisible()).toBeTruthy();
    await page.click(fileSubmenuPage.fileFormCloseButton);
  });

  // eslint-disable-next-line jest/expect-expect
  test('File Submenu: 8 - Checking History button in Edit Mode (right)', async () => {
    const fileSubmenuPage = new FileSubmenuPage(page);
    await fileSubmenuPage.toggleEditMode();
    await fileSubmenuPage.toggleMenuRight();
    await page.click(fileSubmenuPage.fileFormButton);
    await fileSubmenuPage.checkHistoryForm();
    await page.click(fileSubmenuPage.fileFormCloseButton);
  });
});
