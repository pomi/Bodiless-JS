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
// cards.spec.ts
import { expect, test, Page } from '@playwright/test';
import { CardsPage } from '../../pages/cards-page';

const slash = '/';

test.describe.parallel('Testing cards @smoke3', () => {
  let page: Page;
  test.beforeEach(async ({ browser }) => {
        // { viewport: { width: 1200, height: 850 } }
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('/cards');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('cards: 1 - filling in Title', async () => {
    // horizontal$title.json
    const cardsPage = new CardsPage(page);
    await cardsPage.toggleEditMode();
    await cardsPage.typeText(cardsPage.card.title, cardsPage.titleText, 'horizontal$title');
    expect.soft(await page.locator(cardsPage.card.title).innerText()).toEqual(cardsPage.titleText);
    // edit title
    await cardsPage.typeText(cardsPage.card.title, cardsPage.postfix, 'horizontal$title');
    const textToCompare = cardsPage.titleText + cardsPage.postfix;
    expect.soft(await page.locator(cardsPage.card.title).innerText()).toEqual(textToCompare);
  });

  test('cards: 2 - filling in Body', async () => {
    // horizontal$body.json
    const cardsPage = new CardsPage(page);
    await cardsPage.toggleEditMode();
    await cardsPage.typeText(cardsPage.card.body, cardsPage.bodyText, 'horizontal$body');
    expect.soft(await page.locator(cardsPage.card.body).innerText()).toEqual(cardsPage.bodyText);
    // edit body
    const textToCompare = cardsPage.bodyText + cardsPage.postfix;
    await cardsPage.typeText(cardsPage.card.body, cardsPage.postfix, 'horizontal$body');
    expect.soft(await page.locator(cardsPage.card.body).innerText()).toEqual(textToCompare);
  });

  test('cards: 3 - filling in CTA text', async () => {
    // horizontal$ctatext.json
    const cardsPage = new CardsPage(page);
    await cardsPage.toggleEditMode();
    await cardsPage.typeText(cardsPage.card.link, cardsPage.ctaText, 'horizontal$ctatext');
    expect.soft(await page.locator(cardsPage.card.link).innerText()).toEqual(cardsPage.ctaText);
    // edit cta
    const textToCompare = cardsPage.ctaText + cardsPage.postfix;
    await cardsPage.typeText(cardsPage.card.link, cardsPage.postfix, 'horizontal$ctatext');
    expect.soft(await page.locator(cardsPage.card.link).innerText()).toEqual(textToCompare);
  });

  test('cards: 4 - filling in CTA url', async () => {
    // horizontal$link.json
    const cardsPage = new CardsPage(page);
    await cardsPage.toggleEditMode();
    await page.click(cardsPage.card.link);
    await page.click(cardsPage.linkCTA);
    await cardsPage.typeText('#link-href', cardsPage.ctaLinkValue, 'horizontal$link', cardsPage.submitCTAUrlButton);
    expect.soft(await page.locator(cardsPage.card.linkClickable)
      .getAttribute('href')).toEqual(slash + cardsPage.ctaLinkValue + slash);
    await page.click(cardsPage.card.link);
    await page.click(cardsPage.linkCTA);
    await cardsPage.typeText('#link-href', cardsPage.postfix, 'horizontal$link', cardsPage.submitCTAUrlButton);
    expect.soft(await page.locator(cardsPage.card.linkClickable)
      .getAttribute('href')).toEqual(slash + cardsPage.ctaLinkValue + slash + cardsPage.postfix + slash);
  });

  test('cards: 5 - uploading an image and filling an image alt text', async () => {
    // horizontal$image.json
    const cardsPage = new CardsPage(page);
    await cardsPage.toggleEditMode();
    await page.click(cardsPage.card.image);
    await page.click(cardsPage.card.selectImageButton);
    await page.setInputFiles('input[type=file]', cardsPage.pathToImages + cardsPage.imageOneName);
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes('horizontal$image') && response.status() === 200),
      page.click(cardsPage.submitButton),
    ]);
    await page.click(cardsPage.card.image);
    await page.click(cardsPage.card.selectImageButton);
    await cardsPage
      .typeText('#image-alt', cardsPage.imageAltText, 'horizontal', cardsPage.submitButton);
    // edit
    await page.click(cardsPage.card.image);
    await page.click(cardsPage.card.selectImageButton);
    await page.setInputFiles('input[type=file]', cardsPage.pathToImages + cardsPage.imageTwoName);
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes('horizontal$image') && response.status() === 200),
      page.click(cardsPage.submitButton),
    ]);
    await page.click(cardsPage.card.image);
    await page.click(cardsPage.card.selectImageButton);
    await cardsPage
      .typeText('#image-alt', cardsPage.postfix, 'horizontal', cardsPage.submitButton);
  });
});
