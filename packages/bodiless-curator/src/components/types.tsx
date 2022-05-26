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

import { ComponentType, HTMLProps } from 'react';
import { StylableProps, DesignableComponentsProps } from '@bodiless/fclasses';

type CuratorComponents = {
  Container: ComponentType<StylableProps & HTMLProps<HTMLDivElement>>,
};

type CuratorData = {
  containerId: string;
  curatorSrc: string;
  feedId: string;
};

type CuratorProps = DesignableComponentsProps<CuratorComponents> & {
  containerId?: string,
  curatorSrc?: string,
};

type CuratorContextData = {
  isLoaded: boolean;
};

export {
  CuratorComponents,
  CuratorData,
  CuratorProps,
  CuratorContextData,
};
