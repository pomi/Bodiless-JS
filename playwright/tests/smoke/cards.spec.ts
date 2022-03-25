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

const pathToImages = './cypress/fixtures/images/';
const imageOneName = 'img_615x500.jpg';
const imageTwoName = 'img_615x502.jpg';
const card = {
  id: 'card_horizontal',
  image: '#card-horizontal img[data-card-element="image"]',
  title: '#card-horizontal *[data-card-element="title"] div[data-slate-editor="true"]',
  body: '#card-horizontal div[data-card-element="body"] div[data-slate-editor="true"]',
  link: '#card-horizontal *[data-card-element="link"] div[role="textbox"]',
  submitButton: 'button[aria-label="Submit"]',
  imageAltText: 'input[name="alt"]',
  selectImageButton: 'button[aria-label="Select Image"]',
  linkClickable: '#card-horizontal div[data-card-element="content-wrapper"] a[data-card-element="link"]',
};

const linkCTA = 'button[aria-label="Edit CTA"]';
const CTAUrl = 'input[aria-describedby="description"]';
const submitCTAUrlButton = 'button[aria-label="Submit"]';
const editButton = 'button[aria-label="Edit"]';

const titleText = 'AT - Title 1 -';
const bodyText = 'AT - Description 1 -';
const ctaText = 'AT - CTA Link 1 -';
const imageAltText = 'AT-1stCardAltText';
const postfix = 'edited';
const ctaLinkValue = 'AT-cardUrl1';

async function getEditor(page: Page, selector:string) {
  await page.click(selector);
}

async function typeInSlate(page: Page, text: string) {
  await page.keyboard.press('ArrowDown');
  await page.keyboard.type(text);
}

async function fillCTALink(page: Page, text: string) {
  await page.click(linkCTA);
  await page.keyboard.press('ArrowDown');
  await page.fill(CTAUrl, text);
  await page.click(submitCTAUrlButton);
}

