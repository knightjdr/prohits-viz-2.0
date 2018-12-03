import React from 'react';
import { shallow } from 'enzyme';

import SidePanelTab from './side-panel-tab';

const onClick = jest.fn();

describe('SidePanelTab', () => {
  describe('when tab is selected', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <SidePanelTab
          onClick={onClick}
          selectedTab="tab"
          tab="tab"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have selected class', () => {
      const button = wrapper.find('button');
      expect(button.hasClass('side-panel-tab_selected')).toBeTruthy();
    });

    it('should call click handler with tab name', () => {
      onClick.mockClear();
      const button = wrapper.find('button');
      button.simulate('click');
      expect(onClick).toHaveBeenCalledWith('tab');
    });
  });

  describe('when tab is not selected', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <SidePanelTab
          onClick={onClick}
          selectedTab="tab"
          tab="othertab"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not have selected class', () => {
      const button = wrapper.find('button');
      expect(button.hasClass('side-panel-tab_selected')).not.toBeTruthy();
    });
  });
});
