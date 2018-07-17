import React from 'react';
import { shallow } from 'enzyme';

import Palette from './panel__settings-palette';

const changeSetting = jest.fn();
const updateSetting = jest.fn();

describe('Palette panel settings', () => {
  beforeEach(() => {
    /* Clear call count */
    changeSetting.mockClear();
    updateSetting.mockClear();
  });

  it('should render', () => {
    const wrapper = shallow(
      <Palette
        changeSetting={changeSetting}
        settings={{
          edgeColor: 'blueBlack',
          fillColor: 'blueBlack',
          invertColor: false,
        }}
        storeSettings={{
          edgeColor: 'blueBlack',
          fillColor: 'blueBlack',
          invertColor: false,
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
      <Palette
        changeSetting={changeSetting}
        settings={{
          edgeColor: 'blueBlack',
          fillColor: 'blueBlack',
          invertColor: false,
        }}
        storeSettings={{
          edgeColor: 'redBlack',
          fillColor: 'redBlack',
          invertColor: true,
        }}
        updateSetting={updateSetting}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    // State and store do not match, so buttons should not show sync color.
    expect(wrapper.find('.panel__settings-button_theme-sync').length).toBe(0);
    expect(wrapper.find('.panel__settings-button_theme-notsync').length).toBeGreaterThan(0);
  });

  it('should call change setting when select changes', () => {
    const wrapper = shallow(
      <Palette
        changeSetting={changeSetting}
        settings={{
          edgeColor: 'blueBlack',
          fillColor: 'blueBlack',
          invertColor: false,
        }}
        storeSettings={{
          edgeColor: 'blueBlack',
          fillColor: 'blueBlack',
          invertColor: false,
        }}
        updateSetting={updateSetting}
      />,
    );
    wrapper.find('Select').first().simulate('change', 'blueBlack');
    wrapper.find('Select').last().simulate('change', 'blueBlack');
    expect(changeSetting).toHaveBeenCalledTimes(2);
    expect(changeSetting).toHaveBeenCalledWith('edgeColor', 'blueBlack');
    expect(changeSetting).toHaveBeenCalledWith('fillColor', 'blueBlack');
  });

  it('should call change setting when switch changes', () => {
    const wrapper = shallow(
      <Palette
        changeSetting={changeSetting}
        settings={{
          edgeColor: 'blueBlack',
          fillColor: 'blueBlack',
          invertColor: false,
        }}
        storeSettings={{
          edgeColor: 'blueBlack',
          fillColor: 'blueBlack',
          invertColor: false,
        }}
        updateSetting={updateSetting}
      />,
    );
    wrapper.find('Switch').simulate('change', false);
    expect(changeSetting).toHaveBeenCalledTimes(1);
    expect(changeSetting).toHaveBeenCalledWith('invertColor', false);
  });

  it('should call update setting when button clicked', () => {
    const wrapper = shallow(
      <Palette
        changeSetting={changeSetting}
        settings={{
          edgeColor: 'blueBlack',
          fillColor: 'blueBlack',
          invertColor: false,
        }}
        storeSettings={{
          edgeColor: 'redBlack',
          fillColor: 'redBlack',
          invertColor: true,
        }}
        updateSetting={updateSetting}
      />,
    );
    wrapper.find('button').first().simulate('click');
    wrapper.find('button').at(1).simulate('click');
    wrapper.find('button').last().simulate('click');
    expect(updateSetting).toHaveBeenCalledTimes(3);
    expect(updateSetting).toHaveBeenCalledWith('edgeColor');
    expect(updateSetting).toHaveBeenCalledWith('fillColor');
    expect(updateSetting).toHaveBeenCalledWith('invertColor');
  });
});
