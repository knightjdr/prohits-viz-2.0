import React from 'react';
import { shallow } from 'enzyme';

import Settings from './panel__settings';

describe('Settings panel', () => {
  describe('with dotplot image', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Settings
          changePlot={jest.fn()}
          changeSetting={jest.fn()}
          imageKind="dotplot"
          plots={[]}
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
          changePlot={jest.fn()}
          changeSetting={jest.fn()}
          imageKind="heatmap"
          plots={[]}
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

  describe('with circHeatmap image', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Settings
          changePlot={jest.fn()}
          changeSetting={jest.fn()}
          imageKind="circ-heatmap"
          plots={[]}
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

    it('should have CircHeatmap component', () => {
      expect(wrapper.find('CircHeatmapSettings').length).toBe(1);
    });
  });
});
