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

import React from 'react';
import {
  withEditButton,
  withNodeDataHandlers,
  EditButtonOptions,
  withSidecarNodes,
  withNode,
  withNodeKey,
  ifEditable,
  ifReadOnly,
  withLocalContextMenu,
  withContextActivator,
} from '@bodiless/core';
import { withoutProps, } from '@bodiless/fclasses';
import { useFilterByGroupContext } from './FilterByGroupContext';
import type { TagsNodeType } from '../TagButton/types';

// @todo: option type
const renderForm = (componentProps: any) => {
  return (<></>);
};
const filterSelectionMenuOptions: EditButtonOptions<any, TagsNodeType> = {
  name: 'filter-page',
  label: 'Page',
  groupLabel: 'Filter',
  groupMerge: 'none',
  icon: 'filter_alt',
  local: true,
  global: false,
  formTitle: 'Filter Page',
  formDescription: true ? `Clicking the check will save the current Local 
  Filter UI selections to this Page, creating a Save State.` : `Page now filtered by Saved 
  State on page load.`,
  isHidden: false,
  renderForm,
  submitValueHandler: (values: any) => {
    // @todo: 
    const submitValues = {
      tags: [],
    };
    return submitValues;
  },
};

/**
 * @todo: add comments
 */
/**
 * HOC add default filter form and data to filter list.
 * 
 * @todo: type HOC component.
 * 
 * @param Component 
 * @returns 
 */
const withFilterSelection = (Component: any) => {
  // @todo: do i need this default data?
  const defaultData: TagsNodeType = {
    tags: [],
  };
  const WithFilterSelectionMenuOptions = (props: any) => {
    // get tags
    const { getSelectedTags } = useFilterByGroupContext();
    return (
      <Component {...props} getSelectedTags={getSelectedTags} />
    );
  };
  return withSidecarNodes(
    withNode,
    withNodeKey('default-filters'),
    withNodeDataHandlers(defaultData),
    ifEditable(
      withEditButton(filterSelectionMenuOptions),
      withContextActivator('onClick'),
      withLocalContextMenu,
    ),
    ifReadOnly(
      withoutProps('setComponentData'),
    ),
  )(WithFilterSelectionMenuOptions);
};

// const withFilterSelection: HOC<{}, ListProps> = (Component: any) => {
//   const WithFilterSelection: FC<any> = (props: ListProps) => {

//     console.log(props, 'WithFilterSelection Props');
//     return (
//       <Component {...props} />
//     );
//   };
//   return withSidecarNodes(
//     withNodeDataHandlers(defaultData),
//     withNode,
//     withNodeKey('default-filters'),
//     ifEditable(
//       withFilterSelectionMenuOptions,
//     ),
//     ifReadOnly(
//       withoutProps('setComponentData'),
//     ),
//   )(WithFilterSelection);
// };

// asToken(
//   withFilterSelectionMenuOptions,
//   withSelectedTags,
// );



export default withFilterSelection;
