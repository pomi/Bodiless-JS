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
import { test, Page, expect } from '@playwright/test';
import { CardsPage } from '../../pages/cards-page';

test.describe('Testing cards', () => {
  let page: Page;
  let cardsPage : CardsPage;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    cardsPage = new CardsPage(page);
    await page.goto('/cards/');
  });

  test('cards: 1 - filling in Title', async () => {
    await cardsPage.toggleEditMode();
    await cardsPage.typeText(cardsPage.titleXpath, cardsPage.title, 'horizontal$title');
    expect(await page.locator(cardsPage.titleXpath).innerText()).toEqual(cardsPage.title);
  });

  test('cards: 2 - filling in Body', async () => {
    await cardsPage.typeText(cardsPage.descriptionXpath, cardsPage.description, 'horizontal$body');
    expect(await page.locator(cardsPage.descriptionXpath).innerText()).toEqual(cardsPage.description);
  });

  test('cards: 3 - filling in CTA text', async () => {
    await cardsPage.typeText(cardsPage.ctaLabelXpath, cardsPage.ctaLabel, 'horizontal$ctatext');
    expect(await page.locator(cardsPage.ctaLabelXpath).innerText()).toEqual(cardsPage.ctaLabel);
  });

  test('cards: 4 - filling in CTA url', async () => {
    await page.click(cardsPage.linkIconCTAXpath);
    await cardsPage.typeText(cardsPage.urlFieldCTAXpath, cardsPage.cardUrl, 'horizontal$link', cardsPage.checkmarkIconLinkCTAFormXpath);
  });

  test('cards: 5 - uploading an image', async () => {
    await page.click(cardsPage.imagePlaceholderXpath);
    await page.click(cardsPage.imageIconXpath);
    await page.setInputFiles('input[type=file]', cardsPage.pathToImages + cardsPage.imageNameOriginal);
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes('horizontal$image') && response.status() === 200),
      page.click(cardsPage.checkmarkIconImageFormXpath),
    ]);
  });

  test('cards: 6 - filling an image alt text', async () => {
    await page.click(cardsPage.imagePlaceholderXpath);
    await page.click(cardsPage.imageIconXpath);
    await cardsPage.typeText(cardsPage.altFieldXpath, cardsPage.imageAltText, 'horizontal$image', cardsPage.checkmarkIconImageFormXpath);
  });

  test('cards: 7 - checking data in Preview Mode', async () => {
    await cardsPage.togglePreviewMode();
    expect(await page.locator(cardsPage.titleXpath).innerText()).toEqual(cardsPage.title);
    expect(await page.locator(cardsPage.descriptionXpath).innerText()).toEqual(cardsPage.description);
    expect(await page.locator(cardsPage.ctaLabelXpath).innerText()).toEqual(cardsPage.ctaLabel);
    expect(await page.locator(cardsPage.imagePlaceholderXpath).getAttribute('src')).toMatch(cardsPage.imageOrigPathRegex);
    expect(await page.locator(cardsPage.imagePlaceholderXpath).isVisible()).toBeTruthy();
    const imageDimentions = await page.locator(cardsPage.imagePlaceholderXpath).boundingBox();
    expect(imageDimentions.width).toBeGreaterThan(0);
    expect(imageDimentions.height).toBeGreaterThan(0);
    expect(await page.locator(cardsPage.imagePlaceholderXpath).getAttribute('alt')).toEqual(cardsPage.imageAltText);
    expect(await page.locator(cardsPage.imageLinkXpath).getAttribute('href')).toEqual(cardsPage.normalizedUrl);
    await Promise.all([
      page.waitForNavigation(),
      page.click(cardsPage.ctaButtonXpath),
    ]);
    expect(page.url()).toContain(cardsPage.normalizedUrl);
    await page.goto(cardsPage.pagePath);
  });

  test('cards: 8 - checking that the data still present in Edit Mode after switching back from Preview Mode', async () => {
    await cardsPage.toggleEditMode();
    expect(await page.locator(cardsPage.titleXpath).innerText()).toEqual(cardsPage.title);
    expect(await page.locator(cardsPage.descriptionXpath).innerText()).toEqual(cardsPage.description);
    expect(await page.locator(cardsPage.ctaLabelXpath).innerText()).toEqual(cardsPage.ctaLabel);
    expect(await page.locator(cardsPage.imagePlaceholderXpath).getAttribute('src')).toMatch(cardsPage.imageOrigPathRegex);
    expect(await page.locator(cardsPage.imagePlaceholderXpath).isVisible()).toBeTruthy();
    const imageDimensions = await page.locator(cardsPage.imagePlaceholderXpath).boundingBox();
    expect(imageDimensions.width).toBeGreaterThan(0);
    expect(imageDimensions.height).toBeGreaterThan(0);
    await page.waitForSelector(cardsPage.imagePlaceholderXpath);
    // todo deal with inconsistent error
    // expect(await page.locator(cardsPage.imagePlaceholderXpath).getAttribute('alt')).toEqual(cardsPage.imageAltText);
    expect(await page.locator(cardsPage.imageLinkXpath).getAttribute('href')).toEqual(cardsPage.normalizedUrl);
  });

  test('cards: 9 - editing Title', async () => {
    await cardsPage.typeText(cardsPage.titleXpath, cardsPage.editedPostfix, 'horizontal$title');
    expect(await page.locator(cardsPage.titleXpath).innerText()).toEqual(cardsPage.title + cardsPage.editedPostfix);
  });

  test('cards: 10 - editing Description', async () => {
    await cardsPage.typeText(cardsPage.descriptionXpath, cardsPage.editedPostfix, 'horizontal$body');
    expect(await page.locator(cardsPage.descriptionXpath).innerText()).toEqual(cardsPage.description + cardsPage.editedPostfix);
  });

  test('cards: 11 - editing CTA label', async () => {
    await cardsPage.typeText(cardsPage.ctaLabelXpath, cardsPage.editedPostfix, 'horizontal$ctatext');
    expect(await page.locator(cardsPage.ctaLabelXpath).innerText()).toEqual(cardsPage.ctaLabel + cardsPage.editedPostfix);
  });

  test('cards: 12 - editing CTA url', async () => {
    await page.click(cardsPage.linkIconCTAXpath);
    await cardsPage.typeText(cardsPage.urlFieldCTAXpath, cardsPage.editedPostfix, 'horizontal$link', cardsPage.checkmarkIconLinkCTAFormXpath);
  });

  test('cards: 13 - uploading a new image and editing an image alt text', async () => {
    await page.click(cardsPage.imagePlaceholderXpath);
    await page.click(cardsPage.imageIconXpath);
    await cardsPage.typeText(cardsPage.altFieldXpath, cardsPage.editedPostfix, 'horizontal$image', cardsPage.checkmarkIconImageFormXpath);
    await page.click(cardsPage.imagePlaceholderXpath);
    await page.click(cardsPage.imageIconXpath);
    await page.setInputFiles('input[type=file]', cardsPage.pathToImages + cardsPage.imageNameUpdated);
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes('horizontal$image') && response.status() === 200),
      page.click(cardsPage.checkmarkIconImageFormXpath),
    ]);
  });

  test('cards: 14 - checking edited data in Preview Mode', async () => {
    await cardsPage.togglePreviewMode();
    expect(await page.locator(cardsPage.titleXpath).innerText()).toEqual(cardsPage.title + cardsPage.editedPostfix);
    expect(await page.locator(cardsPage.descriptionXpath).innerText()).toEqual(cardsPage.description + cardsPage.editedPostfix);
    expect(await page.locator(cardsPage.ctaLabelXpath).innerText()).toEqual(cardsPage.ctaLabel + cardsPage.editedPostfix);
    expect(await page.locator(cardsPage.imagePlaceholderXpath).getAttribute('src')).toMatch(cardsPage.imageUpdPathRegex);
    expect(await page.locator(cardsPage.imagePlaceholderXpath).isVisible()).toBeTruthy();
    const imageDimentions = await page.locator(cardsPage.imagePlaceholderXpath).boundingBox();
    expect(imageDimentions.width).toBeGreaterThan(0);
    expect(imageDimentions.height).toBeGreaterThan(0);
    // todo deal with inconsistent error
    // expect(await page.locator(cardsPage.imagePlaceholderXpath).getAttribute('alt')).toEqual(cardsPage.imageAltText);
    expect(await page.locator(cardsPage.imageLinkXpath).getAttribute('href')).toContain(cardsPage.normalizedUrl + cardsPage.editedPostfix);
    await Promise.all([
      page.waitForNavigation(),
      page.click(cardsPage.ctaButtonXpath),
    ]);
    expect(page.url()).toContain(cardsPage.normalizedUrl + cardsPage.editedPostfix);
    await page.goto(cardsPage.pagePath);
  });

  test('cards: 15 - checking the edited data still present in Edit Mode', async () => {
    await cardsPage.toggleEditMode();
    expect(await page.locator(cardsPage.titleXpath).innerText()).toEqual(cardsPage.title + cardsPage.editedPostfix);
    expect(await page.locator(cardsPage.descriptionXpath).innerText()).toEqual(cardsPage.description + cardsPage.editedPostfix);
    expect(await page.locator(cardsPage.ctaLabelXpath).innerText()).toEqual(cardsPage.ctaLabel + cardsPage.editedPostfix);
    expect(await page.locator(cardsPage.imagePlaceholderXpath).getAttribute('src')).toMatch(cardsPage.imageUpdPathRegex);
    expect(await page.locator(cardsPage.imagePlaceholderXpath).isVisible()).toBeTruthy();
    const imageDimensions = await page.locator(cardsPage.imagePlaceholderXpath).boundingBox();
    expect(imageDimensions.width).toBeGreaterThan(0);
    expect(imageDimensions.height).toBeGreaterThan(0);
    await page.waitForSelector(cardsPage.imagePlaceholderXpath);
    // todo deal with inconsistent error
    // expect(await page.locator(cardsPage.imagePlaceholderXpath).getAttribute('alt')).toEqual(cardsPage.imageAltText);
    expect(await page.locator(cardsPage.imageLinkXpath).getAttribute('href')).toContain(cardsPage.normalizedUrl + cardsPage.editedPostfix);
  });
});
