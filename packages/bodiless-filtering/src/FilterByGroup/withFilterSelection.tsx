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
  withLocalContextMenu,
  withContextActivator,
  useNode,
} from '@bodiless/core';
import {
  asToken,
  withoutProps,
} from '@bodiless/fclasses';
import { useFilterByGroupContext } from './FilterByGroupContext';
import { Tag } from './FilterByGroupStore';
import type { NodeTagType, FilterTagType } from './types';

const renderForm = () => (<></>);
const useFilterSelectionMenuOptions = () => {
  const { getSelectedTags } = useFilterByGroupContext();
  console.log(getSelectedTags(), 'getSelectedTags');
  const tags = getSelectedTags();
  const filterSelectionMenuOptions: EditButtonOptions<any, NodeTagType> = {
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
      const submitValues = { tags };
      return submitValues;
    },
  };
  return filterSelectionMenuOptions;
};

const withFilterDefaultSelection = (Component: any) => {
  const WithFilterDefaultSelection = (props: any) => {
    const { node } = useNode();
    const { selectTag } = useFilterByGroupContext();
    const { tags } = node.peer(['Page', 'default-filters']).data as {tags: FilterTagType[]};
    if (tags) {
      tags.forEach((tag) => {
        console.log(tag, selectTag, 'Tag');
        // selectTag(new Tag(tag.id, tag.name, tag.categoryId.toString(), tag.categoryName));
      });
    }
    return (
      <Component {...props} />
    );
  };
  return WithFilterDefaultSelection;
};

/**
 * @todo: add comments
 */
/**
 * HOC adds default filter form and data to filter list.
 * 
 * @todo: type HOC component.
 * 
 * @param Component 
 * @returns 
 */
const withFilterSelection = (
  nodeKey = 'default-filters',
  defaultData = { tags: [] },
) => asToken(
  withoutProps(['componentData']),
  withSidecarNodes(
    withNodeKey(nodeKey),
    withNode,
    withNodeDataHandlers(defaultData),
    withFilterDefaultSelection,
    ifEditable(
      withEditButton(() => useFilterSelectionMenuOptions()),
      withContextActivator('onClick'),
      withLocalContextMenu,
    ),
  ),
  // withoutProps(['componentData']),
);

export default withFilterSelection;
