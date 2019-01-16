import React from 'react';
import { shallow } from 'enzyme';

import { ToolSelectionComponent } from './tool-selection';

describe('ToolSelectionComponent', () => {
  describe('with no selected type', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <ToolSelectionComponent
          form={{}}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not show description', () => {
      expect(wrapper.find('.tool-selection__tool-description').length).toBe(0);
    });
  });

  describe('with selected analysis type', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <ToolSelectionComponent
          form={{ analysisType: 'dotplot' }}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should show description', () => {
      expect(wrapper.find('.tool-selection__tool-description').length).toBe(1);
    });

    it('should open alert', () => {
      const alertProps = wrapper.find('Alert').props();
      expect(alertProps.type).toEqual('info');
    });
  });
});
