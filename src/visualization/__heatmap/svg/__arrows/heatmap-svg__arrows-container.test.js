import React from 'react';
import { shallow, mount } from 'enzyme';

import onResizeHelper from '../../../../helpers/on-resize';
import { ArrowsContainer } from './heatmap-svg__arrows-container';

jest.mock('../../../../helpers/on-resize');

const updatePosition = jest.fn();

describe('Heatmap arrows container', () => {
  describe('with vertical arrows', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <ArrowsContainer
          dimensions={{
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
          updateXY={updatePosition}
          width={{
            wrapper: 500,
          }}
        />,
      );
    });

    describe('sets initial state', () => {
      it('should set arrow opacity', () => {
        expect(wrapper.state('arrowOpacity')).toEqual({ down: false, up: true });
      });

      it('should set arrow container position', () => {
        const elPosition = {
          bottom: 10,
          right: 242,
          transform: null,
        };
        expect(wrapper.state('elPosition')).toEqual(elPosition);
      });

      it('should set heatmap length', () => {
        expect(wrapper.state('length')).toBe(20);
      });

      it('should set page length', () => {
        expect(wrapper.state('page')).toBe(10);
      });

      it('should set page type', () => {
        expect(wrapper.state('pageType')).toBe('pageY');
      });

      it('should set vertex', () => {
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
        expect(onResizeHelper).toHaveBeenCalled();
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
      it('should have correction position when horizontal', () => {
        const height = {};
        const width = {
          wrapper: 500,
        };
        const position = wrapper.instance().setPosition('horizontal', height, width);
        expect(position).toEqual({ bottom: 40, right: 282, transform: 'rotate(-90deg)' });
      });

      describe('when vertical', () => {
        it('should have correction position when vertical without offset', () => {
          const height = {
            heatmap: 400,
            wrapper: 500,
          };
          const width = {
            wrapper: 500,
          };
          const position = wrapper.instance().setPosition('vertical', height, width);
          expect(position).toEqual({ bottom: 10, right: 242, transform: null });
        });

        it('should have correction position when vertical with offset', () => {
          const height = {
            heatmap: 400,
            wrapper: 500,
          };
          const width = {
            wrapper: 500,
          };
          const position = wrapper.instance().setPosition('vertical', height, width, true);
          expect(position).toEqual({ bottom: 40, right: 242, transform: null });
        });
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

    describe('update arrow container for vertical arrows', () => {
      beforeAll(() => {
        wrapper.setState({
          length: 100,
          page: 10,
          vertex: 'y',
        });
        wrapper.instance().updateAll({
          dimensions: { pageY: 20, rows: 50 },
          direction: 'vertical',
          height: { heatmap: 600, wrapper: 700 },
          position: { x: 50, y: 50 },
          width: { wrapper: 800 },
        });
      });

      it('should set arrow opacity', () => {
        expect(wrapper.state('arrowOpacity')).toEqual({ down: true, up: false });
      });

      it('should set arrow container position', () => {
        const elPosition = {
          bottom: 10,
          right: 92,
          transform: null,
        };
        expect(wrapper.state('elPosition')).toEqual(elPosition);
      });

      it('should set length', () => {
        expect(wrapper.state('length')).toBe(50);
      });

      it('should set page length', () => {
        expect(wrapper.state('page')).toBe(20);
      });

      it('should set show state', () => {
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
      let spy;

      beforeAll(() => {
        wrapper.setProps({
          dimensions: {
            pageY: 20,
            rows: 20,
          },
          height: {
            heatmap: 400,
            wrapper: 500,
          },
          position: {
            x: 1,
            y: 1,
          },
          updateID: 0,
          width: { wrapper: 500 },
        });
        wrapper.setState({
          arrowOpacity,
          elPosition,
          page: 10,
          pageType: 'pageY',
        });
        spy = jest.spyOn(wrapper.instance(), 'updateAll');
        wrapper.update();
      });

      afterAll(() => {
        spy.mockRestore();
      });

      describe('check height and width', () => {
        it('should not change container position when height and width are the same', () => {
          wrapper.setProps({
            height: {
              heatmap: 400,
              wrapper: 500,
            },
          });
          expect(wrapper.state('elPosition')).toEqual(elPosition);
        });

        it('should change container position when height changes', () => {
          wrapper.setProps({
            height: {
              heatmap: 350,
              wrapper: 400,
            },
          });
          expect(wrapper.state('elPosition')).not.toEqual(elPosition);
        });

        it('should change container position when width changes', () => {
          wrapper.setProps({
            width: {
              wrapper: 400,
            },
          });
          expect(wrapper.state('elPosition')).not.toEqual(elPosition);
        });
      });

      describe('check opacity', () => {
        it('should not change container position stays the same', () => {
          wrapper.setProps({
            position: {
              x: 1,
              y: 1,
            },
          });
          expect(wrapper.state('arrowOpacity')).toEqual({ down: false, up: false });
        });

        it('should change container position change', () => {
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
        it('should not change page size when dimension stays the same', () => {
          wrapper.setProps({
            dimensions: {
              pageY: 10,
              rows: 20,
            },
          });
          expect(wrapper.state('page')).toBe(10);
        });

        it('should change page size when dimension changes', () => {
          wrapper.setProps({
            dimensions: {
              pageY: 20,
              rows: 20,
            },
          });
          expect(wrapper.state('page')).toBe(20);
        });
      });

      describe('check updateID', () => {
        it('should not trigger update all when ID is the same', () => {
          wrapper.setProps({
            updateID: 0,
          });
          expect(spy).not.toHaveBeenCalled();
        });

        it('should trigger update all when ID changes', () => {
          wrapper.setProps({
            updateID: 1,
          });
          expect(spy).toHaveBeenCalled();
        });
      });
    });
  });

  describe('with horizontal arrows', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <ArrowsContainer
          dimensions={{
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
          updateXY={updatePosition}
          width={{
            wrapper: 500,
          }}
        />,
      );
    });

    describe('sets initial state', () => {
      it('should set arrow opacity', () => {
        expect(wrapper.state('arrowOpacity')).toEqual({ down: false, up: true });
      });

      it('should set arrow container position', () => {
        const elPosition = {
          bottom: 40,
          right: 282,
          transform: 'rotate(-90deg)',
        };
        expect(wrapper.state('elPosition')).toEqual(elPosition);
      });

      it('should set heatmap width', () => {
        expect(wrapper.state('length')).toBe(10);
      });

      it('should set page width', () => {
        expect(wrapper.state('page')).toBe(5);
      });

      it('should set page type', () => {
        expect(wrapper.state('pageType')).toBe('pageX');
      });

      it('should set vertex', () => {
        expect(wrapper.state('vertex')).toBe('x');
      });
    });

    describe('update arrow container for horizontal arrows', () => {
      beforeAll(() => {
        wrapper.setState({
          length: 100,
          page: 10,
          vertex: 'x',
        });
        wrapper.instance().updateAll({
          dimensions: { columns: 50, pageX: 20 },
          direction: 'horizontal',
          height: { heatmap: 600, wrapper: 700 },
          position: { x: 50, y: 50 },
          width: { wrapper: 800 },
        });
      });

      it('should set length', () => {
        expect(wrapper.state('length')).toBe(50);
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
          dimensions={{
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
          updateXY={updatePosition}
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
