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
import { LinkTogglePage } from '../../pages/link-toggle-page';

test.describe('Link Toggle smoke tests', () => {
  let page: Page;
  test.beforeEach(async ({ browser }) => {
    // { viewport: { width: 1200, height: 850 } }
    page = await browser.newPage({ viewport: { width: 1200, height: 850 } });
    await page.goto('/link-toggle/');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('link toggle: 1 - checking the label without a url', async () => {
    const linkTogglePage = new LinkTogglePage(page);
    await page.click(linkTogglePage.editButton);
    // await page.click(labelXpath);
    await linkTogglePage
      .typeText(linkTogglePage.labelXpath, linkTogglePage.label, linkTogglePage.linkTextRequest);
    await page.click(linkTogglePage.linkIconAddXpath);
    // tslint:disable-next-line:max-line-length
    await linkTogglePage.typeText(linkTogglePage.urlFieldAddXpath, linkTogglePage.url, linkTogglePage.linkToggleRequest, linkTogglePage.submitButton);
    expect.soft(await page.locator(linkTogglePage.labelXpath).innerText())
      .toEqual(linkTogglePage.label);
    const elem = await page.locator(linkTogglePage.labelXpath);
    const parent = await elem.locator('xpath=..');
    expect.soft(await parent.getAttribute('href')).toEqual(linkTogglePage.normalizedUrl);

    await page.click(linkTogglePage.editButton);
    expect.soft(await page.locator(linkTogglePage.labelPreviewXpath).innerText())
      .toEqual(linkTogglePage.label);
    const elem2 = await page.locator(linkTogglePage.labelPreviewXpath);
    const parent2 = await elem2.locator('xpath=..');
    expect.soft(await parent2.getAttribute('href')).toEqual(linkTogglePage.normalizedUrl);

    await page.click(linkTogglePage.editButton);
    // tslint:disable-next-line:max-line-length
    await linkTogglePage.typeText(linkTogglePage.labelXpath, linkTogglePage.editedPostfix, linkTogglePage.linkTextRequest);
    await page.click('button[aria-label="Edit Link"]');
    // tslint:disable-next-line:max-line-length
    await linkTogglePage.typeText(linkTogglePage.urlFieldAddXpath, linkTogglePage.editedPostfix, linkTogglePage.linkRequest, linkTogglePage.submitButton);
    expect.soft(await page.locator(linkTogglePage.labelXpath).innerText())
      .toEqual(linkTogglePage.label + linkTogglePage.editedPostfix);
    expect.soft(await parent.getAttribute('href'))
      .toEqual(linkTogglePage.normalizedUrl + linkTogglePage.editedPostfix + linkTogglePage.slash);

    await page.click(linkTogglePage.editButton);
    expect.soft(await page.locator(linkTogglePage.labelPreviewXpath).innerText())
      .toEqual(linkTogglePage.label + linkTogglePage.editedPostfix);
    expect.soft(await parent2.getAttribute('href'))
      .toEqual(linkTogglePage.normalizedUrl + linkTogglePage.editedPostfix + linkTogglePage.slash);

    await page.click(linkTogglePage.editButton);
    await page.click(linkTogglePage.linkXpath);
    await page.click(linkTogglePage.linkIconEditXpath);
    await page.click(linkTogglePage.removeLinkXpath);
    expect.soft(await page.locator(linkTogglePage.labelXpath).innerText())
      .toEqual(linkTogglePage.label + linkTogglePage.editedPostfix);
    await expect.soft(await page.locator(linkTogglePage.linkXpath)).toBeVisible();
  });
});
