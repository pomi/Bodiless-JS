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

const editIcon = '//*[@aria-label="Edit"]';
const pagePath = '/products/';
const productBase = 'pdp-autotest';
const pdpURL = productBase + Math.floor(Math.random() * 10000).toString();
const pdpPagePath = pagePath + pdpURL;
const title = 'AT - PDD title';
const accordionBody = 'AT - Overview';
const pathToImages = './cypress/fixtures/images/';
const imageOneName = 'img_615x500.jpg';
const imageName = 'img_615x500.jpg';
const pageIconXpath = '//*[@aria-label="Page"]';
const newPageIconXpath = '//*[@aria-label="New"]';
const fieldAddPageFormXpath = '//*[@aria-label="Context Submenu Form"]//input[@name="new-page-path"]';
const checkmarkIconAddPageFormXpath = '//*[@aria-label="Context Submenu Form"]//*[@aria-label="Submit"]';
const newPageLinkXpath = '//*[@id="new-page-link"]';
const titleXpath = '//*[@data-product-element="title"]//*[@data-slate-editor="true"]';
const accordionOverviewBodyXpath = '//*[@data-accordion-element="accordion"][@aria-label="Overview"]//*[@data-accordion-element="accordion-body"]//*[@data-slate-editor="true"]';
const accordionDirectionsExpandXpath = '//*[@data-accordion-element="accordion"][@aria-label="Directions"]//*[@data-accordion-icon="expand"]';
const accordionDirectionsBodyExpandedXpath = '//*[@data-accordion-element="accordion"][@aria-label="Directions"]//*[@data-accordion-element="accordion-body"]';
const accordionDirectionsBodyPlaceholderXpath = '//*[@data-accordion-element="accordion"][@aria-label="Directions"]//*[@data-accordion-element="accordion-body"]//*[text()="Enter Product Information"]';
const bvTextXpath = '//*[@data-product-element="ratings-summary"][text()="Please hover and click to enter Bazaarvoice Product External ID: "]';
const editBVIconXpath = '//*[@aria-label="Local Context Menu"]//*[@aria-label="Settings Reviews"]';
const closeBVFormXpath = '//*[@aria-label="Context Menu Settings Reviews Form"]//*[@aria-label="Cancel"]';
const imagePlaceholderXpath = '//*[@data-product-element="image"]';
const imageIconXpath = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Select Image"]';
const checkmarkIconImageFormXpath = '//form[@aria-label="Context Menu Select Image Form"]//button[@aria-label="Submit"]';
const flexboxXpath = '//*[@data-product-element="flow-container"]';
const addComponentIconXpath = '//button[@aria-label="Add Flow Container"]';
const imagesBase = 'images/pages';
const productRegexp = '/[a-zA-Z0-9]+/';
const imagePathRegex = new RegExp(imagesBase + pdpPagePath + productRegexp + imageName, '');

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
    await page.click(pageIconXpath);
    await page.click(newPageIconXpath);
    // tslint:disable-next-line:max-line-length
    await typeText(page, fieldAddPageFormXpath, pdpURL, 'page-data.json', checkmarkIconAddPageFormXpath);
    await page.click(newPageLinkXpath);
    expect.soft(page.url()).toEqual(baseURL + pdpPagePath);
    await page.click(editIcon);
    await typeText(page, titleXpath, title, 'product_title');
    expect.soft(await page.locator(titleXpath).innerText()).toEqual(title);
    await typeText(page, accordionOverviewBodyXpath, accordionBody, 'accordion-1$body');
    await page.click(accordionDirectionsExpandXpath);
    expect(await page.locator(accordionDirectionsBodyExpandedXpath).isVisible()).toBeTruthy();
    expect(await page.locator(accordionDirectionsBodyPlaceholderXpath).isVisible()).toBeTruthy();
    expect.soft(await page.locator(accordionOverviewBodyXpath).innerText()).toEqual(accordionBody);
    await page.click(bvTextXpath);
    await page.click(editBVIconXpath);
    await page.click(closeBVFormXpath);
    // FlowContainer
    await page.click(flexboxXpath);
    expect(await page.locator(addComponentIconXpath).isVisible()).toBeTruthy();
    // upload image
    await page.click(imagePlaceholderXpath);
    await page.click(imageIconXpath);
    await page.setInputFiles('input[type=file]', pathToImages + imageOneName);
    await page.click(checkmarkIconImageFormXpath);
    expect(await page.locator(imagePlaceholderXpath).getAttribute('src')).toMatch(imagePathRegex);
    // check in preview mode
    await page.click(editIcon);
    expect.soft(await page.locator(titleXpath).innerText()).toEqual(title);
    expect.soft(await page.locator(accordionOverviewBodyXpath).innerText()).toEqual(accordionBody);
    expect(await page.locator(imagePlaceholderXpath).getAttribute('src')).toMatch(imagePathRegex);
    // check in edit mode
    await page.click(editIcon);
    expect.soft(await page.locator(titleXpath).innerText()).toEqual(title);
    expect.soft(await page.locator(accordionOverviewBodyXpath).innerText()).toEqual(accordionBody);
    expect(await page.locator(imagePlaceholderXpath).getAttribute('src')).toMatch(imagePathRegex);
  });
});
