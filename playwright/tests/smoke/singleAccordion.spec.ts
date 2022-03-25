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
// singleAccordion.spec.ts
import { expect, Page, test } from '@playwright/test';

const title = 'AT-Title1';
const body = 'AT-Description1';
const editedPostfix = '-edited';
// const titleField = '#accordion__title-accordion-4 > div > div';
const titleFirstXpath = '#accordion-4 div[data-accordion-element="accordion-title"] div[data-slate-editor="true"]';
const bodyFirstXpath = '#accordion-4 div[data-accordion-element="accordion-body"] div[data-slate-editor="true"]';
const plusIconFirstXpath = '//*[@id="accordion-4"]//*[@data-accordion-icon="expand"]';
const minusIconFirstXpath = '//*[@id="accordion-4"]//*[@data-accordion-icon="collapse"]';
const bodySecondXpath = '//*[@id="accordion-5"]//*[@data-accordion-element="accordion-body"]';
const plusIconSecondXpath = '//*[@id="accordion-5"]//*[@data-accordion-icon="expand"]';
const minusIconSecondXpath = '//*[@id="accordion-5"]//*[@data-accordion-icon="collapse"]';
const editButton = 'button[aria-label="Edit"]';
const accordionBodyRequest = 'accordion-expanded$body';
const accordionTitleRequest = 'accordion-expanded$title';

async function typeText(page: Page, locator:string, text:string, request:string) {
  await page.click(locator);
  await Promise.all([
    page.waitForResponse(response => response.url()
      .includes(request) && response.status() === 200),
    page.type(locator, text),
  ]);
}

test.describe('Single Accordion smoke tests', () => {
  let page: Page;
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/accordion');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('accordions: 1 - filling and editing in Title and Body in 1st accordion', async () => {
    // given
    await page.click(editButton);
    // when
    await typeText(page, bodyFirstXpath, body, accordionBodyRequest);
    await typeText(page, titleFirstXpath, title, accordionTitleRequest);
    // then
    expect.soft(await page.locator(titleFirstXpath).innerText()).toEqual(title);
    expect.soft(await page.locator(bodyFirstXpath).innerText()).toEqual(body);
    // check in preview mode
    await page.click(editButton);
    expect.soft(await page.locator(titleFirstXpath).innerText()).toEqual(title);
    expect.soft(await page.locator(bodyFirstXpath).innerText()).toEqual(body);
    // check in edit mode again
    await page.click(editButton);
    expect.soft(await page.locator(titleFirstXpath).innerText()).toEqual(title);
    expect.soft(await page.locator(bodyFirstXpath).innerText()).toEqual(body);
    // edit body and title
    await typeText(page, bodyFirstXpath, editedPostfix, accordionBodyRequest);
    await typeText(page, titleFirstXpath, editedPostfix, accordionTitleRequest);
    // check edited fields
    expect.soft(await page.locator(titleFirstXpath).innerText()).toEqual(title + editedPostfix);
    expect.soft(await page.locator(bodyFirstXpath).innerText()).toEqual(body + editedPostfix);
    // check in preview mode
    await page.click(editButton);
    expect.soft(await page.locator(titleFirstXpath).innerText()).toEqual(title + editedPostfix);
    expect.soft(await page.locator(bodyFirstXpath).innerText()).toEqual(body + editedPostfix);
    // check in edit mode again
    await page.click(editButton);
    expect.soft(await page.locator(titleFirstXpath).innerText()).toEqual(title + editedPostfix);
    expect.soft(await page.locator(bodyFirstXpath).innerText()).toEqual(body + editedPostfix);
  });

  test('accordions: 2 - collapsing and expanding the 1st accordion', async () => {
    await page.click(minusIconFirstXpath);
    await expect.soft(page.locator(bodyFirstXpath)).not.toBeVisible();
    await page.click(plusIconFirstXpath);
    await expect.soft(page.locator(bodyFirstXpath)).toBeVisible();
  });

  test('accordions: 3 - collapsing and expanding the 2st accordion', async () => {
    await page.click(plusIconSecondXpath);
    await expect.soft(page.locator(bodySecondXpath)).toBeVisible();
    await page.click(minusIconSecondXpath);
    await expect.soft(page.locator(bodySecondXpath)).not.toBeVisible();
  });
});
