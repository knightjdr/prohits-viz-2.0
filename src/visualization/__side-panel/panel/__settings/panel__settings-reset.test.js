import React from 'react';
import { shallow } from 'enzyme';

import Reset from './panel__settings-reset';

const resetImage = jest.fn();
const resetSettings = jest.fn();

describe('Reset panel settings', () => {
  beforeEach(() => {
    /* Clear call count */
    resetImage.mockClear();
    resetSettings.mockClear();
  });

  it('should render', () => {
    const wrapper = shallow(
      <Reset
        resetImage={resetImage}
        resetSettings={resetSettings}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call reset settings on clicking settings reset button', () => {
    const wrapper = shallow(
      <Reset
        resetImage={resetImage}
        resetSettings={resetSettings}
      />,
    );
    wrapper.find('button').first().simulate('click');
    expect(resetSettings).toHaveBeenCalled();
  });

  it('should call reset image on clicking image reset button', () => {
    const wrapper = shallow(
      <Reset
        resetImage={resetImage}
        resetSettings={resetSettings}
      />,
    );
    wrapper.find('button').last().simulate('click');
    expect(resetImage).toHaveBeenCalled();
  });
});
