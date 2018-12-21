import React from 'react';
import { mount, shallow } from 'enzyme';

import { FloatMapContainer } from './float-map-container';

jest.mock('../../__side-panel/panel/__map/panel__map-container', () => () => <div />);

const attachMap = jest.fn();
const resetMapPosition = jest.fn();
const updateMapPosition = jest.fn();
const updateMapSize = jest.fn();

describe('Floating minimap container', () => {
  describe('mounting', () => {
    let onResizeFn;
    let spyAdd;
    let spyRemove;
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <FloatMapContainer
          attached={false}
          attachMap={attachMap}
          columns={{ names: ['a', 'b', 'c'] }}
          display={{
            floatMapRight: 20,
            floatMapTop: 100,
            height: 'auto',
            opaque: true,
            visible: true,
            width: 'auto',
          }}
          resetMapPosition={resetMapPosition}
          rows={['x', 'y', 'z']}
          toggleOpacity={jest.fn()}
          toggleVisibility={jest.fn()}
          updateMapPosition={updateMapPosition}
          updateMapSize={updateMapSize}
        />,
      );
      onResizeFn = wrapper.instance().debouncedResize;
      wrapper.instance().debouncedResize = jest.fn();
      spyAdd = jest.spyOn(window, 'addEventListener');
      spyRemove = jest.spyOn(window, 'removeEventListener');
      wrapper.update();
      wrapper.unmount();
      wrapper.mount();
    });

    afterAll(() => {
      spyAdd.mockRestore();
      spyRemove.mockRestore();
      wrapper.instance().debouncedResize = onResizeFn;
    });

    it('should add resize event listener', () => {
      const { debouncedResize } = wrapper.instance();
      expect(spyAdd).toHaveBeenCalledWith('resize', debouncedResize);
    });
  });

  describe('shallow', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <FloatMapContainer
          attached={false}
          attachMap={attachMap}
          columns={{ names: ['a', 'b', 'c'] }}
          display={{
            floatMapRight: 20,
            floatMapTop: 100,
            height: 'auto',
            opaque: true,
            visible: true,
            width: 'auto',
          }}
          resetMapPosition={resetMapPosition}
          rows={['x', 'y', 'z']}
          toggleOpacity={jest.fn()}
          toggleVisibility={jest.fn()}
          updateMapPosition={updateMapPosition}
          updateMapSize={updateMapSize}
        />,
      );
    });

    it('should set image limits via component method', () => {
      const expected = {
        height: {
          max: 708,
          min: 20,
        },
        width: {
          max: 1004,
          min: 200,
        },
      };
      expect(wrapper.instance().setImageLimits()).toEqual(expected);
    });

    it('should set image maximum dimensions via component method', () => {
      const expected = {
        maxHeight: 490,
        maxWidth: 590,
        panelHeight: 'auto',
      };
      expect(wrapper.instance().setImageMax({ height: 500, width: 600 })).toEqual(expected);
    });

    describe('default image dimensions on mount', () => {
      it('should set image maximum dimensions based on columns when window width < 2000', () => {
        const columns = ['a', 'b', 'c', 'd', 'e'];
        const rows = ['x', 'y', 'z'];
        const window = {
          innerHeight: 500,
          innerWidth: 500,
        };
        const expected = {
          maxHeight: 250,
          maxWidth: 250,
          panelHeight: 'auto',
        };
        const actual = wrapper.instance().setInitialImageMax(columns, rows, window);
        expect(actual).toEqual(expected);
      });

      it('should set image maximum dimensions based on columns to 1000 when window width > 2000', () => {
        const columns = ['a', 'b', 'c', 'd', 'e'];
        const rows = ['x', 'y', 'z'];
        const window = {
          innerHeight: 3000,
          innerWidth: 3000,
        };
        const expected = {
          maxHeight: 1000,
          maxWidth: 1000,
          panelHeight: 'auto',
        };
        const actual = wrapper.instance().setInitialImageMax(columns, rows, window);
        expect(actual).toEqual(expected);
      });

      it('should set image maximum dimensions based on rows when window height < 1000', () => {
        const columns = ['x', 'y', 'z'];
        const rows = ['a', 'b', 'c', 'd', 'e'];
        const window = {
          innerHeight: 500,
          innerWidth: 500,
        };
        const expected = {
          maxHeight: 430,
          maxWidth: 430,
          panelHeight: 'auto',
        };
        const actual = wrapper.instance().setInitialImageMax(columns, rows, window);
        expect(actual).toEqual(expected);
      });

      it('should set image maximum dimensions based on rows to 1000 when window height > 1000', () => {
        const columns = ['x', 'y', 'z'];
        const rows = ['a', 'b', 'c', 'd', 'e'];
        const window = {
          innerHeight: 1500,
          innerWidth: 1500,
        };
        const expected = {
          maxHeight: 950,
          maxWidth: 950,
          panelHeight: 'auto',
        };
        const actual = wrapper.instance().setInitialImageMax(columns, rows, window);
        expect(actual).toEqual(expected);
      });
    });

    describe('mouse down', () => {
      beforeAll(() => {
        wrapper.instance().handleMouseDown(50, 50, 500, 500);
      });

      it('should set mouse down state to true', () => {
        expect(wrapper.state('mouseDown')).toBeTruthy();
      });

      it('should set last position', () => {
        const expected = {
          height: 500,
          width: 500,
          x: 50,
          y: 50,
        };
        expect(wrapper.instance().lastPosition).toEqual(expected);
      });
    });

    describe('specific mouse down event', () => {
      let spy;

      beforeAll(() => {
        spy = jest.spyOn(wrapper.instance(), 'handleMouseDown');
        wrapper.update();
      });

      afterAll(() => {
        spy.mockRestore();
      });

      describe('move event', () => {
        beforeAll(() => {
          const event = {
            clientX: 25,
            clientY: 10,
          };
          wrapper.instance().handleMouseDownMove(event);
        });

        it('should set moveType', () => {
          expect(wrapper.instance().moveType).toBe('move');
        });

        it('should call mouse down', () => {
          expect(spy).toHaveBeenCalledWith(25, 10);
        });
      });

      describe('resize event', () => {
        beforeAll(() => {
          wrapper.instance().mapRef.current = {
            clientHeight: 500,
            clientWidth: 500,
          };
          const event = {
            clientX: 55,
            clientY: 30,
          };
          wrapper.instance().handleMouseDownResize(event);
        });

        it('should set moveType', () => {
          expect(wrapper.instance().moveType).toBe('resize');
        });

        it('should call mouse down', () => {
          expect(spy).toHaveBeenCalledWith(55, 30, 500, 500);
        });
      });
    });

    describe('mouse enter', () => {
      it('should set opacity to 1 when panel is opaque', () => {
        wrapper.setProps({ opaque: true });
        wrapper.instance().handleMouseEnter();
        expect(wrapper.state('opacity')).toBe(1);
      });

      it('should not change opacity when panel is not opaque', () => {
        wrapper.setProps({ opaque: false });
        wrapper.setState({ opacity: 0 });
        wrapper.instance().handleMouseEnter();
        expect(wrapper.state('opacity')).toBe(0);
      });
    });

    describe('mouse leave', () => {
      it('should set opacity to 0 when panel is not opaque and mouse is not down', () => {
        wrapper.setProps({ opaque: false });
        wrapper.setState({ mouseDown: false });
        wrapper.instance().handleMouseLeave();
        expect(wrapper.state('opacity')).toBe(0);
      });

      it('should not change opacity when panel is opaque', () => {
        wrapper.setProps({ opaque: true });
        wrapper.setState({ mouseDown: false, opacity: 1 });
        wrapper.instance().handleMouseLeave();
        expect(wrapper.state('opacity')).toBe(1);
      });

      it('should not change opacity when mouse id down', () => {
        wrapper.setProps({ opaque: false });
        wrapper.setState({ mouseDown: true, opacity: 1 });
        wrapper.instance().handleMouseLeave();
        expect(wrapper.state('opacity')).toBe(1);
      });
    });

    describe('mouse move', () => {
      let spyPosition;
      let spyResize;

      beforeAll(() => {
        spyPosition = jest.spyOn(wrapper.instance(), 'mapPosition');
        spyResize = jest.spyOn(wrapper.instance(), 'resizeMap');
        wrapper.update();
      });

      afterAll(() => {
        spyPosition.mockRestore();
        spyResize.mockRestore();
      });

      it('should not call move handler when mouse is not down', () => {
        wrapper.setState({ mouseDown: false });
        const event = {
          clientX: 25,
          clientY: 10,
        };
        wrapper.instance().handleMouseMove(event);
        expect(spyPosition).not.toHaveBeenCalled();
        expect(spyResize).not.toHaveBeenCalled();
      });

      it('should call resize when mouse is down', () => {
        wrapper.setState({ mouseDown: true });
        const event = {
          clientX: 25,
          clientY: 10,
        };
        wrapper.instance().moveType = 'resize';
        wrapper.instance().handleMouseMove(event);
        expect(spyResize).toHaveBeenCalledWith(25, 10);
      });

      it('should call position when mouse is down', () => {
        wrapper.setState({ mouseDown: true });
        const event = {
          clientX: 25,
          clientY: 10,
        };
        wrapper.instance().moveType = 'move';
        wrapper.instance().handleMouseMove(event);
        expect(spyPosition).toHaveBeenCalledWith(25, 10);
      });
    });

    it('handle mouse up should set mouse down state to false', () => {
      wrapper.setState({ mouseDown: true });
      wrapper.instance().handleMouseUp();
      expect(wrapper.state('mouseDown')).toBeFalsy();
    });

    describe('map position', () => {
      beforeAll(() => {
        updateMapPosition.mockClear();
        wrapper.instance().lastPosition = {
          x: 10,
          y: 10,
        };
        wrapper.instance().mapPosition(20, 30);
      });

      it('should call update prop method', () => {
        expect(updateMapPosition).toHaveBeenCalledWith(10, 120);
      });

      it('should update last position', () => {
        expect(wrapper.instance().lastPosition).toEqual({ x: 20, y: 30 });
      });
    });

    describe('reattach', () => {
      beforeAll(() => {
        attachMap.mockClear();
        wrapper.setState({ opacity: 0 });
        wrapper.instance().reattach();
      });

      it('should call attach prop method', () => {
        expect(attachMap).toHaveBeenCalled();
      });

      it('should opacity to 1', () => {
        expect(wrapper.state('opacity')).toBe(1);
      });
    });

    describe('prop events', () => {
      it('should reset when attach state changes to true', () => {
        const currentProps = { attached: false };
        wrapper.setProps(currentProps);
        resetMapPosition.mockClear();
        const nextProps = { attached: true };
        wrapper.setProps(nextProps);
        expect(resetMapPosition).toHaveBeenCalled();
      });

      it('should not reset when attach state changes to false', () => {
        const currentProps = { attached: true };
        wrapper.setProps(currentProps);
        resetMapPosition.mockClear();
        const nextProps = { attached: false };
        wrapper.setProps(nextProps);
        expect(resetMapPosition).not.toHaveBeenCalled();
      });

      it('should not reset when attach state does not change', () => {
        const currentProps = { attached: true };
        wrapper.setProps(currentProps);
        resetMapPosition.mockClear();
        const nextProps = { attached: true };
        wrapper.setProps(nextProps);
        expect(resetMapPosition).not.toHaveBeenCalled();
      });
    });
  });
});
