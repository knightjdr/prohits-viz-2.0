import React from 'react';
import { shallow } from 'enzyme';

import Reorder from './customize__reorder';

jest.mock('./customize__reorder-icons');

const mouseMoveColumn = jest.fn();
const mouseMoveRow = jest.fn();
const mouseUp = jest.fn();

describe('Reorder component', () => {
  describe('when not shown', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Reorder
          cellSize={20}
          circle={{}}
          column={{}}
          coverItem={{}}
          dimensions={{}}
          fontSize={12}
          lines={{}}
          mouseDownColumn={jest.fn()}
          mouseDownRow={jest.fn()}
          mouseMoveColumn={mouseMoveColumn}
          mouseMoveRow={mouseMoveRow}
          mouseUp={mouseUp}
          row={{}}
          show={false}
          showIcons={false}
          text={{}}
        />,
      );
    });

    it('should return null', () => {
      expect(wrapper.getElement()).toBeNull();
    });
  });

  describe('showing icons', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Reorder
          cellSize={20}
          circle={{}}
          column={{
            height: 100,
            width: 200,
          }}
          coverItem={{}}
          dimensions={{
            pageX: 10,
            pageY: 10,
          }}
          fontSize={12}
          lines={{}}
          mouseDownColumn={jest.fn()}
          mouseDownRow={jest.fn()}
          mouseMoveColumn={mouseMoveColumn}
          mouseMoveRow={mouseMoveRow}
          mouseUp={mouseUp}
          row={{
            height: 200,
            width: 100,
          }}
          show
          showIcons
          text={{}}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should show two g elements', () => {
      expect(wrapper.find('g').length).toBe(2);
    });

    describe('column mouse events', () => {
      let rect;

      beforeAll(() => {
        rect = wrapper.find('rect').first(0);
      });

      it('should not fire mouseUp on mouseleave', () => {
        mouseUp.mockClear();
        rect.simulate('mouseleave');
        expect(mouseUp).not.toHaveBeenCalled();
      });
    });

    describe('row mouse events', () => {
      let rect;

      beforeAll(() => {
        rect = wrapper.find('rect').at(1);
      });

      it('should not fire mouseUp on mouseleave', () => {
        mouseUp.mockClear();
        rect.simulate('mouseleave');
        expect(mouseUp).not.toHaveBeenCalled();
      });
    });
  });

  describe('after mousedown with no icons', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Reorder
          cellSize={20}
          circle={{
            radius: 10,
            x: 110,
            y: 10,
          }}
          column={{
            height: 100,
            width: 200,
          }}
          coverItem={{
            height: 100,
            width: 20,
            x: 0,
            y: 0,
          }}
          dimensions={{
            pageX: 10,
            pageY: 10,
          }}
          fontSize={12}
          lines={{
            a: {
              x1: 0,
              x2: 0,
              y1: 0,
              y2: 300,
            },
            b: {
              x1: 20,
              x2: 20,
              y1: 0,
              y2: 300,
            },
          }}
          mouseDownColumn={jest.fn()}
          mouseDownRow={jest.fn()}
          mouseMoveColumn={mouseMoveColumn}
          mouseMoveRow={mouseMoveRow}
          mouseUp={mouseUp}
          row={{
            height: 200,
            width: 100,
          }}
          show
          showIcons={false}
          text={{
            height: 0,
            name: '',
            rotation: 0,
            transform: '',
            width: 0,
            x: 0,
            y: 0,
          }}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should show four g elements', () => {
      expect(wrapper.find('g').length).toBe(4);
    });

    describe('column mouse events', () => {
      let rect;

      beforeAll(() => {
        rect = wrapper.find('rect').first(0);
      });

      it('should fire mouseUp on mouseleave', () => {
        mouseUp.mockClear();
        rect.simulate('mouseleave');
        expect(mouseUp).toHaveBeenCalled();
      });

      it('should fire mouseMove on mousemove', () => {
        mouseMoveColumn.mockClear();
        rect.simulate('mousemove');
        expect(mouseMoveColumn).toHaveBeenCalled();
      });

      it('should fire mouseUp on mouseup', () => {
        mouseUp.mockClear();
        rect.simulate('mouseup');
        expect(mouseUp).toHaveBeenCalled();
      });
    });

    describe('row mouse events', () => {
      let rect;

      beforeAll(() => {
        rect = wrapper.find('rect').at(1);
      });

      it('should fire mouseUp on mouseup', () => {
        mouseUp.mockClear();
        rect.simulate('mouseup');
        expect(mouseUp).toHaveBeenCalled();
      });

      it('should fire mouseMove on mousemove', () => {
        mouseMoveRow.mockClear();
        rect.simulate('mousemove');
        expect(mouseMoveRow).toHaveBeenCalled();
      });

      it('should fire mouseUp on mouseup', () => {
        mouseUp.mockClear();
        rect.simulate('mouseup');
        expect(mouseUp).toHaveBeenCalled();
      });
    });
  });
});
