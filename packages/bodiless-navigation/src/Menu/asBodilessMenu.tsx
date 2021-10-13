/**
 * Copyright © 2020 Johnson & Johnson
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
import React from 'react';
import {
  WithNodeKeyProps, withNode, useNode, useEditContext,
} from '@bodiless/core';
import {
  asBodilessList, asStylableList, asChameleonSubList, useGetDisabledPages,
  useGetLinkHref,
} from '@bodiless/components';
import {
  withDesign, asToken, Token, Fragment,
} from '@bodiless/fclasses';

import type { UseListOverrides, ListData, PageDisabledDataItems } from '@bodiless/components';

import { withMenuEditContext } from './withMenuContext';
import { asMenuTitle, DEFAULT_NODE_KEYS } from './MenuTitles';
import { asBreadcrumbSource, asBreadcrumb } from '../Breadcrumbs';

const withChameleonSublist = withDesign({
  Item: asChameleonSubList(() => ({ formTitle: 'Sub-Menu Type' })),
});

/**
 * Don't render the menu item and it's sub-items if the target page
 * is disabled by a user.
 */
const asDisabledPageMenuItem: Token = Component => props => {
  const { isEdit } = useEditContext();
  const { node } = useNode();
  const disabledPages: PageDisabledDataItems = useGetDisabledPages(node);
  const href = useGetLinkHref(node);
  if (!isEdit && href && disabledPages[href]?.menuLinksDisabled) {
    return <Fragment />;
  }
  return <Component {...props} />;
};

/**
 * Bodiless HOC generator which creates the basic structure of the Bodiless Menu.
 *
 * This serves as a base for various views on the Menu data, including
 * a site's main menu, a burger menu and breadcrumbs.
 *
 * @param nodeKeys Location where the menu state data should be stored.
 * @param defaultData Default menu data.
 * @param useOverrides Hook returning overrides for the menu button.

 * @return HOC which creates a basic mega menu list.
 */
const asBodilessMenu = <P extends object>(
  nodeKeys?: WithNodeKeyProps,
  defaultData?: ListData,
  useOverrides: UseListOverrides<P> = () => ({}),
) => asToken(
    asBodilessList(
      nodeKeys,
      defaultData,
      (props: P) => ({ groupLabel: 'Main Menu Item', ...useOverrides(props) }),
    ),
    withChameleonSublist,
    asStylableList,
    withMenuEditContext,
    withDesign({ Title: asMenuTitle }),
    withDesign({
      Item: asToken(
        asDisabledPageMenuItem,
        asBreadcrumb(DEFAULT_NODE_KEYS),
      ),
    }),
    asBreadcrumbSource,
    withNode,
  );

export default asBodilessMenu;
