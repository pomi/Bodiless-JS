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
import { AccordionPage } from '../../pages/accordion-page';

/*async function typeText(page: Page, locator:string, text:string, request:string) {
  await page.click(locator);
  await Promise.all([
    page.waitForResponse(response => response.url()
      .includes(request) && response.status() === 200),
    page.type(locator, text),
  ]);
}*/

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
    const accordionPage = new AccordionPage(page);
    await page.click(accordionPage.editButton);
    await accordionPage.typeText(accordionPage.bodyFirstXpath, accordionPage.body, accordionPage.accordionBodyRequest);
    await accordionPage.typeText(accordionPage.titleFirstXpath, accordionPage.title, accordionPage.accordionTitleRequest);
    expect.soft(await page.locator(accordionPage.titleFirstXpath).innerText()).toEqual(accordionPage.title);
    expect.soft(await page.locator(accordionPage.bodyFirstXpath).innerText()).toEqual(accordionPage.body);
    // check in preview mode
    await accordionPage.togglePreviewMode();
    expect.soft(await page.locator(accordionPage.titleFirstXpath).innerText()).toEqual(accordionPage.title);
    expect.soft(await page.locator(accordionPage.bodyFirstXpath).innerText()).toEqual(accordionPage.body);
    // check in edit mode again
    await accordionPage.toggleEditMode();
    expect.soft(await page.locator(accordionPage.titleFirstXpath).innerText()).toEqual(accordionPage.title);
    expect.soft(await page.locator(accordionPage.bodyFirstXpath).innerText()).toEqual(accordionPage.body);
    // edit body and title
    await accordionPage.typeText(accordionPage.bodyFirstXpath, accordionPage.editedPostfix, accordionPage.accordionBodyRequest);
    await accordionPage.typeText(accordionPage.titleFirstXpath, accordionPage.editedPostfix, accordionPage.accordionTitleRequest);
    // check edited fields
    expect.soft(await page.locator(accordionPage.titleFirstXpath).innerText())
      .toEqual(accordionPage.title + accordionPage.editedPostfix);
    expect.soft(await page.locator(accordionPage.bodyFirstXpath).innerText())
      .toEqual(accordionPage.body + accordionPage.editedPostfix);
    // check in preview mode
    await accordionPage.togglePreviewMode();
    expect.soft(await page.locator(accordionPage.titleFirstXpath).innerText())
      .toEqual(accordionPage.title + accordionPage.editedPostfix);
    expect.soft(await page.locator(accordionPage.bodyFirstXpath).innerText())
      .toEqual(accordionPage.body + accordionPage.editedPostfix);
    // check in edit mode again
    await accordionPage.toggleEditMode();
    expect.soft(await page.locator(accordionPage.titleFirstXpath).innerText())
      .toEqual(accordionPage.title + accordionPage.editedPostfix);
    expect.soft(await page.locator(accordionPage.bodyFirstXpath).innerText())
      .toEqual(accordionPage.body + accordionPage.editedPostfix);
  });

  test('accordions: 2 - collapsing and expanding the 1st accordion', async () => {
    const accordionPage = new AccordionPage(page);
    await page.click(accordionPage.minusIconFirstXpath);
    await expect.soft(page.locator(accordionPage.bodyFirstXpath)).not.toBeVisible();
    await page.click(accordionPage.plusIconFirstXpath);
    await expect.soft(page.locator(accordionPage.bodyFirstXpath)).toBeVisible();
  });

  test('accordions: 3 - collapsing and expanding the 2st accordion', async () => {
    const accordionPage = new AccordionPage(page);
    await page.click(accordionPage.plusIconSecondXpath);
    await expect.soft(page.locator(accordionPage.bodySecondXpath)).toBeVisible();
    await page.click(accordionPage.minusIconSecondXpath);
    await expect.soft(page.locator(accordionPage.bodySecondXpath)).not.toBeVisible();
  });
});
