import React from 'react';
import { shallow } from 'enzyme';

import Tooltip from './svg__tooltip';

describe('Heatmap tooltip', () => {
  describe('when visible', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Tooltip
          display
          left={100}
          text="test text"
          top={200}
        />,
      );
    });

    it('should render', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have left prop position', () => {
      expect(wrapper.find('div').props().style.left).toBe(100);
    });

    it('should have correct opacity', () => {
      expect(wrapper.find('div').props().style.opacity).toBe(1);
    });

    it('should have top prop position', () => {
      expect(wrapper.find('div').props().style.top).toBe(200);
    });

    it('should have correct transform', () => {
      expect(wrapper.find('div').props().style.transform).toBe('scale(1)');
    });

    it('should be visible', () => {
      expect(wrapper.find('div').props().style.visibility).toBe('visible');
    });

    it('should render prop text', () => {
      expect(wrapper.text()).toBe('test text');
    });
  });

  describe('when hidden', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Tooltip
          display={false}
          left={100}
          text="test text"
          top={200}
        />,
      );
    });

    it('should render', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have correct opacity', () => {
      expect(wrapper.find('div').props().style.opacity).toBe(0);
    });

    it('should have correct transform', () => {
      expect(wrapper.find('div').props().style.transform).toBe('scale(0.8)');
    });

    it('should be visible', () => {
      expect(wrapper.find('div').props().style.visibility).toBe('hidden');
    });
  });
});
