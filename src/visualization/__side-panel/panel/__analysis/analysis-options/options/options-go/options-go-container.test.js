import React from 'react';
import { shallow } from 'enzyme';

import { GoContainer } from './options-go-container';

const setGoParameters = jest.fn();

describe('Analysis GO options container', () => {
  let wrapper;

  beforeEach(() => {
    setGoParameters.mockClear();
  });

  beforeAll(() => {
    wrapper = shallow(
      <GoContainer
        form={{
          sf_GO: true,
          sf_HP: false,
        }}
        setGoParameters={setGoParameters}
      />,
    );
  });

  it('should have initial state for "showAdvanced" set to false', () => {
    expect(wrapper.state('showAdvanced')).toBeFalsy();
  });

  it('should call prop method to update GO checkbox values', () => {
    const expectedSettings = {
      sf_GO: false,
      'sf_GO:BP': false,
      'sf_GO:CC': false,
      'sf_GO:MF': false,
    };
    wrapper.instance().handleGoCheckbox();
    expect(setGoParameters).toHaveBeenCalledWith(expectedSettings);
  });

  it('should call prop method to update checkbox value', () => {
    const expectedSettings = {
      sf_HP: true,
    };
    wrapper.instance().handleCheckbox('sf_HP');
    expect(setGoParameters).toHaveBeenCalledWith(expectedSettings);
  });

  it('should call prop method to update input value', () => {
    const expectedSettings = {
      user_thr: 0.05,
    };
    wrapper.instance().handleInput('user_thr', 0.05);
    expect(setGoParameters).toHaveBeenCalledWith(expectedSettings);
  });

  it('should call prop method to update select value', () => {
    const expectedSettings = {
      max_set_size: 50,
    };
    wrapper.instance().handleSelect('max_set_size', 50);
    expect(setGoParameters).toHaveBeenCalledWith(expectedSettings);
  });

  it('should toggle advanced visibility state', () => {
    wrapper.instance().toggleAdvanced();
    expect(wrapper.state('showAdvanced')).toBeTruthy();
  });
});
