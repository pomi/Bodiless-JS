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
// cards-page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CardsPage extends BasePage {
  readonly page:Page;
  readonly pathToImages: string;
  readonly imageOneName: string;
  readonly imageTwoName: string;
  readonly linkCTA: string;
  readonly CTAUrl: string;
  readonly submitCTAUrlButton: string;
  readonly editButton: string;
  readonly titleText: string;
  readonly bodyText: string;
  readonly ctaText: string;
  readonly imageAltText: string;
  readonly postfix: string;
  readonly ctaLinkValue: string;
  readonly card: {
    id:string,
    image:string,
    title:string,
    body:string,
    link:string,
    submitButton:string,
    imageAltText:string,
    selectImageButton:string,
    linkClickable:string,
  };

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.card = {
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
    this.pathToImages = './cypress/fixtures/images/';
    this.imageOneName = 'img_615x500.jpg';
    this.imageTwoName = 'img_615x502.jpg';
    this.linkCTA = 'button[aria-label="Edit CTA"]';
    this.CTAUrl = 'input[aria-describedby="description"]';
    this.submitCTAUrlButton = 'button[aria-label="Submit"]';
    this.editButton = 'button[aria-label="Edit"]';
    this.titleText = 'AT - Title 1 -';
    this.bodyText = 'AT - Description 1 -';
    this.ctaText = 'AT - CTA Link 1 -';
    this.imageAltText = 'AT-1stCardAltText';
    this.postfix = 'edited';
    this.ctaLinkValue = 'AT-cardUrl1';
  }
}
