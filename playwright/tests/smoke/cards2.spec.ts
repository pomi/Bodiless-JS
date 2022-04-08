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

async function checkCardData(page:Page, cardsPage:  CardsPage) {
  expect(await page.locator(cardsPage.card.title).innerText()).toEqual(cardsPage.titleText);
  expect(await page.locator(cardsPage.card.body).innerText()).toEqual(cardsPage.bodyText);
  // tslint:disable-next-line:max-line-length
  expect(await page.locator('a:has-text("AT - CTA Link 1 -")').innerText()).toEqual(cardsPage.ctaText);
  expect(await page.locator(cardsPage.card.image).isVisible()).toBeTruthy();
  expect(await page.locator(cardsPage.card.image).getAttribute('src')).toBeDefined();
  expect(await page.locator(cardsPage.card.image).getAttribute('alt')).toBeDefined();
  expect(await page.locator(cardsPage.card.image).getAttribute('href')).toBeDefined();
}

async function checkEditedCardData(page:Page, cardsPage:  CardsPage) {
  // tslint:disable-next-line:max-line-length
  expect(await page.locator(cardsPage.card.title).innerText()).toEqual(cardsPage.titleText + cardsPage.postfix);
  // tslint:disable-next-line:max-line-length
  expect(await page.locator(cardsPage.card.body).innerText()).toEqual(cardsPage.bodyText + cardsPage.postfix);
  // tslint:disable-next-line:max-line-length
  expect(await page.locator('a:has-text("AT - CTA Link 1 -")').innerText()).toEqual(cardsPage.ctaText + cardsPage.postfix);
  expect(await page.locator(cardsPage.card.image).isVisible()).toBeTruthy();
  expect(await page.locator(cardsPage.card.image).getAttribute('src')).toBeDefined();
  expect(await page.locator(cardsPage.card.image).getAttribute('alt')).toBeDefined();
  expect(await page.locator(cardsPage.card.image).getAttribute('href')).toBeDefined();

  // expect(await page.locator(card.title).innerText()).toEqual(titleText + postfix);
  // expect(await page.locator(card.body).innerText()).toEqual(bodyText + postfix);
  // expect(await page
  //     .locator('a:has-text("AT - CTA Link 1 -")').innerText()).toEqual(ctaText + postfix);
  // expect(await page.locator(card.image).isVisible()).toBeTruthy();
  // expect(await page.locator(card.image).getAttribute('src')).toBeDefined();
  // expect(await page.locator(card.image).getAttribute('alt')).toBeDefined();
  // expect(await page.locator(card.image).getAttribute('href')).toBeDefined();
}

