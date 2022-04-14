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
/*
"3. click Deafult flow container
4. click +
5. select Square Image
6.check that Component Picker is not open
7. click an image placeholder of Square Image
8. click Image icon
9. modify Alt value
10. upload in image
11. check that Image uploaded
12. check that Alt value is saved
13. check that 'Add', 'Swap', 'Delete' icons are present in Admin Menu"
 */
// flowContainer.spec.ts
import { expect, Page, test } from '@playwright/test';
import { FlowContainerPage } from '../../pages/flow-container-page';

test.describe('Flow container', async () => {
  let page: Page;
  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('/flow-container');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('Flow container: 1 - checking presence of all Flow Container sections', async () => {
    const flowContainerPage = new FlowContainerPage(page);
    await flowContainerPage.toggleEditMode();
    expect(await page.locator(flowContainerPage.flowContainer1Item).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainer25Width).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainer33Width).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainer50And100).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainer50Width).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainer66Width).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainer75Width).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainer100Only).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainerContentful).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainerLibrary).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainerLimitedFlow).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainerNestedFlow).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainerDefault).isVisible()).toBeTruthy();
  });

  test('Flow container: 2 - checking adding and filling in a Square Image in the Default Flow Container', async () => {
    const flowContainerPage = new FlowContainerPage(page);
    await flowContainerPage.toggleEditMode();
    await page.click(flowContainerPage.flowContainerDefault);
    await page.click(flowContainerPage.addFlowContainerButton);
    await page.click(flowContainerPage.imagesCheckbox);
    await page.click(flowContainerPage.squareImageButton);
    await page.click(flowContainerPage.squareImageButtonInsideContainer);
    await page.click(flowContainerPage.selectImageButton);
    await page.setInputFiles('input[type=file]', flowContainerPage.pathToImages + flowContainerPage.imageTwoName);
    await page.fill('#image-alt', 'alt-test');
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes('flowContainer') && response.status() === 200),
      page.click(flowContainerPage.submitButton),
    ]);
  });
});
