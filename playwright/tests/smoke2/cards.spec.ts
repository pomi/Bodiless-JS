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
import { test, Page } from '@playwright/test';
import { CardsPage } from '../../pages/cards-page';

test.describe('Testing cards', () => {
  let page: Page;
  let cardsPage : CardsPage;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    cardsPage = new CardsPage(page);
    await page.goto('/cards');
  });
});
