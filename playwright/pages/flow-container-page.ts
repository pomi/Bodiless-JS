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
// flow-container-page.ts
import { BasePage } from './base-page';
import { Page } from '@playwright/test';

export class FlowContainerPage extends BasePage {
  readonly page: Page;
  readonly flowContainerDefault:string;
  readonly flowContainerLibrary:string;
  readonly flowContainer50And100:string;
  readonly flowContainer100Only:string;
  readonly flowContainer1Item:string;
  readonly flowContainer25Width:string;
  readonly flowContainer33Width:string;
  readonly flowContainer50Width:string;
  readonly flowContainer66Width:string;
  readonly flowContainer75Width:string;
  readonly flowContainerContentful:string;
  readonly flowContainerLimitedFlow:string;
  readonly flowContainerNestedFlow:string;
  readonly addFlowContainerButton:string;
  readonly imagesCheckbox:string;
  readonly squareImageButton:string;
  readonly squareImageButtonInsideContainer: string;
  readonly selectImageButton: string;
  readonly component: {
    richText: string,
    table: string,
    image: string,
    card: string,
    contentful: string,
    accordion: string,
    list: string,
    iframe: string,
    socialShare: string,
    youTube: string,
    carousel: string,
    curator: string,
    flowContainer: string,
  };
  readonly orientation: {
    NA: string,
    horizontal: string,
    vertical: string,
  };
  readonly searchField: string;
  readonly componentCategories: string;
  readonly typeSection: string;
  readonly orientationSection: string;
  readonly gridBox: string;
  readonly simpleRichText: string;
  readonly basicRichText: string;
  readonly fullRichText: string;
  readonly landscapeLinkableImage: string;
  readonly squareLinkableImage: string;
  readonly landscapeImage: string;
  readonly squareImage: string;
  readonly closeFormButton: string;
  readonly addComponentForm: string;
  readonly structure: {
    withTitleAndBody: string,
    withCTA: string,
    noCTA: string,
    noTitle: string,
    noBody: string,
    noTitleAndBody: string,
  };
  readonly clearLink: string;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.flowContainerDefault = '#gatsby-focus-wrapper > div:nth-child(1) > div.my-2.container.mx-auto > div:nth-child(4) > section > div';
    this.flowContainerLibrary = '#gatsby-focus-wrapper > div:nth-child(1) > div.my-2.container.mx-auto > div:nth-child(8) > section > div';
    this.flowContainer50And100 = '#gatsby-focus-wrapper > div:nth-child(1) > div.my-2.container.mx-auto > div:nth-child(12) > section > div';
    this.flowContainer100Only = '#gatsby-focus-wrapper > div:nth-child(1) > div.my-2.container.mx-auto > div:nth-child(14) > section > div';
    this.flowContainer1Item = '#gatsby-focus-wrapper > div:nth-child(1) > div.my-2.container.mx-auto > div:nth-child(18) > section > div';
    this.flowContainer25Width = '#gatsby-focus-wrapper > div:nth-child(1) > div.my-2.container.mx-auto > div:nth-child(22) > section > div';
    this.flowContainer33Width = '#gatsby-focus-wrapper > div:nth-child(1) > div.my-2.container.mx-auto > div:nth-child(24) > section > div';
    this.flowContainer50Width = '#gatsby-focus-wrapper > div:nth-child(1) > div.my-2.container.mx-auto > div:nth-child(26) > section > div';
    this.flowContainer66Width = '#gatsby-focus-wrapper > div:nth-child(1) > div.my-2.container.mx-auto > div:nth-child(28) > section > div';
    this.flowContainer75Width = '#gatsby-focus-wrapper > div:nth-child(1) > div.my-2.container.mx-auto > div:nth-child(30) > section > div';
    this.flowContainerContentful = '#gatsby-focus-wrapper > div:nth-child(1) > div.my-2.container.mx-auto > div:nth-child(32) > section > div.bl-resizable.bl-relative.bl-border-transparent.bl-border-2.bl-border-dashed.hover\\:bl-border-primary.w-full.md\\:p-5.bl-relative';
    this.flowContainerLimitedFlow = '#gatsby-focus-wrapper > div:nth-child(1) > div.my-2.container.mx-auto > div:nth-child(34) > section > div';
    this.flowContainerNestedFlow = '#gatsby-focus-wrapper > div:nth-child(1) > div.my-2.container.mx-auto > div:nth-child(36) > section > div.bl-resizable.bl-relative.bl-border-transparent.bl-border-2.bl-border-dashed.hover\\:bl-border-primary.w-full.lg\\:w-full.bl-relative > div > section > div.bl-resizable.bl-relative.bl-border-transparent.bl-border-2.bl-border-dashed.hover\\:bl-border-primary.w-full.lg\\:w-full.bl-relative > img';
    this.addFlowContainerButton = 'button[aria-label="Add Flow Container"]';
    this.selectImageButton = 'button[aria-label="Select Image"]';
    this.imagesCheckbox = '#Image';
    this.squareImageButton = '#gridlistboxinner > div:nth-child(1) > div > button';
    this.squareImageButtonInsideContainer = '#gatsby-focus-wrapper > div:nth-child(1) > div.my-2.container.mx-auto > div:nth-child(4) > section > div > img';
    this.component = {
      richText: '#Rich\\ Text',
      table: '#Table',
      image: '#Image',
      card: '#Card',
      contentful: '#Contentful',
      accordion: '#Accordion',
      list: '#List',
      iframe: '#Iframe',
      socialShare: '#SocialShare',
      youTube: '#YouTube',
      carousel: '#Carousel',
      curator: '#Curator',
      flowContainer: '#Flow\\ Container',
    };
    this.orientation = {
      NA: '#N\\/A',
      horizontal: '#Horizontal',
      vertical: '#Vertical',
    };
    this.searchField = '#Search';
    this.componentCategories = 'a > label';
    this.typeSection = ':text("Type")';
    this.orientationSection = ':text("Orientation")';
    this.gridBox = '#gridlistboxinner';
    this.simpleRichText = 'div[data-item-id="EditorSimple"]';
    this.basicRichText = 'div[data-item-id="EditorBasic"]';
    this.fullRichText = 'div[data-item-id="EditorFullFeatured"]';
    this.landscapeLinkableImage = 'div[data-item-id="LandscapeLinkableImage"]';
    this.squareLinkableImage = 'div[data-item-id="SquareLinkableImage"]';
    this.landscapeImage = 'div[data-item-id="landscapeImage"]';
    this.squareImage = 'div[data-item-id="squareImage"]';
    this.addComponentForm = 'form[aria-label="Context Menu Add Flow Container Form"]';
    this.closeFormButton = 'button[aria-label="Cancel"]';
    this.structure = {
      withTitleAndBody: '#With\\ Title\\ and\\ Body',
      withCTA: '#With\\ CTA',
      noCTA: '#No\\ CTA',
      noTitle: '#No\\ Title',
      noBody: '#No\\ Body',
      noTitleAndBody: '#No\\ Title\\ and\\ Body',
    };
    this.clearLink = 'body > div:nth-child(34) > div > div > div > div.rc-tooltip-inner > div > form > div > div > div.bl-pt-grid-2.w-1\\/4.overflow-y-auto > a';
  }
}
