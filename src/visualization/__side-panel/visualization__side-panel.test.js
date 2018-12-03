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
          animationDuration={0}
          isVisible={false}
          selectTab={selectTab}
          tab="info"
          tabs={[]}
          togglePanel={togglePanel}
          transitionDuration={0}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should set panel opacity', () => {
      expect(wrapper.find('.visualization__side-panel').props().style.opacity).toBe(0);
    });

    it('should set button opacity', () => {
      expect(wrapper.find('.visualization__side-panel-button').props().style.opacity).toBe(1);
    });
  });

  describe('when panel visible', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <VisualizationPanel
          animationDuration={0}
          isVisible
          selectTab={selectTab}
          tab="info"
          tabs={[]}
          togglePanel={togglePanel}
          transitionDuration={0}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should set panel opacity', () => {
      expect(wrapper.find('.visualization__side-panel').props().style.opacity).toBe(1);
    });

    it('should set button opacity', () => {
      expect(wrapper.find('.visualization__side-panel-button').props().style.opacity).toBe(0);
    });

    it('should toggle panel on button click', () => {
      togglePanel.mockClear();
      wrapper.find('.visualization__side-panel-button').simulate('click');
      expect(togglePanel).toHaveBeenCalled();
    });
  });
});
