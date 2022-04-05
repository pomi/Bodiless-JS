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
// pdp.spec.ts
import { expect, Page, test } from '@playwright/test';
import { PdpPage } from '../../pages/pdp-page';

// tslint:disable-next-line:max-line-length
async function typeText(page:Page, locator:string, text:string, request:string, confirmButton?:string) {
  if (typeof confirmButton !== 'undefined') {
    await page.click(locator);
    await page.keyboard.press('ArrowDown');
    await page.type(locator, text);
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes(request) && response.status() === 200),
      page.click(confirmButton),
    ]);
  } else {
    await page.click(locator);
    await page.keyboard.press('ArrowDown');
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes(request) && response.status() === 200),
      page.type(locator, text),
    ]);
  }
}

test.describe('PDP smoke tests', () => {
  let page: Page;
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage({ viewport: { width: 1200, height: 850 } });
    await page.goto('/products/');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('PDP: 1 - creating a page from /products/', async ({ baseURL }) => {
    const pdpPage = new PdpPage(page);
    await page.click(pdpPage.pageIconXpath);
    await page.click(pdpPage.newPageIconXpath);
    // tslint:disable-next-line:max-line-length
    await typeText(page, pdpPage.fieldAddPageFormXpath, pdpPage.pdpURL, 'page-data.json', pdpPage.checkmarkIconAddPageFormXpath);
    await page.click(pdpPage.newPageLinkXpath);
    expect.soft(page.url()).toEqual(baseURL + pdpPage.pdpPagePath);
    await page.click(pdpPage.editIcon);
    await typeText(page, pdpPage.titleXpath, pdpPage.title, 'product_title');
    expect.soft(await page.locator(pdpPage.titleXpath).innerText()).toEqual(pdpPage.title);
    await typeText(page, pdpPage.accordionOverviewBodyXpath, pdpPage.accordionBody, 'accordion-1$body');
    await page.click(pdpPage.accordionDirectionsExpandXpath);
    expect(await page.locator(pdpPage.accordionDirectionsBodyExpandedXpath).isVisible()).toBeTruthy();
    expect(await page.locator(pdpPage.accordionDirectionsBodyPlaceholderXpath).isVisible()).toBeTruthy();
    expect.soft(await page.locator(pdpPage.accordionOverviewBodyXpath).innerText()).toEqual(pdpPage.accordionBody);
    await page.click(pdpPage.bvTextXpath);
    await page.click(pdpPage.editBVIconXpath);
    await page.click(pdpPage.closeBVFormXpath);
    // FlowContainer
    await page.click(pdpPage.flexboxXpath);
    expect(await page.locator(pdpPage.addComponentIconXpath).isVisible()).toBeTruthy();
    // upload image
    await page.click(pdpPage.imagePlaceholderXpath);
    await page.click(pdpPage.imageIconXpath);
    await page.setInputFiles('input[type=file]', pdpPage.pathToImages + pdpPage.imageOneName);
    await page.click(pdpPage.checkmarkIconImageFormXpath);
    expect(await page.locator(pdpPage.imagePlaceholderXpath).getAttribute('src')).toMatch(pdpPage.imagePathRegex);
    // check in preview mode
    await page.click(pdpPage.editIcon);
    expect.soft(await page.locator(pdpPage.titleXpath).innerText()).toEqual(pdpPage.title);
    expect.soft(await page.locator(pdpPage.accordionOverviewBodyXpath).innerText()).toEqual(pdpPage.accordionBody);
    expect(await page.locator(pdpPage.imagePlaceholderXpath).getAttribute('src')).toMatch(pdpPage.imagePathRegex);
    // check in edit mode
    await page.click(pdpPage.editIcon);
    expect.soft(await page.locator(pdpPage.titleXpath).innerText()).toEqual(pdpPage.title);
    expect.soft(await page.locator(pdpPage.accordionOverviewBodyXpath).innerText()).toEqual(pdpPage.accordionBody);
    expect(await page.locator(pdpPage.imagePlaceholderXpath).getAttribute('src')).toMatch(pdpPage.imagePathRegex);
  });
});
