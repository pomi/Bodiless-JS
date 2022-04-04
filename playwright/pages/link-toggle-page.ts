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
// link-toggle-page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LinkTogglePage extends BasePage {
  readonly page: Page;

  readonly slash = '/';

  readonly label = 'AT - Label -';

  readonly url = 'AT-Url';

  readonly normalizedUrl = this.slash + this.url + this.slash;

  readonly editedPostfix = 'edited';

  readonly labelXpath = '//*[@data-linktoggle-element="link-toggle"]//*[@class="bodiless-inline-editable"]';

  readonly labelPreviewXpath = '//*[@data-linktoggle-element="link-toggle"]//span';

  readonly linkXpath = '//*[@data-linktoggle-element="link-toggle"]//a';

  readonly linkIconAddXpath = '//*[@aria-label="Local Context Menu"]//*[@aria-label="Add Link"]';

  readonly urlFieldAddXpath = '#link-href';

  readonly submitButton = 'button[aria-label="Submit"]';

  readonly linkIconEditXpath = '//*[@aria-label="Local Context Menu"]//*[@aria-label="Edit Link"]';

  readonly removeLinkXpath = '//form[@aria-label="Context Menu Edit Link Form"]//button[text()="Remove Link"]';

  readonly editButton = 'button[aria-label="Edit"]';

  readonly linkTextRequest = 'linktoggle1$text';

  readonly linkToggleRequest = 'linktoggle1$link-toggle';

  readonly linkRequest = 'linktoggle1$link';

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.label = 'AT - Label -';
    this.url = 'AT-Url';
    this.normalizedUrl = this.slash + this.url + this.slash;
    this.editedPostfix = 'edited';
    this.labelXpath = '//*[@data-linktoggle-element="link-toggle"]//*[@class="bodiless-inline-editable"]';
    this.labelPreviewXpath = '//*[@data-linktoggle-element="link-toggle"]//span';
    this.linkXpath = '//*[@data-linktoggle-element="link-toggle"]//a';
    this.linkIconAddXpath = '//*[@aria-label="Local Context Menu"]//*[@aria-label="Add Link"]';
    this.urlFieldAddXpath = '#link-href';
    // this.submitButton = 'button[aria-label="Submit"]';
    this.linkIconEditXpath = '//*[@aria-label="Local Context Menu"]//*[@aria-label="Edit Link"]';
    this.removeLinkXpath = '//form[@aria-label="Context Menu Edit Link Form"]//button[text()="Remove Link"]';
    this.editButton = 'button[aria-label="Edit"]';
    this.linkTextRequest = 'linktoggle1$text';
    this.linkToggleRequest = 'linktoggle1$link-toggle';
    this.linkRequest = 'linktoggle1$link';
  }
}
