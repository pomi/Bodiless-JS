// base-page.ts
import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  readonly switcherIcon: string;

  readonly editIcon: string;

  constructor(page: Page) {
    this.page = page;
    this.switcherIcon = '//*[@aria-label="switcher"]';
    this.editIcon = '//*[@aria-label="Edit"]';
  }

  async typeText(locator:string, text:string, request:string, confirmButton?:string) {
    if (typeof confirmButton !== 'undefined') {
      await this.page.click(locator);
      await this.page.keyboard.press('ArrowDown');
      await this.page.type(locator, text);
      await Promise.all([
        this.page.waitForResponse(response => response.url()
          .includes(request) && response.status() === 200),
        this.page.click(confirmButton),
      ]);
    } else {
      await this.page.click(locator);
      await this.page.keyboard.press('ArrowDown');
      await Promise.all([
        this.page.waitForResponse(response => response.url()
          .includes(request) && response.status() === 200),
        this.page.type(locator, text),
      ]);
    }
  }

  async toggleMenuRight() {
    const session = await this.page.evaluate(() => window.sessionStorage);
    if (session.isPositionToggled === undefined || session.isPositionToggled === 'false') {
      await this.page.click(this.switcherIcon);
    }
  }

  async toggleMenuLeft() {
    const session = await this.page.evaluate(() => window.sessionStorage);
    if (session.isPositionToggled === 'true') {
      await this.page.click(this.switcherIcon);
    }
  }

  async toggleEditMode() {
    const session = await this.page.evaluate(() => window.sessionStorage);
    if (session.isEdit === undefined || session.isEdit === 'false') {
      await this.page.click(this.editIcon);
    }
  }

  async togglePreviewMode() {
    const session = await this.page.evaluate(() => window.sessionStorage);
    if (session.isEdit === 'true') {
      await this.page.click(this.editIcon);
    }
  }
}
