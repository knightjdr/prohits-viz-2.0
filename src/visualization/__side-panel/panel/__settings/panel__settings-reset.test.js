import React from 'react';
import { shallow } from 'enzyme';

import Reset from './panel__settings-reset';

const resetSettings = jest.fn();

describe('Reset panel settings', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Reset
        resetSettings={resetSettings}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call reset settings on clicking settings reset button', () => {
    resetSettings.mockClear();
    wrapper.find('RoundButton').simulate('click');
    expect(resetSettings).toHaveBeenCalled();
  });
});
