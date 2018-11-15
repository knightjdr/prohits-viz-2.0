import React from 'react';
import { shallow } from 'enzyme';

import Overlay from './heatmap-svg__overlay';

const handleMouseMove = jest.fn();
const handleMouseUp = jest.fn();
const handleMouseDown = jest.fn();

describe('Overlay', () => {
  describe('without marker selection box', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Overlay
          cursor="default"
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          handleMouseDown={handleMouseDown}
          height={100}
          marker={{
            height: 0,
            show: false,
            width: 0,
            x: 0,
            y: 0,
          }}
          setRef={{ ref: 'test' }}
          width={200}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not display marker selection box', () => {
      expect(wrapper.find('rect').length).toBe(1);
    });

    describe('rect mouse listener', () => {
      let rect;

      beforeAll(() => {
        rect = wrapper.find('rect');
      });

      it('should set cursor', () => {
        expect(rect.props().cursor).toBe('default');
      });

      it('should set height', () => {
        expect(rect.props().height).toBe(100);
      });

      it('should set width', () => {
        expect(rect.props().width).toBe(200);
      });

      it('should handle mouse down', () => {
        handleMouseDown.mockClear();
        rect.simulate('mousedown');
        expect(handleMouseDown).toHaveBeenCalled();
      });
    });
  });

  describe('with marker selection box', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Overlay
          cursor="default"
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          handleMouseDown={handleMouseDown}
          height={100}
          marker={{
            height: 10,
            show: true,
            width: 20,
            x: 5,
            y: 10,
          }}
          setRef={{ ref: 'test' }}
          width={200}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should display marker selection box', () => {
      expect(wrapper.find('rect').length).toBe(2);
    });

    describe('selection box', () => {
      let rect;

      beforeAll(() => {
        rect = wrapper.find('rect').at(0);
      });

      it('should set height', () => {
        expect(rect.props().height).toBe(10);
      });

      it('should set x', () => {
        expect(rect.props().x).toBe(5);
      });

      it('should set y', () => {
        expect(rect.props().y).toBe(10);
      });

      it('should set width', () => {
        expect(rect.props().width).toBe(20);
      });
    });
  });
});
