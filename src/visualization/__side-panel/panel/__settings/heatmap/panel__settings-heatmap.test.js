import React from 'react';
import { shallow } from 'enzyme';

import SettingsHeatmap from './panel__settings-heatmap';

describe('Panel settings for heatmap', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <SettingsHeatmap
        changeSetting={jest.fn()}
        settings={{}}
        resetSettings={jest.fn()}
        storeSettings={{}}
        updateSetting={jest.fn()}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
