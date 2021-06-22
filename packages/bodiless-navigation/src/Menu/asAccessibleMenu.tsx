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

import React, { ComponentType, FC } from 'react';
import { withParent, withPrependChild, useNode } from '@bodiless/core';
import type { LinkData } from '@bodiless/components';
import {
  addProps,
  addClasses,
  withDesign,
  asToken,
  Nav,
  Span,
  Button as ButtonClean,
  DesignableComponentsProps,
  designable,
  flowIf,
  not,
} from '@bodiless/fclasses';

import { useSubmenuContext } from './withMenuItemContext';
import { DEFAULT_NODE_KEYS } from './MenuTitles';

const useHasSubmenu = () => useSubmenuContext().hasSubmenu;
const useHasLink = () => {
  const { linkNodeKey } = DEFAULT_NODE_KEYS;
  const { node } = useNode();
  const linkHref = node.child<LinkData>(linkNodeKey);

  return Boolean(linkHref.data.href);
};

const withSubmenuToggle = (Component: ComponentType<any> | string) => (props: any) => {
  const { isSubmenuOpen, setIsSubmenuOpen } = useSubmenuContext();
  return <Component {...props} onClick={() => setIsSubmenuOpen(!isSubmenuOpen)} />;
};

type SubmenuIndicatorComponents = {
  Button: ComponentType<any>,
  Title: ComponentType<any>,
};

type SubmenuIndicatorProps = DesignableComponentsProps<SubmenuIndicatorComponents>;

const SubmenuIndicatorBase: FC<SubmenuIndicatorProps> = ({ components: C, ...rest }) => (
  <C.Button {...rest}>
    <C.Title />
  </C.Button>
);

const SubmenuIndicatorComponents: SubmenuIndicatorComponents = {
  Button: ButtonClean,
  Title: Span,
};

/**
 * Clean component that renders Submenu Indicator.
 *
 * @see SubmenuIndicatorComponents for a list of design components.
 */
const SubmenuIndicatorClean = designable(SubmenuIndicatorComponents, 'SubmenuIndicator')(SubmenuIndicatorBase);
const SubmenuIndicator = asToken(
  withSubmenuToggle,
  withDesign({
    Title: asToken(
      addClasses('material-icons'),
      addProps({ children: 'expand_more' }),
    ),
  }),
)(SubmenuIndicatorClean);

const withSubmenuIndicator = flowIf(useHasLink)(
  withPrependChild(SubmenuIndicator, 'SubmenuIndicator'),
);

/**
 * HOC that wrappes the component in a navigation region implemented with
 * a nav element that has an aria-label that matches the label on the menubar.
 */
const withMenuNav = asToken(
  withParent(Nav, 'Nav'),
  withDesign({
    Nav: asToken(
      addClasses('w-full'),
      addProps({ 'aria-label': 'Main Site Navigation Menu' }),
    ),
  }),
);

const asAccessibleMenu = asToken(
  withDesign({
    Wrapper: asToken(
      withMenuNav,
      addProps({ role: 'menubar', 'aria-label': 'Navigation Menu' }),
    ),
    Title: asToken(
      addProps({ role: 'menuitem', tabIndex: 0 }),
      flowIf(useHasSubmenu)(
        addProps({ 'aria-haspopup': 'true' }),
        flowIf(not(useHasLink))(withSubmenuToggle),
      ),
    ),
    Item: addProps({ role: 'none' }),
  }),
);

const asAccessibleSubMenu = asToken(
  withSubmenuIndicator,
  withDesign({
    Wrapper: addProps({ role: 'menu' }),
    Title: addProps({ role: 'menuitem' }),
    Item: addProps({ role: 'none' }),
  }),
);

export { asAccessibleMenu, asAccessibleSubMenu };
