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

import { vitalButtonsBase, asButtonToken } from '@bodiless/vital-buttons';
import { addProps } from '@bodiless/fclasses';

const Default = asButtonToken(vitalButtonsBase.Default, {
  Behavior: {
    Wrapper: addProps({ 'data-shadowed-by': '__vital__:DefaultButtons' }),
  },
});

const Primary = asButtonToken(vitalButtonsBase.Primary, {
  Behavior: {
    Wrapper: addProps({ 'data-shadowed-by': '__vital__:PrimaryButtons' }),
  },
});

const Secondary = asButtonToken(vitalButtonsBase.Secondary, {
  Behavior: {
    Wrapper: addProps({ 'data-shadowed-by': '__vital__:SecondaryButtons' }),
  },
});

const PrimarySelected = asButtonToken(vitalButtonsBase.PrimarySelected, {
  Behavior: {
    Wrapper: addProps({ 'data-shadowed-by': '__vital__:PrimarySelectedButtons' }),
  },
});

const SecondarySelected = asButtonToken(vitalButtonsBase.SecondarySelected, {
  Behavior: {
    Wrapper: addProps({ 'data-shadowed-by': '__vital__:SecondarySelectedButtons' }),
  },
});

export default {
  ...vitalButtonsBase,
  Default,
  Primary,
  Secondary,
  PrimarySelected,
  SecondarySelected,
};
