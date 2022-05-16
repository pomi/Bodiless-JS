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
import { Page } from '@playwright/test';
import { BasePage } from './base-page';

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
  readonly swapComponentButton: string;
  readonly deleteComponentButton: string;
  readonly accordionCheckbox: string;
  readonly accordionInsideRestrictedContainer: string;
  readonly accordionInPicker: string;
  readonly accordionPlusButton: string;
  readonly accordionBody: string;
  readonly accordionMinusButton: string;
  readonly contentfulCheckbox: string;
  readonly addComponentButton: string;
  readonly editImageButton: string;
  readonly altText: string;
  readonly accordionBodyText: string;
  readonly landscapeLinkableImage: string;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.flowContainerDefault = '#flowContainer';
    this.flowContainerLibrary = '#flowContainerWithLibrary';
    this.flowContainer50And100 = '#constrained_widths';
    this.flowContainer100Only = '#constrained_full_width';
    this.flowContainer1Item = '#restricted';
    this.flowContainer25Width = '#width_25';
    this.flowContainer33Width = '#width_33';
    this.flowContainer50Width = '#width_50';
    this.flowContainer66Width = '#width_66';
    this.flowContainer75Width = '#width_75';
    this.flowContainerContentful = '#contentfulFlowContainer > div:nth-child(1)';
    this.flowContainerLimitedFlow = '#flowContainerLimited > div';
    this.flowContainerNestedFlow = '#regionContainer > div:nth-child(1)';
    this.addFlowContainerButton = 'button[aria-label="Add Flow Container"]';
    this.addComponentButton = 'button[aria-label="Add Component"]';
    this.imagesCheckbox = '#Image';
    this.accordionCheckbox = '#Accordion';
    this.swapComponentButton = 'button[aria-label="Swap Component"]';
    this.deleteComponentButton = 'button[aria-label="Delete Component"]';
    this.selectImageButton = 'button[aria-label="Select Image"]';
    this.editImageButton = 'button[aria-label="Edit Image"]';
    this.squareImageButton = '#gridlistboxinner > div:nth-child(1) > div > button';
    this.accordionInPicker = 'button[type="Submit"]';
    this.accordionPlusButton = 'span[aria-label="Expand Accordion"]';
    this.accordionMinusButton = 'span[aria-label="Collapse Accordion"]';
    this.contentfulCheckbox = '#Contentful';
    this.accordionBody = 'div[data-bl-design-key="Accordion:Body"] div div div';
    this.accordionInsideRestrictedContainer = 'div[id^="accordion-"]';
    this.squareImageButtonInsideContainer = '#flowContainer > div > img';
    this.altText = 'alt-test';
    this.accordionBodyText = 'accordion-body-text';
    this.landscapeLinkableImage = 'div[data-item-id="LandscapeLinkableImage"]';
  }
}
