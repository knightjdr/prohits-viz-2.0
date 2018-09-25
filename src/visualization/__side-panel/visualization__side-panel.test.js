import React from 'react';
import { shallow } from 'enzyme';

import VisualizationPanel from './visualization__side-panel';

const selectTab = jest.fn();
const togglePanel = jest.fn();

describe('Visualization panel', () => {
  describe('when panel is hidden', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <VisualizationPanel
          isVisible={false}
          selectTab={selectTab}
          tab="info"
          togglePanel={togglePanel}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should set panel opacity', () => {
      expect(wrapper.find('.visualization__side-panel').props().style.opacity).toBe(0);
    });

    it('should set butotn opacity', () => {
      expect(wrapper.find('.visualization__side-panel-button').props().style.opacity).toBe(1);
    });
  });

  describe('when panel visible', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <VisualizationPanel
          isVisible
          selectTab={selectTab}
          tab="info"
          togglePanel={togglePanel}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should set panel opacity', () => {
      expect(wrapper.find('.visualization__side-panel').props().style.opacity).toBe(1);
    });

    it('should set butotn opacity', () => {
      expect(wrapper.find('.visualization__side-panel-button').props().style.opacity).toBe(0);
    });

    it('should give "info" button selected class when tab selected', () => {
      expect(wrapper.find('button').at(0)).toEqual(wrapper.find('.visualization__side-panel-tab-selected'));
    });

    it('should give "map" button selected class when tab selected', () => {
      wrapper.setProps({ tab: 'map' });
      expect(wrapper.find('button').at(1)).toEqual(wrapper.find('.visualization__side-panel-tab-selected'));
    });

    it('should give "settings" button selected class when tab selected', () => {
      wrapper.setProps({ tab: 'settings' });
      expect(wrapper.find('button').at(2)).toEqual(wrapper.find('.visualization__side-panel-tab-selected'));
    });

    it('should give "annotation" button selected class when tab selected', () => {
      wrapper.setProps({ tab: 'annotation' });
      expect(wrapper.find('button').at(3)).toEqual(wrapper.find('.visualization__side-panel-tab-selected'));
    });

    it('should give "analysis" button selected class when tab selected', () => {
      wrapper.setProps({ tab: 'analysis' });
      expect(wrapper.find('button').at(4)).toEqual(wrapper.find('.visualization__side-panel-tab-selected'));
    });

    it('should give "save" button selected class when tab selected', () => {
      wrapper.setProps({ tab: 'save' });
      expect(wrapper.find('button').at(5)).toEqual(wrapper.find('.visualization__side-panel-tab-selected'));
    });

    it('should toggle panel on button click', () => {
      togglePanel.mockClear();
      wrapper.find('.visualization__side-panel-button').simulate('click');
      wrapper.find('.visualization__side-panel-button-close').simulate('click');
      expect(togglePanel).toHaveBeenCalledTimes(2);
    });

    it('should select info tab on button click', () => {
      selectTab.mockClear();
      wrapper.find('button').at(0).simulate('click');
      expect(selectTab).toHaveBeenCalledWith('info');
    });

    it('should select map tab on button click', () => {
      selectTab.mockClear();
      wrapper.find('button').at(1).simulate('click');
      expect(selectTab).toHaveBeenCalledWith('map');
    });

    it('should select settings tab on button click', () => {
      selectTab.mockClear();
      wrapper.find('button').at(2).simulate('click');
      expect(selectTab).toHaveBeenCalledWith('settings');
    });

    it('should select annotation tab on button click', () => {
      selectTab.mockClear();
      wrapper.find('button').at(3).simulate('click');
      expect(selectTab).toHaveBeenCalledWith('annotation');
    });

    it('should select analysis tab on button click', () => {
      selectTab.mockClear();
      wrapper.find('button').at(4).simulate('click');
      expect(selectTab).toHaveBeenCalledWith('analysis');
    });

    it('should select save tab on button click', () => {
      selectTab.mockClear();
      wrapper.find('button').at(5).simulate('click');
      expect(selectTab).toHaveBeenCalledWith('save');
    });
  });
});
