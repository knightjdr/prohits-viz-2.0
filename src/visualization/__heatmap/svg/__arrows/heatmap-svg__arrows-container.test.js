import React from 'react';
import { shallow, mount } from 'enzyme';

import OnResize from '../../../../helpers/on-resize';
import { ArrowsContainer } from './heatmap-svg__arrows-container';

jest.mock('../../../../helpers/on-resize');

const updatePosition = jest.fn();

describe('Heatmap arrows container', () => {
  describe('with vertical arrows', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <ArrowsContainer
          dimension={{
            columns: 10,
            pageX: 5,
            pageY: 10,
            rows: 20,
          }}
          direction="vertical"
          height={{
            heatmap: 400,
            wrapper: 500,
          }}
          position={{
            x: 0,
            y: 0,
          }}
          show
          updatePosition={updatePosition}
          width={{
            wrapper: 500,
          }}
        />,
      );
    });

    describe('sets initial state', () => {
      it('and sets arrow opacity', () => {
        expect(wrapper.state('arrowOpacity')).toEqual({ down: false, up: true });
      });

      it('and sets arrow container position', () => {
        const elPosition = {
          bottom: 0,
          right: 202,
          transform: null,
        };
        expect(wrapper.state('elPosition')).toEqual(elPosition);
      });

      it('and sets heatmap length', () => {
        expect(wrapper.state('length')).toBe(20);
      });

      it('and sets page length', () => {
        expect(wrapper.state('page')).toBe(10);
      });

      it('and sets page type', () => {
        expect(wrapper.state('pageType')).toBe('pageY');
      });

      it('and sets vertex', () => {
        expect(wrapper.state('vertex')).toBe('y');
      });
    });

    describe('on resize', () => {
      let resizeFn;

      beforeAll(() => {
        wrapper.setState({ show: true });
        resizeFn = wrapper.instance().resizeEnd;
        wrapper.instance().resizeEnd = jest.fn();
        wrapper.instance().onResize();
      });

      afterAll(() => {
        wrapper.instance().resizeEnd = resizeFn;
      });

      it('should set show to false', () => {
        expect(wrapper.state('show')).toBeFalsy();
      });

      it('should call onResize method', () => {
        expect(OnResize).toHaveBeenCalled();
      });
    });

    describe('set opacity', () => {
      describe('should set up opacity', () => {
        it('to true when y is zero', () => {
          const opacity = wrapper.instance().setOpacity({ x: 0, y: 0 }, 'y', 10, 5);
          expect(opacity.up).toBeTruthy();
        });

        it('to false when y is not', () => {
          const opacity = wrapper.instance().setOpacity({ x: 0, y: 1 }, 'y', 10, 5);
          expect(opacity.up).toBeFalsy();
        });
      });

      describe('should set down opacity', () => {
        it('to true when y is within one page of end', () => {
          const opacity = wrapper.instance().setOpacity({ x: 0, y: 5 }, 'y', 10, 5);
          expect(opacity.down).toBeTruthy();
        });

        it('to false when y is not', () => {
          const opacity = wrapper.instance().setOpacity({ x: 0, y: 1 }, 'y', 10, 5);
          expect(opacity.down).toBeFalsy();
        });
      });
    });

    describe('set position', () => {
      it('when horizontal', () => {
        const height = {};
        const width = {
          wrapper: 500,
        };
        const position = wrapper.instance().setPosition('horizontal', height, width);
        expect(position).toEqual({ bottom: -5, right: 237, transform: 'rotate(-90deg)' });
      });

      it('when vertical', () => {
        const height = {
          heatmap: 400,
          wrapper: 500,
        };
        const width = {
          wrapper: 500,
        };
        const position = wrapper.instance().setPosition('vertical', height, width);
        expect(position).toEqual({ bottom: 0, right: 202, transform: null });
      });
    });

    describe('change position', () => {
      beforeAll(() => {
        wrapper.setProps({
          position: { x: 0, y: 0 },
        });
        wrapper.setState({
          length: 20,
          page: 10,
          vertex: 'y',
        });
      });

      it('should call updatePosition method when within bounds', () => {
        wrapper.instance().changePosition(1);
        expect(updatePosition).toHaveBeenCalledWith(0, 1);
      });

      it('should call updatePosition method when beyond lower bound', () => {
        wrapper.instance().changePosition(-1);
        expect(updatePosition).toHaveBeenCalledWith(0, 0);
      });

      it('should call updatePosition method when beyond upper bound', () => {
        wrapper.instance().changePosition(11);
        expect(updatePosition).toHaveBeenCalledWith(0, 10);
      });
    });

    it('resize end should call updateAll method', () => {
      const spy = jest.spyOn(wrapper.instance(), 'updateAll');
      wrapper.update();
      wrapper.instance().resizeEnd();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    describe('update arrow container', () => {
      beforeAll(() => {
        wrapper.setState({
          length: 100,
          page: 10,
          vertex: 'y',
        });
        wrapper.instance().updateAll({
          dimension: { pageY: 20 },
          direction: 'vertical',
          height: { heatmap: 600, wrapper: 700 },
          position: { x: 50, y: 50 },
          width: { wrapper: 800 },
        });
      });

      it('and sets arrow opacity', () => {
        expect(wrapper.state('arrowOpacity')).toEqual({ down: false, up: false });
      });

      it('and sets arrow container position', () => {
        const elPosition = {
          bottom: 0,
          right: 52,
          transform: null,
        };
        expect(wrapper.state('elPosition')).toEqual(elPosition);
      });

      it('and sets page length', () => {
        expect(wrapper.state('page')).toBe(20);
      });

      it('and sets show state', () => {
        expect(wrapper.state('show')).toBeTruthy();
      });
    });

    describe('on props change', () => {
      const arrowOpacity = { down: false, up: false };
      const elPosition = {
        bottom: 0,
        right: 202,
        transform: null,
      };

      beforeAll(() => {
        wrapper.setProps({
          dimension: {
            pageY: 10,
          },
          height: {
            heatmap: 400,
            wrapper: 500,
          },
          position: {
            x: 1,
            y: 1,
          },
          width: { wrapper: 500 },
        });
        wrapper.setState({
          arrowOpacity,
          elPosition,
          page: 10,
          pageType: 'pageY',
        });
      });

      describe('check height and width', () => {
        it('and does not change container position when height and width are the same', () => {
          wrapper.setProps({
            height: {
              heatmap: 400,
              wrapper: 500,
            },
          });
          expect(wrapper.state('elPosition')).toEqual(elPosition);
        });

        it('and does change container position when height changes', () => {
          wrapper.setProps({
            height: {
              heatmap: 350,
              wrapper: 400,
            },
          });
          expect(wrapper.state('elPosition')).not.toEqual(elPosition);
        });

        it('and does change container position when width changes', () => {
          wrapper.setProps({
            width: {
              wrapper: 400,
            },
          });
          expect(wrapper.state('elPosition')).not.toEqual(elPosition);
        });
      });

      describe('check opacity', () => {
        it('and does not change container position stays the same', () => {
          wrapper.setProps({
            position: {
              x: 1,
              y: 1,
            },
          });
          expect(wrapper.state('arrowOpacity')).toEqual({ down: false, up: false });
        });

        it('and does change container position change', () => {
          wrapper.setProps({
            position: {
              x: 0,
              y: 0,
            },
          });
          expect(wrapper.state('arrowOpacity')).toEqual({ down: false, up: true });
        });
      });

      describe('check page size', () => {
        it('and does not change page size when dimension stays the same', () => {
          wrapper.setProps({
            dimension: {
              pageY: 10,
            },
          });
          expect(wrapper.state('page')).toBe(10);
        });

        it('and does change page size when dimension changes', () => {
          wrapper.setProps({
            dimension: {
              pageY: 20,
            },
          });
          expect(wrapper.state('page')).toBe(20);
        });
      });
    });
  });

  describe('with horizontal arrows', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <ArrowsContainer
          dimension={{
            columns: 10,
            pageX: 5,
            pageY: 10,
            rows: 20,
          }}
          direction="horizontal"
          height={{
            heatmap: 400,
            wrapper: 500,
          }}
          position={{
            x: 0,
            y: 0,
          }}
          show
          updatePosition={updatePosition}
          width={{
            wrapper: 500,
          }}
        />,
      );
    });

    describe('sets initial state', () => {
      it('and sets arrow opacity', () => {
        expect(wrapper.state('arrowOpacity')).toEqual({ down: false, up: true });
      });

      it('and sets arrow container position', () => {
        const elPosition = {
          bottom: -5,
          right: 237,
          transform: 'rotate(-90deg)',
        };
        expect(wrapper.state('elPosition')).toEqual(elPosition);
      });

      it('and sets heatmap width', () => {
        expect(wrapper.state('length')).toBe(10);
      });

      it('and sets page width', () => {
        expect(wrapper.state('page')).toBe(5);
      });

      it('and sets page type', () => {
        expect(wrapper.state('pageType')).toBe('pageX');
      });

      it('and sets vertex', () => {
        expect(wrapper.state('vertex')).toBe('x');
      });
    });
  });

  describe('on mounting', () => {
    let onResizeFn;
    let spyAdd;
    let spyRemove;
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <ArrowsContainer
          dimension={{
            columns: 10,
            pageX: 5,
            pageY: 10,
            rows: 20,
          }}
          direction="vertical"
          height={{
            heatmap: 400,
            wrapper: 500,
          }}
          position={{
            x: 0,
            y: 0,
          }}
          show
          updatePosition={updatePosition}
          width={{
            wrapper: 500,
          }}
        />,
      );
      onResizeFn = wrapper.instance().onResize;
      wrapper.instance().onResize = jest.fn();
      spyAdd = jest.spyOn(window, 'addEventListener');
      spyRemove = jest.spyOn(window, 'removeEventListener');
      wrapper.update();
      wrapper.unmount();
      wrapper.mount();
    });

    afterAll(() => {
      spyAdd.mockRestore();
      spyRemove.mockRestore();
      wrapper.instance().onResize = onResizeFn;
    });

    it('should add resize event listener', () => {
      expect(spyAdd).toHaveBeenCalledWith('resize', wrapper.instance().onResize);
    });

    it('should remove resize event listener', () => {
      const { onResize } = wrapper.instance();
      wrapper.unmount();
      expect(spyRemove).toHaveBeenCalledWith('resize', onResize);
    });
  });
});
