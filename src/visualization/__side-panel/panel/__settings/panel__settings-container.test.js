import React from 'react';
import { shallow } from 'enzyme';

import { SettingsContainer } from './panel__settings-container';

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

const resetAll = jest.fn();
const update = jest.fn();

describe('Settings container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <SettingsContainer
        imageKind="heatmap"
        reset={false}
        resetAll={resetAll}
        settings={settings}
        update={update}
      />,
    );
  });

  it('should set current state settings from props', () => {
    expect(wrapper.state('settings')).toEqual(settings);
  });

  it('should set current store settings from props', () => {
    expect(wrapper.state('storeSettings')).toEqual(settings);
  });

  describe('on prop change', () => {
    it('should update store settings when a prop has changed and "reset" is false', () => {
      wrapper.setProps({ settings: { abundanceCap: 49 }, reset: false });
      expect(wrapper.state('storeSettings').abundanceCap).toBe(49);
    });
  });

  it('should change component state setting when changeSetting method called', () => {
    wrapper.instance().changeSetting('abundanceCap', 49);
    expect(wrapper.state('settings').abundanceCap).toBe(49);
  });

  describe('restoring settings', () => {
    beforeAll(() => {
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
      wrapper.setProps({ settings: { abundanceCap: 50 }, reset: true });
    });

    it('should restore settings when "reset" is true', () => {
      expect(wrapper.state('settings').abundanceCap).toBe(50);
    });

    it('should restore store settings when "reset" is true', () => {
      expect(wrapper.state('storeSettings').abundanceCap).toBe(50);
    });
  });

  describe('update state settings', () => {
    it('should not call updateSetting prop when local state matches store state', () => {
      wrapper.setState({
        settings: {
          ...settings,
          ...{ abundanceCap: 50 },
        },
        storeSettings: {
          ...settings,
          ...{ abundanceCap: 50 },
        },
      });
      update.mockClear();
      wrapper.instance().updateSetting('abundanceCap');
      expect(update).not.toHaveBeenCalled();
    });

    it('should call updateSetting prop when local state does not match store state', () => {
      wrapper.setState({
        settings: {
          ...settings,
          ...{ abundanceCap: 49 },
        },
        storeSettings: {
          ...settings,
          ...{ abundanceCap: 50 },
        },
      });
      update.mockClear();
      wrapper.instance().updateSetting('abundanceCap');
      expect(update).toHaveBeenCalledWith('abundanceCap', 49);
    });
  });
});
