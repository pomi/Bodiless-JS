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
  useCallback, useEffect,
} from 'react';
// import { observer } from 'mobx-react-lite';
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
  asToken,
  // HOC, Token, withOnlyProps,
} from '@bodiless/fclasses';

import type {
  ContextMenuFormProps,
} from '@bodiless/core';
import { ComponentFormDescription } from '@bodiless/ui';
import { useFormApi, useFormState } from 'informed';

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

type FormValues = {
  Page: boolean,
  'Menu Links': boolean,
  'Non-menu Links': boolean,
  Indexing: boolean,
};

const defaultFormValues: FormValues = {
  Page: false,
  'Menu Links': false,
  'Non-menu Links': false,
  Indexing: false,
};

const FormBodyBase = () => {
  const { node } = useNode<Data>();
  const { pagePath, data } = node;
  const { disabledPages = {} } = data;
  const pageData = {
    ...defaultFormValues,
    ...disabledPages[pagePath],
  };
  const {
    ComponentFormTitle,
    ComponentFormFieldWrapper,
    ComponentFormLabel,
    ComponentFormCheckBox,
    ComponentFormSubmitButton,
  } = useMenuOptionUI();
  const {
    setValue, setValues, setStep,
  } = useFormApi();
  const { values: formValues, step } = useFormState();

  const toggleSubCheckboxes = () => {
    const { Page } = formValues;
    setValues({
      ...formValues,
      'Menu Links': Page,
      'Non-menu Links': Page,
      Indexing: Page,
    });
  };

  const toggleOffPageCheckbox = () => {
    setValue('Page', false);
  };

  const StepOneContent = useCallback(() => {
    useEffect(() => {
      // Get initial values from node.
      setValues(pageData);
    }, []);

    return (
      <>
        <ComponentFormDescription>
          Features to disable:
        </ComponentFormDescription>
        <ComponentFormFieldWrapper>
          <ComponentFormLabel>
            <ComponentFormCheckBox
              field="Page"
              keepState
              onChange={toggleSubCheckboxes}
            />
            Page
          </ComponentFormLabel>
          <ComponentFormFieldWrapper className="pl-5">
            <ComponentFormLabel>
              <ComponentFormCheckBox keepState field="Menu Links" onChange={toggleOffPageCheckbox} />
              Menu links
            </ComponentFormLabel>
            <ComponentFormLabel>
              <ComponentFormCheckBox keepState field="Non-menu Links" onChange={toggleOffPageCheckbox} />
              Non-menu links
            </ComponentFormLabel>
            <ComponentFormLabel>
              <ComponentFormCheckBox keepState field="Indexing" onChange={toggleOffPageCheckbox} />
              Indexing
            </ComponentFormLabel>
          </ComponentFormFieldWrapper>
        </ComponentFormFieldWrapper>
        <ComponentFormSubmitButton
          aria-label="Submit"
          onClick={(e: any) => {
            e.preventDefault();
            setStep(1);
          }}
        />
      </>
    );
  }, [formValues]);

  const StepTwoContent = () => {
    useEffect(() => {
      // Save form values in node.
      node.setData({
        ...data,
        disabledPages: {
          ...disabledPages,
          [pagePath]: {
            ...disabledPages[pagePath],
            ...formValues,
          },
        },
      });
    }, []);

    return (
      <>
        {Object.entries(formValues).map(
          ([key, value]) => <h1 key={key}>{`${key}: ${value ? 'Enabled' : 'Disabled'}`}</h1>,
        )}
      </>
    );
  };

  return (
    <>
      <ComponentFormTitle>
        Disable Status
      </ComponentFormTitle>
      {step < 1 && <StepOneContent />}
      {step > 0 && <StepTwoContent />}
    </>
  );
};

const FormBody: any = asToken(
  withNode,
  withNodeKey({
    nodeKey: 'disabled-pages',
    nodeCollection: 'site',
  }),
)(FormBodyBase);

const Form = (props: ContextMenuFormProps) => (
  <ContextMenuForm {...props} hasSubmit={false}>
    <FormBody />
  </ContextMenuForm>
);

const useMenuOptions = (): TMenuOption[] => {
  const context = useEditContext();
  const render = (props: ContextMenuFormProps) => <Form {...props} />;
  const menuOptions$: TMenuOption[] = [
    {
      name: 'page-disable',
      icon: 'visibility_off',
      label: 'Disable',
      // group: 'page-group',
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

// const withNodeObserver: Token = Component => observer(props => {
//   const isPageDisabled = useIsPageDisabled();
//   // Update component's prop on data change to force re-rendering.
//   return <Component {...props} page-disabled={isPageDisabled.toString()} />;
// });

// Remove temporary props before rendering.
// Fix "Invalid prop `...` supplied to `React.Fragment`.
// React.Fragment can only have `key` and `children` props.
// const withPropsCleanUp = withOnlyProps('key', 'children') as HOC;

// const withPageDisableButton = asToken(
//   withPropsCleanUp,
//   withMenuOptions(menuOptions),
//   withNodeObserver,
//   withNode,
//   withNodeKey({
//     nodeKey: 'disabled-pages',
//     nodeCollection: 'site',
//   }),
// );

const withPageDisableButton = withMenuOptions(menuOptions);

export default withPageDisableButton;
