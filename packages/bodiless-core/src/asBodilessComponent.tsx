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
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import identity from 'lodash/identity';
import flowRight from 'lodash/flowRight';
import type {
  Enhancer, HOC, ComponentOrTag, HOCWithMeta
} from '@bodiless/fclasses';
import { withoutProps } from '@bodiless/fclasses';
import withNode, { withNodeKey } from './withNode';
import {
  withNodeDataHandlers, withContextActivator, withLocalContextMenu,
} from './hoc';
import { ifReadOnly, ifEditable } from './withEditToggle';
import withEditButton from './withEditButton';
import withData from './withData';
import type { WithNodeProps, WithNodeKeyProps } from './Types/NodeTypes';
import type { EditButtonOptions, EditButtonProps, UseBodilessOverrides } from './Types/EditButtonTypes';
import { useContextActivator } from './hooks';
import { ifToggledOn } from './withFlowToggle';

/**
 * Options for making a component "bodiless".
 */
export type Options<P, D> = EditButtonOptions<P, D> & {
  /**
   * The event used to activate the edit button.  Default is 'onClick'
   */
  activateEvent?: string,
  /**
   * An optional component to use as a wrapper in edit mode. Useful if the underlying component
   * cannot produce an activation event (eg if it does not accept an 'onClick' prop).
   */
  Wrapper?: ComponentOrTag<any>,
  /**
   * An object providing default/initial values for the editable props. Should be keyed by the
   * prop name.
   */
  defaultData?: D,
};

type AsBodiless<P, D, E = {}> = (
  nodeKeys?: WithNodeKeyProps,
  defaultData?: D,
  useOverrides?: UseBodilessOverrides<P, D, E>,
) => HOCWithMeta<{}, Partial<WithNodeProps>>;

/**
 * Given an event name and a wrapper component, provides an HOC which will wrap the base component
 * the wrapper, passing the event prop to the wrapper, and all other props to the base component.
 *
 * @param event The event name.
 * @param Wrapper The component to wrap with
 * @private
 */
export const withActivatorWrapper = (event: string, Wrapper: ComponentOrTag<any>): HOC => (
  Component => props => {
    const wrapperPropNames = Object.getOwnPropertyNames(useContextActivator(event));
    const eventProps = pick(props, wrapperPropNames);
    const rest = omit(props, wrapperPropNames);
    return (
      <Wrapper {...eventProps}>
        <Component {...rest as any} />
      </Wrapper>
    );
  }
);

/**
 * Convenience HOC to plug a component into the bodiless data model.
 *
 * @param nodeKeys The nodekeys which will be used to locate the component's data.
 *
 * @param defaultData Default data to be provided for this component.
 */
const withBodilessData = <D extends object>(
  nodeKey?: WithNodeKeyProps,
  defaultData?: D,
) => flowRight(
    withNodeKey(nodeKey),
    withNode,
    withNodeDataHandlers(defaultData),
  ) as Enhancer<Partial<WithNodeProps>>;

/**
 * Makes a component "Bodiless" by connecting it to the Bodiless-jS data flow and giving it
 * a form which can be used to edit its props. Returns a standard `asBodiless...` function,
 * which takes `nodeKey` and `defaultData` parameters, and returns an HOC which yields an editable
 * version of the base component.
 *
 * @param options An object describing how this component should be made editable.
 */
// eslint-disable-next-line max-len
const asBodilessComponent = <P extends object, D extends object>(options: Options<P, D>): AsBodiless<P, D> => (
  /**
   * Creates an HOC that will make a component "Bodilesss".
   *
   * @param nodeKey The nodeKey identifying where the components data will be stored.
   * @param defaultData An object representing the initial/default data. Supercedes any default
   * data provided as an option.
   * @param useOverrides A hook which returns overrides for edit button options. Will
   * be invoked in the render context of the wrapped component and passed the
   * component's props.
   *
   * @return An HOC which will make the wrapped component "bodiless".
   */
  (
    nodeKeys?,
    defaultData = {} as D,
    useOverrides?: UseBodilessOverrides<P, D>,
  ) => {
    const {
      activateEvent = 'onClick',
      Wrapper,
      defaultData: defaultDataOption = {},
      ...rest
    } = options;
    const editButtonOptions = useOverrides
      ? (props: P & EditButtonProps<D>) => ({ ...rest, ...useOverrides(props) })
      : rest;
    const useHasLocalContext = (props: P & EditButtonProps<D>): boolean => {
      const def = typeof editButtonOptions === 'function'
        ? editButtonOptions(props) : editButtonOptions;
      return !(def.root || def.peer);
    };
    const finalData = { ...defaultDataOption, ...defaultData };
    return flowRight(
      withBodilessData(nodeKeys, finalData),
      ifReadOnly(
        withoutProps(['setComponentData']),
      ),
      ifEditable(
        withEditButton(editButtonOptions),
        ifToggledOn(useHasLocalContext)(
          withContextActivator(activateEvent),
          withLocalContextMenu,
          Wrapper ? withActivatorWrapper(activateEvent, Wrapper) : identity,
        ),
      ),
      withData,
    );
  }
);

export default asBodilessComponent;
export { withBodilessData };
export type { AsBodiless };