test.describe('Testing cards @smoke3', () => {
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/cards');
  });

  test('cards: 1 - filling first card', async () => {
    const cardsPage = new CardsPage(page);
    await cardsPage.toggleEditMode();
    // Filling title
    await cardsPage.typeText(cardsPage.card.title, cardsPage.titleText, 'horizontal$title');
    expect.soft(await page.locator(cardsPage.card.title).innerText()).toEqual(cardsPage.titleText);
    // Filling body
    await cardsPage.typeText(cardsPage.card.body, cardsPage.bodyText, 'horizontal$body');
    expect.soft(await page.locator(cardsPage.card.body).innerText()).toEqual(cardsPage.bodyText);
    // Filling CTA
    await cardsPage.typeText(cardsPage.card.link, cardsPage.ctaText, 'horizontal$ctatext');
    expect.soft(await page.locator(cardsPage.card.link).innerText()).toEqual(cardsPage.ctaText);
    // Filling CTA url
    // tslint:disable-next-line:max-line-length
    await cardsPage.typeText(cardsPage.linkCTA, cardsPage.ctaLinkValue, 'horizontal$link', cardsPage.submitCTAUrlButton);
    expect.soft(await page.locator(cardsPage.card.link).innerText()).toEqual(cardsPage.ctaText);
    // Upload image
    await page.click(cardsPage.card.image);
    await page.click(cardsPage.card.selectImageButton);
    await page.setInputFiles('input[type=file]', cardsPage.pathToImages + cardsPage.imageOneName);
    await Promise.all([
      page.waitForResponse(response => response.url()
            .includes('horizontal') && response.status() === 200),
      page.click(cardsPage.submitButton),
    ]);
    // Filling image alt text
    await page.click(cardsPage.card.image);
    await page.click(cardsPage.card.selectImageButton);
    // tslint:disable-next-line:max-line-length
    await cardsPage.typeText('#image-alt', cardsPage.imageAltText, 'horizontal', cardsPage.submitButton);
  });

  test('cards: 2 - checking data in Preview Mode', async () => {
    const cardsPage = new CardsPage(page);
    await checkCardData(page, cardsPage);
      // await page.click('a[data-bl-design-key="Card:Link"]');
      // expect(page.url()).toContain(ctaLinkValue);
      // await page.goto('http://localhost:8005/cards/');
  });

  test('cards: 3 - checking that the data still present in Edit Mode after switching back from Preview Mode', async () => {
    const cardsPage = new CardsPage(page);
    await cardsPage.toggleEditMode();
    await checkCardData(page, cardsPage);
  });

  test('cards: 4 - editing first card', async () => {
    const cardsPage = new CardsPage(page);
    await cardsPage.toggleEditMode();
    // Filling title
    await cardsPage.typeText(cardsPage.card.title, cardsPage.postfix, 'horizontal$title');
    expect.soft(await page.locator(cardsPage.card.title).innerText()).toEqual(cardsPage.titleText + cardsPage.postfix);
    // Filling body
    await cardsPage.typeText(cardsPage.card.body, cardsPage.postfix, 'horizontal$body');
    expect.soft(await page.locator(cardsPage.card.body).innerText()).toEqual(cardsPage.bodyText + cardsPage.postfix);
    // Filling CTA
    await cardsPage.typeText(cardsPage.card.link, cardsPage.postfix, 'horizontal$ctatext');
    expect.soft(await page.locator(cardsPage.card.link).innerText()).toEqual(cardsPage.ctaText + cardsPage.postfix);
    // Filling CTA url
    // tslint:disable-next-line:max-line-length
    await cardsPage.typeText(cardsPage.linkCTA, cardsPage.postfix, 'horizontal$link', cardsPage.submitCTAUrlButton);
    expect.soft(await page.locator(cardsPage.card.link).innerText()).toEqual(cardsPage.ctaText + cardsPage.postfix);
    // Upload image
    await page.click(cardsPage.card.image);
    await page.click(cardsPage.card.selectImageButton);
    await page.setInputFiles('input[type=file]', cardsPage.pathToImages + cardsPage.imageTwoName);
    await Promise.all([
      page.waitForResponse(response => response.url()
          .includes('horizontal') && response.status() === 200),
      page.click(cardsPage.submitButton),
    ]);
    // Filling image alt text
    await page.click(cardsPage.card.image);
    await page.click(cardsPage.card.selectImageButton);
    // tslint:disable-next-line:max-line-length
    await cardsPage.typeText('#image-alt', cardsPage.imageAltText  + cardsPage.postfix, 'horizontal', cardsPage.submitButton);
  });

  test('cards: 5 - checking edited data in Preview Mode', async () => {
    const cardsPage = new CardsPage(page);
    await checkEditedCardData(page, cardsPage);
    await page.click('a[data-bl-design-key="Card:Link"]');
    // expect(page.url()).toContain(postfix);
    await page.goto('http://localhost:8005/cards/');
  });

  test('cards: 6 - checking the edited data still present in Edit Mode', async () => {
    const cardsPage = new CardsPage(page);
    await cardsPage.toggleEditMode();
    await checkEditedCardData(page, cardsPage);
  });
});
