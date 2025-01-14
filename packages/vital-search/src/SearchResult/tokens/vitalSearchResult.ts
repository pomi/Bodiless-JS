/**
 * Copyright © 2022 Johnson & Johnson
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

// import { GTMDataLayerSearchResultHelmet } from '@bodiless/vital-gtm';
import { as } from '@bodiless/fclasses';
import { vitalTypography } from '@bodiless/vital-elements';
import {
  asSearchResultToken,
} from '../SearchResultClean';

const Default = asSearchResultToken({
  Theme: {
    ItemH3: as(vitalTypography.H3Link),
    ItemParagraph: vitalTypography.Body,
  },
  Spacing: {
    ItemList: 'mb-9',
    ItemH3: 'mb-3',
  },
});

export default {
  Default,
};
