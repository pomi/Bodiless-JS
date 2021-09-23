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

import React, {
  useCallback,
} from 'react';
import { observer } from 'mobx-react-lite';
import {
  withNode,
  useNode,
  useEditContext,
  withMenuOptions,
  TMenuOption,
  MenuOptionsDefinition,
  useMenuOptionUI,
  ContextMenuForm,
  withNodeKey,
} from '@bodiless/core';
import {
  asToken, HOC, Token, withOnlyProps,
} from '@bodiless/fclasses';

import type {
  ContextMenuFormProps,
} from '@bodiless/core';
import { ComponentFormDescription } from '@bodiless/ui';
import { useFormApi } from 'informed';

type DataItem = {
  pageDisabled: boolean,
  menuLinksDisabled?: boolean,
  contentLinksDisabled?: boolean,
  indexingDisabled?: boolean,
};

type Data = {
  disabledPages?: {
    [path: string]: DataItem,
  },
};

const useIsPageDisabled = (path?: string) => {
  const { node } = useNode<Data>();
  const { pagePath, data } = node;
  const { disabledPages = {} } = data;
  const path$ = path || pagePath;
  const isPageDisabled = disabledPages[path$]?.pageDisabled === true;
  return isPageDisabled;
};

// const PageCheckbox = () => {
//   const {
//     ComponentFormLabel,
//     ComponentFormCheckBox,
//   } = useMenuOptionUI();
//   const { getState, setValues } = useFormApi();
//   return (
//     <ComponentFormLabel>
//       <ComponentFormCheckBox
//         field="page"
//         onChange={
//           () => {
//             const { values } = getState();
//             const { page } = values;
//             setValues({
//               ...values,
//               'menu-links': page,
//               'non-menu-links': page,
//               indexing: page,
//             });
//           }
//         }
//       />
//       Page
//     </ComponentFormLabel>
//   );
// };

const Fields = () => {
  const {
    ComponentFormTitle,
    ComponentFormFieldWrapper,
    ComponentFormLabel,
    ComponentFormCheckBox,
  } = useMenuOptionUI();
  const { getState, setValues } = useFormApi();
  return (
    <>
      <ComponentFormTitle>
        Disable Status
      </ComponentFormTitle>
      <ComponentFormDescription>
        Features to disable:
      </ComponentFormDescription>
      <ComponentFormFieldWrapper>
        <ComponentFormLabel>
          <ComponentFormCheckBox
            field="page"
            onChange={
            () => {
              const { values } = getState();
              const { page } = values;
              setValues({
                ...values,
                'menu-links': page,
                'non-menu-links': page,
                indexing: page,
              });
            }
          }
          />
          Page
        </ComponentFormLabel>
        <ComponentFormFieldWrapper className="pl-5">
          <ComponentFormLabel>
            <ComponentFormCheckBox field="menu-links" />
            Menu links
          </ComponentFormLabel>
          <ComponentFormLabel>
            <ComponentFormCheckBox field="non-menu-links" />
            Non-menu links
          </ComponentFormLabel>
          <ComponentFormLabel>
            <ComponentFormCheckBox field="indexing" />
            Indexing
          </ComponentFormLabel>
        </ComponentFormFieldWrapper>
      </ComponentFormFieldWrapper>
    </>
  );
};

const Form = (props: ContextMenuFormProps) => (
  <ContextMenuForm {...props}>
    <Fields />
  </ContextMenuForm>
);

const useMenuOptions = (): TMenuOption[] => {
  // const { node } = useNode<Data>();
  // const { pagePath, data } = node;
  // const { disabledPages = {} } = data;
  const context = useEditContext();
  // const isPageDisabled = useIsPageDisabled();

  // const togglePageVisibility = (): void => {
  //   if (isPageDisabled) {
  //     // Enable
  //     node.setData({
  //       ...data,
  //       disabledPages: {
  //         ...disabledPages,
  //         [pagePath]: {
  //           ...disabledPages[pagePath],
  //           pageDisabled: false,
  //         },
  //       },
  //     });
  //   } else {
  //     // Disable
  //     node.setData({
  //       ...data,
  //       disabledPages: {
  //         ...disabledPages,
  //         [pagePath]: {
  //           ...disabledPages[pagePath],
  //           pageDisabled: true,
  //         },
  //       },
  //     });
  //   }
  // };

  const render = (props: ContextMenuFormProps) => <Form {...props} />;
  const menuOptions$: TMenuOption[] = [
    {
      name: 'page-disable',
      icon: 'visibility_off',
      label: 'Disable',
      group: 'page-group',
      isHidden: useCallback(() => !context.isEdit, []),
      handler: () => render,
    },
  ];
  return menuOptions$;
};

const menuOptions: MenuOptionsDefinition<object> = {
  useMenuOptions,
  name: 'PageDisable',
  root: true,
};

const withNodeObserver: Token = Component => observer(props => {
  const isPageDisabled = useIsPageDisabled();
  // Update component's prop on data change to force re-rendering.
  return <Component {...props} page-disabled={isPageDisabled.toString()} />;
});

// Remove temporary props before rendering.
// Fix "Invalid prop `...` supplied to `React.Fragment`.
// React.Fragment can only have `key` and `children` props.
const withPropsCleanUp = withOnlyProps('key', 'children') as HOC;

const withPageDisableButton = asToken(
  withPropsCleanUp,
  withMenuOptions(menuOptions),
  withNodeObserver,
  withNode,
  withNodeKey({
    nodeKey: 'disabled-pages',
    nodeCollection: 'site',
  }),
);

export default withPageDisableButton;
export {
  useIsPageDisabled,
};
