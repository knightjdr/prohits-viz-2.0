import React from 'react';
import { shallow } from 'enzyme';

import Basic, { RoundInput } from './panel__settings-basic';

const changeSetting = jest.fn();
const updateSetting = jest.fn();

describe('Basic panel settings', () => {
  beforeEach(() => {
    /* Clear call count */
    changeSetting.mockClear();
    updateSetting.mockClear();
  });

  it('should render', () => {
    const wrapper = shallow(
      <Basic
        changeSetting={changeSetting}
        settings={{
          cellSize: 20,
          imageType: 'dotplot',
        }}
        storeSettings={{
          cellSize: 20,
          imageType: 'dotplot',
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
      <Basic
        changeSetting={changeSetting}
        settings={{
          cellSize: 20,
          imageType: 'dotplot',
        }}
        storeSettings={{
          cellSize: 19,
          imageType: 'heatmap',
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
      <Basic
        changeSetting={changeSetting}
        settings={{
          cellSize: 20,
          imageType: 'dotplot',
        }}
        storeSettings={{
          cellSize: 20,
          imageType: 'dotplot',
        }}
        updateSetting={updateSetting}
      />,
    );
    wrapper.find('Select').simulate('change', 'heatmap');
    expect(changeSetting).toHaveBeenCalledTimes(1);
    expect(changeSetting).toHaveBeenCalledWith('imageType', 'heatmap');
  });

  it('should call change setting when input changes', () => {
    const wrapper = shallow(
      <Basic
        changeSetting={changeSetting}
        settings={{
          cellSize: 20,
          imageType: 'dotplot',
        }}
        storeSettings={{
          cellSize: 20,
          imageType: 'dotplot',
        }}
        updateSetting={updateSetting}
      />,
    );
    wrapper.find('InputNumber').simulate('change', 19);
    expect(changeSetting).toHaveBeenCalledTimes(1);
    expect(changeSetting).toHaveBeenCalledWith('cellSize', 19);
  });

  it('should call update setting when button clicked', () => {
    const wrapper = shallow(
      <Basic
        changeSetting={changeSetting}
        settings={{
          cellSize: 20,
          imageType: 'dotplot',
        }}
        storeSettings={{
          cellSize: 20,
          imageType: 'dotplot',
        }}
        updateSetting={updateSetting}
      />,
    );
    wrapper.find('button').first().simulate('click');
    wrapper.find('button').last().simulate('click');
    expect(updateSetting).toHaveBeenCalledTimes(2);
    expect(updateSetting).toHaveBeenCalledWith('cellSize');
    expect(updateSetting).toHaveBeenCalledWith('imageType');
  });
});

describe('Round input filter', () => {
  it('should round to nearest integer', () => {
    expect(RoundInput(0.3)).toBe(0);
    expect(RoundInput(0.5)).toBe(1);
    expect(RoundInput(1)).toBe(1);
  });
});
