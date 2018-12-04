import React from 'react';
import { shallow } from 'enzyme';

import Settings from './panel__settings';

describe('Settings panel', () => {
  describe('with dotplot image', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Settings
          changeSetting={jest.fn()}
          imageKind="dotplot"
          resetSettings={jest.fn()}
          settings={{}}
          storeSettings={{}}
          updateSetting={jest.fn()}
        />,
      );
    });

    it('should render', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have Heatmap component', () => {
      expect(wrapper.find('HeatmapSettings').length).toBe(1);
    });
  });

  describe('with heatmap image', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Settings
          changeSetting={jest.fn()}
          imageKind="heatmap"
          resetSettings={jest.fn()}
          settings={{}}
          storeSettings={{}}
          updateSetting={jest.fn()}
        />,
      );
    });

    it('should render', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have Heatmap component', () => {
      expect(wrapper.find('HeatmapSettings').length).toBe(1);
    });
  });

  describe('with segcircle image', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Settings
          changeSetting={jest.fn()}
          imageKind="segcircle"
          resetSettings={jest.fn()}
          settings={{}}
          storeSettings={{}}
          updateSetting={jest.fn()}
        />,
      );
    });

    it('should render', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have SegCircle component', () => {
      expect(wrapper.find('SegCircleSettings').length).toBe(1);
    });
  });
});