test.describe('Testing cards @smoke3', () => {
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://localhost:8005/cards/');
    await page.click(editButton);
  });

  test('cards: 1 - filling first card', async () => {
    // Filling title
    await getEditor(page, card.title);
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes('horizontal$title') && response.status() === 200),
      typeInSlate(page, titleText),
    ]);
    expect.soft(await page.locator(card.title).innerText()).toEqual(titleText);
    // Filling body
    await getEditor(page, card.body);
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes('horizontal$body') && response.status() === 200),
      typeInSlate(page, bodyText),
    ]);
    expect.soft(await page.locator(card.body).innerText()).toEqual(bodyText);
    // Filling CTA
    await getEditor(page, card.link);
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes('horizontal$ctatext') && response.status() === 200),
      typeInSlate(page, ctaText),
    ]);
    expect.soft(await page.locator(card.link).innerText()).toEqual(ctaText);
    // Filling CTA url
    // await getEditor(page, card.link);
    await fillCTALink(page, ctaLinkValue);
    expect.soft(await page.locator(card.link).innerText()).toEqual(ctaText);
    // Upload image
    await page.click(card.image);
    await page.click(card.selectImageButton);
    await page.setInputFiles('input[type=file]', pathToImages + imageOneName);
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes('horizontal') && response.status() === 200),
      page.click(card.submitButton),
    ]);
    // Filling image alt text
    await page.click(card.image);
    await page.click(card.selectImageButton);
    await getEditor(page, card.imageAltText);
    await page.fill(card.imageAltText, imageAltText);
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes('horizontal') && response.status() === 200),
      page.click(card.submitButton),
    ]);
  });

  test('cards: 2 - checking data in Preview Mode', async () => {
    await page.click(editButton);
    expect(await page.locator(card.title).innerText()).toEqual(titleText);
    expect(await page.locator(card.body).innerText()).toEqual(bodyText);
    expect(await page.locator('a:has-text("AT - CTA Link 1 -")').innerText()).toEqual(ctaText);
    expect(await page.locator(card.image).isVisible()).toBeTruthy();
    expect(await page.locator(card.image).getAttribute('src')).toBeDefined();
    expect(await page.locator(card.image).getAttribute('alt')).toBeDefined();
    expect(await page.locator(card.image).getAttribute('href')).toBeDefined();
    // await page.click('a[data-bl-design-key="Card:Link"]');
    // expect(page.url()).toContain(ctaLinkValue);
    // await page.goto('http://localhost:8005/cards/');
  });

  test('cards: 3 - checking that the data still present in Edit Mode after switching back from Preview Mode', async () => {
    await page.click(editButton);
    expect(await page.locator(card.title).innerText()).toEqual(titleText);
    expect(await page.locator(card.body).innerText()).toEqual(bodyText);
    expect(await page.locator('a:has-text("AT - CTA Link 1 -")').innerText()).toEqual(ctaText);
    expect(await page.locator(card.image).isVisible()).toBeTruthy();
    expect(await page.locator(card.image).getAttribute('src')).toBeDefined();
    expect(await page.locator(card.image).getAttribute('alt')).toBeDefined();
    expect(await page.locator(card.image).getAttribute('href')).toBeDefined();
  });

  test('cards: 4 - editing first card', async () => {
    // Filling title
    await getEditor(page, card.title);
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes('horizontal$title') && response.status() === 200),
      typeInSlate(page, postfix),
    ]);
    expect.soft(await page.locator(card.title).innerText()).toEqual(titleText + postfix);
    // Filling body
    await getEditor(page, card.body);
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes('horizontal$body') && response.status() === 200),
      typeInSlate(page, postfix),
    ]);
    expect.soft(await page.locator(card.body).innerText()).toEqual(bodyText + postfix);
    // Filling CTA
    // await getEditor(page, card.link);
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes('horizontal$ctatext') && response.status() === 200),
      page.fill(card.link, ctaText + postfix),
    ]);
    expect.soft(await page.locator(card.link).innerText()).toEqual(ctaText + postfix);
    // Filling CTA url
    await getEditor(page, card.link);
    await fillCTALink(page, postfix);
    expect.soft(await page.locator(card.link).innerText()).toEqual(ctaText + postfix);
    // Upload image
    await page.click(card.image);
    await page.click(card.selectImageButton);
    await page.setInputFiles('input[type=file]', pathToImages + imageTwoName);
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes('horizontal') && response.status() === 200),
      page.click(card.submitButton),
    ]);
    // Filling image alt text
    await page.click(card.image);
    await page.click(card.selectImageButton);
    await getEditor(page, card.imageAltText);
    await page.fill(card.imageAltText, imageAltText);
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes('horizontal') && response.status() === 200),
      page.click(card.submitButton),
    ]);
  });

  test('cards: 5 - checking edited data in Preview Mode', async () => {
    await page.click(editButton);
    expect(await page.locator(card.title).innerText()).toEqual(titleText + postfix);
    expect(await page.locator(card.body).innerText()).toEqual(bodyText + postfix);
    expect(await page
      .locator('a:has-text("AT - CTA Link 1 -")').innerText()).toEqual(ctaText + postfix);
    expect(await page.locator(card.image).isVisible()).toBeTruthy();
    expect(await page.locator(card.image).getAttribute('src')).toBeDefined();
    expect(await page.locator(card.image).getAttribute('alt')).toBeDefined();
    expect(await page.locator(card.image).getAttribute('href')).toBeDefined();
    await page.click('a[data-bl-design-key="Card:Link"]');
    // expect(page.url()).toContain(postfix);
    await page.goto('http://localhost:8005/cards/');
  });

  test('cards: 6 - checking the edited data still present in Edit Mode', async () => {
    await page.click(editButton);
    expect(await page.locator(card.title).innerText()).toEqual(titleText + postfix);
    expect(await page.locator(card.body).innerText()).toEqual(bodyText + postfix);
    expect(await page
      .locator('a:has-text("AT - CTA Link 1 -")').innerText()).toEqual(ctaText + postfix);
    expect(await page.locator(card.image).isVisible()).toBeTruthy();
    expect(await page.locator(card.image).getAttribute('src')).toBeDefined();
    expect(await page.locator(card.image).getAttribute('alt')).toBeDefined();
    expect(await page.locator(card.image).getAttribute('href')).toBeDefined();
  });
});
