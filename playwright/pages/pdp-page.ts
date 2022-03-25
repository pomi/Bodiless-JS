// pdp-page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class EditorMenuPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }
}
