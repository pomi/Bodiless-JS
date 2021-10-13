/* eslint-disable import/prefer-default-export */
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

import { ContentNode } from '@bodiless/core';
import { PageDisabledDataItems, PageDisabledData, PageDisabledDataItem } from './types';

/**
 * Get list of disabled pages.
 * @param node - the content node of the current component of its child/peer.
 * @returns key/value collection of disabled items or an empty object.
 */
export const useGetDisabledPages = (node: ContentNode<any>): PageDisabledDataItems => {
  const { disabledPages } = node.peer<PageDisabledData>(['Site', 'disabled-pages']).data;
  return disabledPages || {};
};

/**
 * Checks if any of page options is disabled (page, menu link, page link etc).
 * @param node - the content node of the current component of its child/peer.
 * @returns boolean.
 */
export const useIsAnyPageOptionDisabled = (node: ContentNode<any>): boolean => {
  const disabledPages = useGetDisabledPages(node);
  if (disabledPages[node.pagePath] === undefined) {
    return false;
  }
  const options: PageDisabledDataItem = disabledPages[node.pagePath];
  return Object.values(options).some(value => value === true);
};
