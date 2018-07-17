import React from 'react';
import { shallow } from 'enzyme';

import Filter from './panel__settings-filter';

const changeSetting = jest.fn();
const updateSetting = jest.fn();

describe('Filter panel settings', () => {
  beforeEach(() => {
    /* Clear call count */
    changeSetting.mockClear();
    updateSetting.mockClear();
  });

  it('should render', () => {
    const wrapper = shallow(
      <Filter
        changeSetting={changeSetting}
        settings={{
          abundanceCap: 50,
          minAbundance: 0,
          primaryFilter: 0.01,
          secondaryFilter: 0.05,
        }}
        storeSettings={{
          abundanceCap: 50,
          minAbundance: 0,
          primaryFilter: 0.01,
          secondaryFilter: 0.05,
        }}
        updateSetting={updateSetting}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    // State and store match, so buttons should show sync color.
    expect(wrapper.find('.panel__settings-button_theme-sync').length).toBeGreaterThan(0);
    expect(wrapper.find('.panel__settings-button_theme-notsync').length).toBe(0);
  });

  it('should render different button color when store does not match current state', () => {
    const wrapper = shallow(
      <Filter
        changeSetting={changeSetting}
        settings={{
          abundanceCap: 50,
          minAbundance: 0,
          primaryFilter: 0.01,
          secondaryFilter: 0.05,
        }}
        storeSettings={{
          abundanceCap: 49,
          minAbundance: 1,
          primaryFilter: 0.02,
          secondaryFilter: 0.06,
        }}
        updateSetting={updateSetting}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    // State and store do not match, so buttons should not show sync color.
    expect(wrapper.find('.panel__settings-button_theme-sync').length).toBe(0);
    expect(wrapper.find('.panel__settings-button_theme-notsync').length).toBeGreaterThan(0);
  });

  it('should call change setting when input changes', () => {
    const wrapper = shallow(
      <Filter
        changeSetting={changeSetting}
        settings={{
          abundanceCap: 50,
          minAbundance: 0,
          primaryFilter: 0.01,
          secondaryFilter: 0.05,
        }}
        storeSettings={{
          abundanceCap: 50,
          minAbundance: 0,
          primaryFilter: 0.01,
          secondaryFilter: 0.05,
        }}
        updateSetting={updateSetting}
      />,
    );
    wrapper.find('InputNumber').at(0).simulate('change', 49);
    wrapper.find('InputNumber').at(1).simulate('change', 1);
    wrapper.find('InputNumber').at(2).simulate('change', 0.02);
    wrapper.find('InputNumber').at(3).simulate('change', 0.06);
    expect(changeSetting).toHaveBeenCalledTimes(4);
    expect(changeSetting).toHaveBeenCalledWith('abundanceCap', 49);
    expect(changeSetting).toHaveBeenCalledWith('minAbundance', 1);
    expect(changeSetting).toHaveBeenCalledWith('primaryFilter', 0.02);
    expect(changeSetting).toHaveBeenCalledWith('secondaryFilter', 0.06);
  });

  it('should call update setting when button clicked', () => {
    const wrapper = shallow(
      <Filter
        changeSetting={changeSetting}
        settings={{
          abundanceCap: 50,
          minAbundance: 0,
          primaryFilter: 0.01,
          secondaryFilter: 0.05,
        }}
        storeSettings={{
          abundanceCap: 50,
          minAbundance: 0,
          primaryFilter: 0.01,
          secondaryFilter: 0.05,
        }}
        updateSetting={updateSetting}
      />,
    );
    wrapper.find('button').at(0).simulate('click');
    wrapper.find('button').at(1).simulate('click');
    wrapper.find('button').at(2).simulate('click');
    wrapper.find('button').at(3).simulate('click');
    expect(updateSetting).toHaveBeenCalledTimes(4);
    expect(updateSetting).toHaveBeenCalledWith('abundanceCap');
    expect(updateSetting).toHaveBeenCalledWith('minAbundance');
    expect(updateSetting).toHaveBeenCalledWith('primaryFilter');
    expect(updateSetting).toHaveBeenCalledWith('secondaryFilter');
  });
});
