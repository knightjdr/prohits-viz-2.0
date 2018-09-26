import React from 'react';
import { shallow } from 'enzyme';

import Tooltips from './heatmap-svg__tooltips';

const clearTooltip = jest.fn();
const handleMouseMove = jest.fn();

describe('Tooltips', () => {
  describe('with mouse events', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Tooltips
          clearTooltip={clearTooltip}
          handleMouseMove={handleMouseMove}
          height={100}
          mouseEvents
          setRef={{ ref: 'test' }}
          width={200}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should set pointer events', () => {
      expect(wrapper.find('g').props().pointerEvents).toBe('auto');
    });

    describe('rect listener', () => {
      let rect;

      beforeAll(() => {
        rect = wrapper.find('rect');
      });

      it('should set height', () => {
        expect(rect.props().height).toBe(100);
      });

      it('should set width', () => {
        expect(rect.props().width).toBe(200);
      });

      it('should handle mouse leave', () => {
        clearTooltip.mockClear();
        rect.simulate('mouseleave');
        expect(clearTooltip).toHaveBeenCalled();
      });

      it('should handle mouse mouse', () => {
        handleMouseMove.mockClear();
        rect.simulate('mousemove');
        expect(handleMouseMove).toHaveBeenCalled();
      });
    });
  });

  describe('without mouse events', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Tooltips
          clearTooltip={clearTooltip}
          handleMouseMove={handleMouseMove}
          height={100}
          mouseEvents={false}
          setRef={{ ref: 'test' }}
          width={200}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should set pointer events', () => {
      expect(wrapper.find('g').props().pointerEvents).toBe('none');
    });
  });
});
