// editor-menu-page.ts
import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class EditorMenuPage extends BasePage {
  readonly page: Page;

  readonly menuBarLeft: string;

  readonly menuBarRight: string;

  readonly switcherIcon: string;

  readonly docsIcon: string;

  readonly pageIcon: string;

  readonly newPageIcon: string;

  readonly headerAddPageForm: string;

  readonly fieldAddPageForm: string;

  readonly closeIconAddPageForm: string;

  readonly checkmarkIconAddPageForm: string;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.menuBarLeft = '//*[@aria-label="Global Context Menu Left"]';
    this.menuBarRight = '//*[@aria-label="Global Context Menu Right"]';
    this.switcherIcon = '//*[@aria-label="switcher"]';
    this.docsIcon = '//*[@aria-label="Docs"]';
    this.pageIcon = '//*[@aria-label="Page"]';
    this.newPageIcon = '//*[@aria-label="New"]';
    this.headerAddPageForm = '//*[@aria-label="Context Submenu Form"]//h3[text()="Add a Blank Page"]';
    this.fieldAddPageForm = '//*[@aria-label="Context Submenu Form"]//input[@name="new-page-path"]';
    this.closeIconAddPageForm = '//*[@aria-label="Context Submenu Form"]//*[@aria-label="Cancel"]';
    this.checkmarkIconAddPageForm = '//*[@aria-label="Context Submenu Form"]//*[@aria-label="Submit"]';
  }

  async checkEditorMenuButtonsPreviewMode() {
    expect.soft(await this.page.locator(this.switcherIcon).isVisible).toBeTruthy();
    expect.soft(await this.page.locator(this.docsIcon).isVisible).toBeTruthy();
    expect.soft(await this.page.locator(this.editIcon).isVisible).toBeTruthy();
    expect.soft(await this.page.locator(this.pageIcon).isVisible).toBeTruthy();
  }

  async checkSwitcherAndMenuIcons() {
    await this.toggleMenuRight();
    // eslint-disable-next-line jest/no-standalone-expect
    expect(await this.page.locator(this.menuBarRight).isVisible()).toBeTruthy();
    await this.checkEditorMenuButtonsPreviewMode();
    await this.toggleMenuLeft();
    // eslint-disable-next-line jest/no-standalone-expect
    expect(await this.page.locator(this.menuBarLeft).isVisible()).toBeTruthy();
    await this.checkEditorMenuButtonsPreviewMode();
  }

  async checkAddNewPageButton() {
    await this.page.click(this.pageIcon);
    await this.page.click(this.newPageIcon);
    // eslint-disable-next-line jest/no-standalone-expect
    expect(await this.page.locator(this.headerAddPageForm).isVisible()).toBeTruthy();
    // eslint-disable-next-line jest/no-standalone-expect
    expect(await this.page.locator(this.fieldAddPageForm).isVisible()).toBeTruthy();
    // eslint-disable-next-line jest/no-standalone-expect
    expect(await this.page.locator(this.checkmarkIconAddPageForm).isVisible()).toBeTruthy();
    await this.page.click(this.closeIconAddPageForm);
  }
}
