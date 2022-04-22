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
  let flowContainerPage: FlowContainerPage;
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1200, height: 850 } });
    page = await context.newPage();
    flowContainerPage = new FlowContainerPage(page);
    await page.goto('/flow-container');
  });

  test('Flow container: 1 - checking presence of all Flow Container sections', async () => {
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
    const defaultContainer = page.locator(flowContainerPage.flowContainerDefault);
    const img = defaultContainer.locator('img');
    expect.soft(await img.getAttribute('alt')).toEqual('alt-test');
    expect.soft(await img.getAttribute('src')).toContain(flowContainerPage.imageTwoName);
    await img.click();
    expect.soft(await page.locator(flowContainerPage.swapComponentButton).isVisible()).toBeTruthy();
    expect.soft(await page.locator(flowContainerPage.deleteComponentButton).isVisible()).toBeTruthy();
    expect.soft(await page.locator(flowContainerPage.addComponentButton).isVisible()).toBeTruthy();
  });

  test('Flow container: 3 - checking adding and filling in an Accordion in the Restricted to 1 item Flow Container', async () => {
    const restrictedTo1Container = page.locator(flowContainerPage.flowContainer1Item);
    await restrictedTo1Container.click();
    await page.click(flowContainerPage.addFlowContainerButton);
    await page.click(flowContainerPage.imagesCheckbox);
    await page.click(flowContainerPage.accordionCheckbox);
    await page.click(flowContainerPage.accordionInPicker);
    await page.click(flowContainerPage.accordionInsideRestrictedContainer);
    await flowContainerPage
      .typeText(flowContainerPage.accordionInsideRestrictedContainer, 'text to check', 'restricted');
    expect.soft(await page.locator(flowContainerPage.accordionInsideRestrictedContainer)
      .innerText()).toEqual('text to check');
    await page.click(flowContainerPage.accordionPlusButton);
    expect.soft(await page.locator(flowContainerPage.accordionBody).isVisible()).toBeTruthy();
    // text is not typed without this timeout, race condition
    await page.waitForTimeout(300);
    await flowContainerPage
      .typeText(flowContainerPage.accordionBody, 'accordion-body-text', '$body');
    expect.soft(await page.locator(flowContainerPage.accordionBody).innerText()).toEqual('accordion-body-text');
    await page.click(flowContainerPage.accordionMinusButton);
    expect.soft(await page.locator(flowContainerPage.accordionBody).isVisible()).toBeFalsy();
    expect.soft(await page.locator(flowContainerPage.swapComponentButton).isVisible()).toBeTruthy();
  });

  test('Flow container: 4 - checking adding and filling in a Contentful Tout in Default Width of 33%', async () => {
    await page.click(flowContainerPage.flowContainer33Width);
    await page.click(flowContainerPage.addFlowContainerButton);
    await page.click(flowContainerPage.accordionCheckbox);
    await page.click(flowContainerPage.contentfulCheckbox);
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes('width_33') && response.status() === 200),
      await page.click(flowContainerPage.accordionInPicker),
    ]);
    const containerWidth = await page.locator('#gatsby-focus-wrapper > div:nth-child(1) > div.my-2.container.mx-auto > div:nth-child(24) > section').boundingBox();
    const contentfulWidth = await page.locator('#gatsby-focus-wrapper > div:nth-child(1) > div.my-2.container.mx-auto > div:nth-child(24) > section > div > div').boundingBox();
    // @ts-ignore
    const ratio = Math.floor((contentfulWidth.width + 40) / containerWidth.width * 100);
    expect.soft(ratio).toBeCloseTo(32);
  });

  test('checking the added components in Preview Mode', async () => {
    await flowContainerPage.togglePreviewMode();
    expect.soft(await page.locator(flowContainerPage.swapComponentButton).isVisible()).toBeFalsy();
    expect.soft(await page.locator(flowContainerPage.addComponentButton).isVisible()).toBeFalsy();
    expect.soft(await page.locator(flowContainerPage.deleteComponentButton).isVisible()).toBeFalsy();
    const defaultContainer = page.locator(flowContainerPage.flowContainerDefault);
    const img = defaultContainer.locator('img');
    expect.soft(await img.getAttribute('alt')).toEqual('alt-test');
    expect.soft(await img.getAttribute('src')).toContain(flowContainerPage.imageTwoName);
    expect.soft(await page.locator(flowContainerPage.accordionPlusButton).isVisible()).toBeTruthy();
    expect.soft(await page.locator(flowContainerPage.accordionInsideRestrictedContainer)
      .isVisible()).toBeTruthy();
    expect.soft(await page.locator(flowContainerPage.accordionBody).isVisible()).toBeFalsy();
    await page.click(flowContainerPage.accordionPlusButton);
    expect.soft(await page.locator(flowContainerPage.accordionBody).isVisible()).toBeTruthy();
    expect.soft(await page.locator('#width_33 > div').isVisible()).toBeTruthy();
  });

  /*
  "34. switch to Edit Mode
35. click Square Image
36. click Swap in Admin Menu
37. select Landscape Linkable
38. check that Image and Alt text are present
39. click the image
40. click Link icon
41. type Url value. click V
42. check that Image has the href and corresponding value"
   */
  test('checking swapping a component (Square Image to Landscape Linkable Image)', async () => {
    await flowContainerPage.toggleEditMode();
    await page.locator('#flowContainer > div > img').click();
    await page.click(flowContainerPage.swapComponentButton);
    await page.click(flowContainerPage.contentfulCheckbox);
    await page.click('div[data-item-id="LandscapeLinkableImage"]');
    const defaultContainer = page.locator(flowContainerPage.flowContainerDefault);
    const img = defaultContainer.locator('img');
    expect.soft(await img.getAttribute('alt')).toEqual('alt-test');
    expect.soft(await img.getAttribute('src')).toContain(flowContainerPage.imageTwoName);
    await page.locator('#flowContainer > div a >> img').click();
    await page.click(flowContainerPage.editImageButton);
    await flowContainerPage.typeText('#link-href', 'new_link', 'flowContainer', flowContainerPage.checkmarkIconAddPageForm);
  });
});
