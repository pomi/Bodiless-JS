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
import { flow } from 'lodash';
import { withPrependChild, ifToggledOn, useNode } from '@bodiless/core';
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
} from '@bodiless/fclasses';

import { useSubmenuContext } from './withMenuItemContext';
import { DEFAULT_NODE_KEYS } from './MenuTitles';

type NavAccessibilityProps = {
  'aria-label'?: string,
};

type SubmenuIndicatorComponents = {
  Button: ComponentType<any>,
  Title: ComponentType<any>,
};

type SubmenuIndicatorProps = DesignableComponentsProps<SubmenuIndicatorComponents>;

const asSubmenuIndicatorIcon = asToken(
  addClasses('material-icons'),
  addProps({ children: 'expand_more' }),
);

const SubmenuIndicatorBase: FC<SubmenuIndicatorProps> = ({ components, ...rest }) => {
  const { Button, Title } = components;
  const { isSubmenuOpen, setIsSubmenuOpen } = useSubmenuContext();

  return (
    <Button {...rest} onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}>
      <Title />
    </Button>
  );
};

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
const SubmenuIndicator = withDesign({
  Title: asSubmenuIndicatorIcon,
})(SubmenuIndicatorClean);

const MenuNav = addClasses('w-full')(Nav);

/**
 * HOC that wrappes the component in a navigation region implemented with
 * a nav element that has an aria-label that matches the label on the menubar.
 */
const withMenuNav = <P extends NavAccessibilityProps>(Component: ComponentType<P>) => {
  const WithMenuNav = (props: P) => {
    const { 'aria-label': ariaLabel = 'Main Site Navigation Menu' } = props;
    return (
      <MenuNav aria-label={ariaLabel}>
        <Component {...props} />
      </MenuNav>
    );
  };
  return WithMenuNav;
};

const useHasSubmenu = () => useSubmenuContext().hasSubmenu;

const withSubmenuIndicator = (nodeKeys = DEFAULT_NODE_KEYS) => {
  const { linkNodeKey } = nodeKeys;

  const useLinkNode = () => {
    const { node } = useNode();
    return node.child<LinkData>(linkNodeKey);
  };

  const useHasLink = () => Boolean(useLinkNode().data.href);

  return ifToggledOn(useHasLink)(
    withPrependChild(SubmenuIndicator, 'SubmenuIndicator'),
  );
};

const asAccessibleMenu = asToken(
  withDesign({
    Wrapper: flow(
      withMenuNav,
      addProps({ role: 'menubar', 'aria-label': 'Navigation Menu' }),
    ),
    Title: asToken(
      addProps({ role: 'menuitem', tabIndex: 0 }),
      ifToggledOn(useHasSubmenu)(
        addProps({ 'aria-haspopup': 'true' }),
      ),
    ),
    Item: addProps({ role: 'none' }),
  }),
);

const asAccessibleSubMenu = asToken(
  withSubmenuIndicator(),
  withDesign({
    OuterWrapper: addClasses('TEST'),
    Wrapper: addProps({ role: 'menu' }),
    Title: addProps({ role: 'menuitem', tabIndex: -1 }),
    Item: addProps({ role: 'none' }),
  }),
);

export { asAccessibleMenu, asAccessibleSubMenu };
