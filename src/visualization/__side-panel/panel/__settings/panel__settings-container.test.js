import React from 'react';
import { shallow } from 'enzyme';

import { SettingsContainer } from './panel__settings-container';

const resetSettings = jest.fn();
const updateSetting = jest.fn();

const settings = {
  abundanceCap: 50,
  cellSize: 20,
  edgeColor: 'blueBlack',
  fillColor: 'blueBlack',
  imageType: 'dotplot',
  invertColor: false,
  minAbundance: 0,
  primaryFilter: 0.01,
  secondaryFilter: 0.05,
};

describe('Settings container', () => {
  beforeEach(() => {
    /* Clear call count */
    resetSettings.mockClear();
    updateSetting.mockClear();
  });

  it('should set settings and store state from props', () => {
    const wrapper = shallow(
      <SettingsContainer
        reset={false}
        resetSettings={resetSettings}
        sortDefault={jest.fn()}
        updateSetting={updateSetting}
        {...settings}
      />,
    );
    expect(wrapper.state('settings')).toEqual(settings);
    expect(wrapper.state('storeSettings')).toEqual(settings);
  });

  it('should change component state setting when changeSetting method called', () => {
    const wrapper = shallow(
      <SettingsContainer
        reset={false}
        resetSettings={resetSettings}
        sortDefault={jest.fn()}
        updateSetting={updateSetting}
        {...settings}
      />,
    );
    wrapper.instance().changeSetting('abundanceCap', 49);
    expect(wrapper.state('settings').abundanceCap).toBe(49);
    expect(wrapper.state('storeSettings').abundanceCap).toBe(50);
  });

  it(`should call prop update seting when updateSetting method called and local state
  does not match store state`, () => {
    const wrapper = shallow(
      <SettingsContainer
        reset={false}
        resetSettings={resetSettings}
        sortDefault={jest.fn()}
        updateSetting={updateSetting}
        {...settings}
      />,
    );

    // State and store match, so prop method is not called.
    wrapper.instance().updateSetting('abundanceCap');
    expect(updateSetting).not.toHaveBeenCalled();

    // State and store differ, so prop method is called.
    wrapper.instance().changeSetting('abundanceCap', 49);
    wrapper.instance().updateSetting('abundanceCap');
    expect(updateSetting).toHaveBeenCalledWith('abundanceCap', 49);
  });

  it('should reset all settings when "reset" is true', () => {
    const wrapper = shallow(
      <SettingsContainer
        reset={false}
        resetSettings={resetSettings}
        sortDefault={jest.fn()}
        updateSetting={updateSetting}
        {...settings}
      />,
    );

    // Change state.
    wrapper.setState({
      settings: {
        ...settings,
        ...{ abundanceCap: 49 },
      },
      storeSettings: {
        ...settings,
        ...{ abundanceCap: 49 },
      },
    });
    expect(wrapper.state('settings').abundanceCap).toBe(49);
    expect(wrapper.state('storeSettings').abundanceCap).toBe(49);
    wrapper.setProps({ abundanceCap: 50, reset: true });
    expect(wrapper.state('settings').abundanceCap).toBe(50);
    expect(wrapper.state('storeSettings').abundanceCap).toBe(50);
  });

  it('should update store settings when a prop has change and "reset" is false', () => {
    const wrapper = shallow(
      <SettingsContainer
        reset={false}
        resetSettings={resetSettings}
        sortDefault={jest.fn()}
        updateSetting={updateSetting}
        {...settings}
      />,
    );

    // Change prop.
    wrapper.setProps({ abundanceCap: 49, reset: false });
    expect(wrapper.state('storeSettings').abundanceCap).toBe(49);
  });

  it('should not update store settings when a prop has not changed and "reset" is false', () => {
    const wrapper = shallow(
      <SettingsContainer
        reset={false}
        resetSettings={resetSettings}
        sortDefault={jest.fn()}
        updateSetting={updateSetting}
        {...settings}
      />,
    );

    // Change prop.
    wrapper.setProps({});
    expect(wrapper.state('storeSettings').abundanceCap).toBe(50);
  });
});
