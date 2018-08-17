import React from 'react';
import { shallow } from 'enzyme';

import Settings from './panel__settings';

describe('Settings panel', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Settings
        changeSetting={jest.fn()}
        resetSettings={jest.fn()}
        settings={{}}
        storeSettings={{}}
        updateSetting={jest.fn()}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
