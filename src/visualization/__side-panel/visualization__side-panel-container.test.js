import React from 'react';
import { shallow } from 'enzyme';

import VisualizationPanelContainer from './visualization__side-panel-container';

describe('Visualization panel container', () => {
  it('should set initial state', () => {
    const wrapper = shallow(<VisualizationPanelContainer />);
    // isVisible will ultimate be false, but is true during development.
    expect(wrapper.state('isVisible')).toBeTruthy();
    expect(wrapper.state('tab')).toBe('info');
  });

  it('should change active tab', () => {
    const wrapper = shallow(<VisualizationPanelContainer />);
    wrapper.instance().selectTab('map');
    expect(wrapper.state('tab')).toBe('map');
  });

  it('should toggle the panel', () => {
    const wrapper = shallow(<VisualizationPanelContainer />);
    expect(wrapper.state('isVisible')).toBeTruthy();
    wrapper.instance().togglePanel();
    expect(wrapper.state('isVisible')).toBeFalsy();
  });
});
