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

import {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { TagType } from '@bodiless/core';
import { FilterTagType } from './types';

const TAG_ANY_KEY = 'any';

class Tag implements FilterTagType {
  id: string;

  categoryId: string;

  name: string;

  categoryName: string;

  constructor(id: string, name: string, categoryId?: string, categoryName?: string) {
    this.id = id;
    this.name = name;
    this.categoryId = categoryId || '';
    this.categoryName = categoryName || '';
  }

  isEqual(tag: TagType) {
    return tag.id === this.id && (tag as FilterTagType).categoryName === this.categoryName;
  }
}

type FilterByGroupStoreSettings = {
  multipleAllowedTags?: boolean,
};

const useStateCallback = (initialState: any) => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef<Function | null>(null); // init mutable ref container for callbacks

  const setStateCallback = useCallback((newState, cb) => {
    cbRef.current = cb; // store current, passed callback in ref
    setState(newState);
  }, []); // keep object reference stable, exactly like `useState`

  useEffect(() => {
    // cb.current is `null` on initial render,
    // so we only invoke callback on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
};

const useFilterByGroupStore = (settings: FilterByGroupStoreSettings) => {
  const [selectedTags, setSelectedTags] = useStateCallback([]);
  const [filtersInitialized, setFiltersInitialized] = useState<boolean>(false);

  useEffect(() => {
    setFiltersInitialized(true);
  }, []);

  const { multipleAllowedTags = false } = settings;

  const updateSelectedTags = (tags: Tag[], callback?: Function) => {
    setSelectedTags(tags, callback);
  };

  const selectTag = (tag: FilterTagType, callback?: Function) => {
    updateSelectedTags([
      ...(
        multipleAllowedTags
          ? selectedTags
          : selectedTags.filter((tag$: FilterTagType) => tag.categoryId !== tag$.categoryId)
      ),
      tag,
    ], callback);
  };

  const unSelectTag = (tag: Tag, callback?: Function) => {
    updateSelectedTags([
      ...selectedTags.filter((tag$: Tag) => !tag.isEqual(tag$)),
    ], callback);
  };

  const isTagSelected = (tag: Tag) => {
    if (!multipleAllowedTags && tag.id === TAG_ANY_KEY) {
      // For radios, return true for ANY tag if no other tags are selected.
      const tagsInCategory = selectedTags.filter((t: Tag) => t.categoryId === tag.categoryId);
      if (tagsInCategory.length === 0) return true;
    }
    return selectedTags.find((tag$: Tag) => tag.isEqual(tag$)) !== undefined;
  };

  const getSelectedTags = () => selectedTags;

  const clearSelectedTags = () => updateSelectedTags([]);

  return {
    selectTag,
    unSelectTag,
    getSelectedTags,
    isTagSelected,
    clearSelectedTags,
    updateSelectedTags,
    filtersInitialized,
  };
};

export {
  Tag,
  TAG_ANY_KEY,
  useFilterByGroupStore,
};
