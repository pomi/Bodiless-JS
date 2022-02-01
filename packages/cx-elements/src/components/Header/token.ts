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

import { withNodeKey } from '@bodiless/core';
import {
  withPrimaryBgColor,
  withContainerLayout,
  t,
  as,
} from '@canvasx/elements';
import { withSearchDataLayer } from '@canvasx/gtm';
import { cxResponsiveMenu, cxBurgerMenuToggler } from '@canvasx/navigation';

import { asHeaderToken } from './HeaderClean';
import { cxLogo } from '../Logo/token';

/**
 * Token that defines a basic CanvasX header.
 */
const Base = asHeaderToken({
  Analytics: {
    Search: as(withSearchDataLayer),
  },
  Components: {
    SiteLogoReturn: cxLogo.Base,
    Menu: cxResponsiveMenu.Default,
    MenuToggler: cxBurgerMenuToggler.Default,
  },
  Theme: {
    Wrapper: withPrimaryBgColor,
  },
  Schema: {
    Menu: withNodeKey({ nodeKey: 'MainMenu', nodeCollection: 'site' }),
    UtilityMenu: withNodeKey({
      nodeKey: 'UtilityMenu',
      nodeCollection: 'site',
    }),
  },
  Layout: {
    // @todo move to spacing
    Wrapper: 'lg:pt-15px',
    Container: t(
      withContainerLayout,
      'flex items-center justify-between lg:items-start flex-wrap',
      // @todo move this to spacing
      'md:h-auto h-12',
    ),
    ButtonsWrapper: 'order-1',
    MenuContainer: 'lg:mt-9px absolute lg:static lg:w-full lg:order-1',
  },
});

/**
 * Token which makes a header sticky.
 */
const WithSticky = asHeaderToken({
  Theme: {
    Wrapper: 'shadow-sticky-header',
  },
  Layout: {
    Wrapper: 'sticky top-0 z-10',
  },
});

/**
 * Token which adds a responsive utility menu
 */
// const WithResponsiveUtilityMenu = asHeaderToken({
//   Components: {
//     UtilityMenu: t(
//       withTwResponsiveVariants('lg'),
//       withDesign({
//         _default: withOnlyProps() as HOC,
//         lg: t(startWith(ListClean), as(cxUtilityMenu.Default), 'hidden lg:block'),
//       }),
//     ),
//   },
// });

/**
 * Token which adds a responsive utility menu
 */
// const WithUtilityMenu = asHeaderToken({
//   Components: {
//     UtilityMenu: t(
//       startWith(ListClean),
//       as(cxUtilityMenu.Default),
//     ),
//   },
// });

const Default = asHeaderToken({
  ...Base,
  Compose: {
    WithSticky,
  },
});

export const cxHeader = {
  Base,
  WithSticky,
  Default,
  // WithUtilityMenu,
  // WithResponsiveUtilityMenu,
};
