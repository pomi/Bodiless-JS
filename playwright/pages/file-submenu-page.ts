// file-submenu-page.ts
import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class FileSubmenuPage extends BasePage {
  readonly page: Page;

  readonly editIcon: string;

  readonly fileForm: string;

  readonly fileFormButton: string;

  readonly fileFormCloseButton: string;

  readonly historyButton: string;

  readonly pushButton: string;

  readonly pullButton: string;

  readonly revertButton: string;

  readonly historyFormTitle: string;

  readonly historyFormItems: string;

  readonly historyFormSubmitButton: string;

  readonly historyFormCloseButton: string;

  readonly revertFormTitle: string;

  readonly revertFormDescription: string;

  readonly revertFormSubmitButton: string;

  readonly revertFormCloseButton: string;

  readonly switcherIcon: string;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.editIcon = '//*[@aria-label="Edit"]';
    this.fileForm = '//*[@aria-label="Context Submenu File form"]';
    this.fileFormButton = '//button[@aria-label="File"]';
    this.fileFormCloseButton = '//*[@aria-label="Context Submenu File form"]//*[@aria-label="Cancel"]';
    this.historyButton = '//*[@aria-label="Submenu"]//button[@aria-label="History"]';
    this.pushButton = '//*[@aria-label="Submenu"]//button[@aria-label="Push"]';
    this.pullButton = '//*[@aria-label="Submenu"]//button[@aria-label="Pull"]';
    this.revertButton = '//*[@aria-label="Submenu"]//button[@aria-label="Revert"]';
    this.historyFormTitle = '//*[@aria-label="Context Submenu Form"]//h3[text()="Latest Commits"]';
    this.historyFormItems = '//*[@aria-label="Context Submenu Form"]//input[@type="radio"][@name="commits"]';
    this.historyFormSubmitButton = '//*[@aria-label="Context Submenu Form"]//*[@aria-label="Submit"]';
    // tslint:disable-next-line:max-line-length
    this.historyFormCloseButton = '//*[@aria-label="Context Submenu Form"]//*[@aria-label="Cancel"]';
    this.revertFormTitle = '//*[@aria-label="Context Submenu Form"]//h3[text()="Revert to saved"]';
    this.revertFormDescription = '//*[@aria-label="Context Submenu Form"]//label[text()="Discard local changes"]';
    // tslint:disable-next-line:max-line-length
    this.revertFormSubmitButton = '//*[@aria-label="Context Submenu Form"]//*[@aria-label="Submit"]';
    this.revertFormCloseButton = '//*[@aria-label="Context Submenu Form"]//*[@aria-label="Cancel"]';
    this.switcherIcon = '//*[@aria-label="switcher"]';
  }

  async checkFileSubMenuButtonsPreviewMode() {
    await this.page.click(this.fileFormButton);
    // eslint-disable-next-line jest/no-standalone-expect
    expect(await this.page.locator(this.historyButton).isVisible()).toBeTruthy();
    // eslint-disable-next-line jest/no-standalone-expect
    expect(await this.page.locator(this.pushButton).isVisible()).toBeTruthy();
    // eslint-disable-next-line jest/no-standalone-expect
    expect(await this.page.locator(this.pullButton).isVisible()).toBeTruthy();
    // eslint-disable-next-line jest/no-standalone-expect
    expect(await this.page.locator(this.revertButton).isVisible()).toBeFalsy();
    await this.page.click(this.fileFormCloseButton);
  }

  async checkHistoryForm() {
    // await this.page.click(this.historyButton);
    await Promise.all([
      this.page.waitForResponse(response => response.url()
          .includes('commits') && response.status() === 200),
      this.page.click(this.historyButton),
      this.page.waitForSelector('#global-tooltip-container > div > div > div > div > div.rc-tooltip-inner'),
    ]);
    // eslint-disable-next-line jest/no-standalone-expect
    expect(await this.page.locator(this.historyFormTitle).isVisible()).toBeTruthy();
    const historyItems = await this.page.$$(this.historyFormItems);
    // eslint-disable-next-line jest/no-standalone-expect
    expect(historyItems.length).toBeGreaterThan(3);
    // eslint-disable-next-line jest/no-standalone-expect
    expect(await this.page.locator(this.historyFormSubmitButton).isVisible()).toBeFalsy();
    await this.page.click(this.historyFormCloseButton);
  }

  async checkFileSubMenuButtonsEditMode() {
    await this.page.click(this.fileFormButton);
    // eslint-disable-next-line jest/no-standalone-expect
    expect(await this.page.locator(this.historyButton).isVisible()).toBeTruthy();
    // eslint-disable-next-line jest/no-standalone-expect
    expect(await this.page.locator(this.pushButton).isVisible()).toBeTruthy();
    // eslint-disable-next-line jest/no-standalone-expect
    expect(await this.page.locator(this.pullButton).isVisible()).toBeTruthy();
    // eslint-disable-next-line jest/no-standalone-expect
    expect(await this.page.locator(this.revertButton).isVisible()).toBeTruthy();
    await this.page.click(this.fileFormCloseButton);
  }

  async checkRevertForm() {
    await this.page.click(this.revertButton);
    // eslint-disable-next-line jest/no-standalone-expect
    expect(await this.page.locator(this.revertFormTitle).isVisible()).toBeTruthy();
    // eslint-disable-next-line jest/no-standalone-expect
    expect(await this.page.locator(this.revertFormDescription).isVisible()).toBeTruthy();
    // eslint-disable-next-line jest/no-standalone-expect
    expect(await this.page.locator(this.revertFormSubmitButton).isVisible()).toBeTruthy();
    await this.page.click(this.revertFormCloseButton);
  }
}
