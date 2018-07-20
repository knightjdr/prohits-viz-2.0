import React from 'react';
import { shallow } from 'enzyme';

import VisualizationPanel from './visualization__side-panel';

const selectTab = jest.fn();
const togglePanel = jest.fn();

describe('Visualization panel', () => {
  beforeEach(() => {
    /* Clear call count */
    selectTab.mockClear();
    togglePanel.mockClear();
  });

  it('should render as button only when panel not visible', () => {
    const wrapper = shallow(
      <VisualizationPanel
        isVisible={false}
        selectTab={selectTab}
        tab="info"
        togglePanel={togglePanel}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.visualization__side-panel').props().style.opacity).toBe(0);
    expect(wrapper.find('.visualization__side-panel-button').props().style.opacity).toBe(1);
  });

  it('should render panel but not button', () => {
    const wrapper = shallow(
      <VisualizationPanel
        isVisible
        selectTab={selectTab}
        tab="info"
        togglePanel={togglePanel}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.visualization__side-panel').props().style.opacity).toBe(1);
    expect(wrapper.find('.visualization__side-panel-button').props().style.opacity).toBe(0);
  });

  it('should give "info" button selected class when tab selected', () => {
    const wrapper = shallow(
      <VisualizationPanel
        isVisible
        selectTab={selectTab}
        tab="info"
        togglePanel={togglePanel}
      />,
    );
    expect(wrapper.find('button').at(0).props().className).toBe('visualization__side-panel-tab-selected');
    expect(wrapper.find('button').at(1).props().className).toBeNull();
    expect(wrapper.find('button').at(2).props().className).toBeNull();
    expect(wrapper.find('button').at(3).props().className).toBeNull();
    expect(wrapper.find('button').at(4).props().className).toBeNull();
    expect(wrapper.find('button').at(5).props().className).toBeNull();
  });

  it('should give "map" button selected class when tab selected', () => {
    const wrapper = shallow(
      <VisualizationPanel
        isVisible
        selectTab={selectTab}
        tab="map"
        togglePanel={togglePanel}
      />,
    );
    expect(wrapper.find('button').at(0).props().className).toBeNull();
    expect(wrapper.find('button').at(1).props().className).toBe('visualization__side-panel-tab-selected');
    expect(wrapper.find('button').at(2).props().className).toBeNull();
    expect(wrapper.find('button').at(3).props().className).toBeNull();
    expect(wrapper.find('button').at(4).props().className).toBeNull();
    expect(wrapper.find('button').at(5).props().className).toBeNull();
  });

  it('should give "settings" button selected class when tab selected', () => {
    const wrapper = shallow(
      <VisualizationPanel
        isVisible
        selectTab={selectTab}
        tab="settings"
        togglePanel={togglePanel}
      />,
    );
    expect(wrapper.find('button').at(0).props().className).toBeNull();
    expect(wrapper.find('button').at(1).props().className).toBeNull();
    expect(wrapper.find('button').at(2).props().className).toBe('visualization__side-panel-tab-selected');
    expect(wrapper.find('button').at(3).props().className).toBeNull();
    expect(wrapper.find('button').at(4).props().className).toBeNull();
    expect(wrapper.find('button').at(5).props().className).toBeNull();
  });

  it('should give "annotation" button selected class when tab selected', () => {
    const wrapper = shallow(
      <VisualizationPanel
        isVisible
        selectTab={selectTab}
        tab="annotation"
        togglePanel={togglePanel}
      />,
    );
    expect(wrapper.find('button').at(0).props().className).toBeNull();
    expect(wrapper.find('button').at(1).props().className).toBeNull();
    expect(wrapper.find('button').at(2).props().className).toBeNull();
    expect(wrapper.find('button').at(3).props().className).toBe('visualization__side-panel-tab-selected');
    expect(wrapper.find('button').at(4).props().className).toBeNull();
    expect(wrapper.find('button').at(5).props().className).toBeNull();
  });

  it('should give "analysis" button selected class when tab selected', () => {
    const wrapper = shallow(
      <VisualizationPanel
        isVisible
        selectTab={selectTab}
        tab="analysis"
        togglePanel={togglePanel}
      />,
    );
    expect(wrapper.find('button').at(0).props().className).toBeNull();
    expect(wrapper.find('button').at(1).props().className).toBeNull();
    expect(wrapper.find('button').at(2).props().className).toBeNull();
    expect(wrapper.find('button').at(3).props().className).toBeNull();
    expect(wrapper.find('button').at(4).props().className).toBe('visualization__side-panel-tab-selected');
    expect(wrapper.find('button').at(5).props().className).toBeNull();
  });

  it('should give "save" button selected class when tab selected', () => {
    const wrapper = shallow(
      <VisualizationPanel
        isVisible
        selectTab={selectTab}
        tab="save"
        togglePanel={togglePanel}
      />,
    );
    expect(wrapper.find('button').at(0).props().className).toBeNull();
    expect(wrapper.find('button').at(1).props().className).toBeNull();
    expect(wrapper.find('button').at(2).props().className).toBeNull();
    expect(wrapper.find('button').at(3).props().className).toBeNull();
    expect(wrapper.find('button').at(4).props().className).toBeNull();
    expect(wrapper.find('button').at(5).props().className).toBe('visualization__side-panel-tab-selected');
  });

  it('should select tab on button click', () => {
    const wrapper = shallow(
      <VisualizationPanel
        isVisible
        selectTab={selectTab}
        tab="info"
        togglePanel={togglePanel}
      />,
    );
    wrapper.find('button').at(0).simulate('click');
    expect(selectTab).toHaveBeenCalledWith('info');
    wrapper.find('button').at(1).simulate('click');
    expect(selectTab).toHaveBeenCalledWith('map');
    wrapper.find('button').at(2).simulate('click');
    expect(selectTab).toHaveBeenCalledWith('settings');
    wrapper.find('button').at(3).simulate('click');
    expect(selectTab).toHaveBeenCalledWith('annotation');
    wrapper.find('button').at(4).simulate('click');
    expect(selectTab).toHaveBeenCalledWith('analysis');
    wrapper.find('button').at(5).simulate('click');
    expect(selectTab).toHaveBeenCalledWith('save');
  });

  it('should toggle panel on button click', () => {
    const wrapper = shallow(
      <VisualizationPanel
        isVisible
        selectTab={selectTab}
        tab="info"
        togglePanel={togglePanel}
      />,
    );
    wrapper.find('.visualization__side-panel-button').simulate('click');
    wrapper.find('.visualization__side-panel-button-close').simulate('click');
    expect(togglePanel).toHaveBeenCalledTimes(2);
  });
});
