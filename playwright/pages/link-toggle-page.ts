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
    this.submitButton = 'button[aria-label="Submit"]';
    this.linkIconEditXpath = '//*[@aria-label="Local Context Menu"]//*[@aria-label="Edit Link"]';
    this.removeLinkXpath = '//form[@aria-label="Context Menu Edit Link Form"]//button[text()="Remove Link"]';
    this.editButton = 'button[aria-label="Edit"]';
    this.linkTextRequest = 'linktoggle1$text';
    this.linkToggleRequest = 'linktoggle1$link-toggle';
    this.linkRequest = 'linktoggle1$link';
  }
}
