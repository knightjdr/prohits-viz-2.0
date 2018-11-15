import React from 'react';
import { shallow } from 'enzyme';

import { OverlayContainer } from './heatmap-svg__overlay-container';

const addMarkerBox = jest.fn();
const setSelectedGenes = jest.fn();

const columns = {
  names: ['a', 'b', 'c', 'd', 'e'],
};
const dimensions = {
  height: 100,
  pageX: 10,
  pageY: 10,
  width: 100,
};
const markers = {
  record: false,
};
const position = {
  x: 0,
  y: 0,
};
const rows = ['u', 'w', 'x', 'y', 'z'];

const { addEventListener, removeEventListener } = window;

beforeAll(() => {
  Object.defineProperty(window, 'addEventListener', { value: jest.fn(), writable: true });
  Object.defineProperty(window, 'removeEventListener', { value: jest.fn(), writable: true });
});

afterAll(() => {
  window.addEventListener = addEventListener;
  window.removeEventListener = removeEventListener;
});

describe('Overlay container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <OverlayContainer
        addMarkerBox={addMarkerBox}
        cellSize={20}
        columns={columns}
        dimensions={dimensions}
        markers={markers}
        position={position}
        rows={rows}
        setSelectedGenes={setSelectedGenes}
        showSelectionbox
      />,
    );
    wrapper.instance().gElementRef = {
      current: {
        getBoundingClientRect: () => ({
          left: 10,
          top: 20,
        }),
      },
    };
  });

  describe('when recieving props', () => {
    let spy;

    afterAll(() => {
      spy.mockRestore();
      wrapper.update();
    });

    beforeAll(() => {
      spy = jest.spyOn(wrapper.instance(), 'updateOverlay');
      wrapper.update();
      wrapper.setProps({});
    });

    it('should call update annotations', () => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should return left and top boundary via getBoundary', () => {
    expect(wrapper.instance().getBoundary()).toEqual({ x: 10, y: 20 });
  });

  describe('adding marker', () => {
    beforeAll(() => {
      wrapper.instance().startPosition = { x: 5, y: 10 };
    });

    it('should not add marker when record is false', () => {
      addMarkerBox.mockClear();
      wrapper.instance().addMarker(20, 20, position, false, 40);
      expect(addMarkerBox).not.toHaveBeenCalled();
    });

    it('should not add marker when record is false', () => {
      addMarkerBox.mockClear();
      wrapper.instance().addMarker(20, 20, position, true, 40);
      expect(addMarkerBox).toHaveBeenCalledWith(1, 2, 0.25, 0.5);
    });
  });

  describe('setting x or y mouse move coordinate', () => {
    it('should return start coordinate when start postion is smaller than current', () => {
      const current = { x: 50 };
      const start = { x: 20 };
      expect(wrapper.instance().coordinate('x', current, start)).toBe(20);
    });

    it('should return current coordinate when start postion is larger than current', () => {
      const current = { x: 30 };
      const start = { x: 50 };
      expect(wrapper.instance().coordinate('x', current, start)).toBe(30);
    });

    it('should return 0 when current postion is less than 0', () => {
      const current = { x: -10 };
      const start = { x: 20 };
      expect(wrapper.instance().coordinate('x', current, start)).toBe(0);
    });
  });

  describe('overlay height and width when moving mouse', () => {
    beforeAll(() => {
      wrapper.setProps({
        cellSize: 20,
        dimensions,
      });
    });

    describe('position within boundaries', () => {
      it('should return height when start postion is smaller than current', () => {
        const current = { x: 50 };
        const start = { x: 20 };
        expect(wrapper.instance().dimension('x', 'pageX', current, start)).toBe(30);
      });

      it('should return height when start postion is larger than current', () => {
        const current = { x: 50 };
        const start = { x: 80 };
        expect(wrapper.instance().dimension('x', 'pageX', current, start)).toBe(30);
      });
    });

    describe('position outside boundaries', () => {
      it('should return height when current position below bottom boundary', () => {
        const current = { x: -10 };
        const start = { x: 20 };
        expect(wrapper.instance().dimension('x', 'pageX', current, start)).toBe(20);
      });

      it('should return height when current position beyond upper boundary', () => {
        const current = { x: 220 };
        const start = { x: 20 };
        expect(wrapper.instance().dimension('x', 'pageX', current, start)).toBe(180);
      });
    });
  });

  describe('mouse move', () => {
    let spy;

    afterAll(() => {
      spy.mockRestore();
      wrapper.update();
    });

    beforeAll(() => {
      spy = jest.spyOn(wrapper.instance(), 'overlayMouseMove');
      wrapper.update();
      wrapper.instance().boundary = { x: 0, y: 0 };
      wrapper.instance().startPosition = { x: 5, y: 10 };
    });

    it('should not call overlay move method when not dragging', () => {
      wrapper.instance().dragging = false;
      wrapper.instance().handleMouseMove({});
      expect(spy).not.toHaveBeenCalled();
    });

    it('should call overlay move method when dragging', () => {
      wrapper.instance().dragging = true;
      wrapper.instance().handleMouseMove({});
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('mouse up', () => {
    let spy;

    afterAll(() => {
      spy.mockRestore();
      wrapper.update();
    });

    beforeAll(() => {
      spy = jest.spyOn(wrapper.instance(), 'overlayMouseUp');
      wrapper.update();
    });

    describe('when not dragging', () => {
      it('should not call overlay up method when not dragging', () => {
        wrapper.instance().dragging = false;
        wrapper.instance().handleMouseUp({});
        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('when dragging', () => {
      beforeAll(() => {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
        wrapper.instance().dragging = true;
        wrapper.instance().handleMouseUp({});
      });

      it('should set dragging to false', () => {
        expect(wrapper.instance().dragging).toBeFalsy();
      });

      it('should call overlay up method when dragging', () => {
        expect(spy).toHaveBeenCalled();
      });

      it('should remove mousemove event listener', () => {
        expect(window.removeEventListener).toHaveBeenCalledWith('mousemove', wrapper.instance().handleMouseMove);
      });

      it('should remove mouseup event listener', () => {
        expect(window.removeEventListener).toHaveBeenCalledWith('mouseup', wrapper.instance().handleMouseUp);
      });
    });
  });

  describe('mouse down', () => {
    beforeAll(() => {
      window.addEventListener.mockClear();
      window.removeEventListener.mockClear();
      wrapper.instance().handleMouseDown({ clientX: 15, clientY: 40 });
    });

    it('should add mousemove event listener', () => {
      expect(window.addEventListener).toHaveBeenCalledWith('mousemove', wrapper.instance().handleMouseMove);
    });

    it('should add mouseup event listener', () => {
      expect(window.addEventListener).toHaveBeenCalledWith('mouseup', wrapper.instance().handleMouseUp);
    });

    it('should set boundary', () => {
      expect(wrapper.instance().boundary).toEqual({ x: 10, y: 20 });
    });

    it('should set dragging', () => {
      expect(wrapper.instance().dragging).toBeTruthy();
    });

    it('should set start position', () => {
      expect(wrapper.instance().startPosition).toEqual({ x: 0, y: 20 });
    });

    it('should set cursor', () => {
      expect(wrapper.state('cursor')).toBe('crosshair');
    });

    it('should set marker', () => {
      const expected = {
        height: 0,
        left: 0,
        show: true,
        top: 0,
        width: 0,
      };
      expect(wrapper.state('marker')).toEqual(expected);
    });
  });

  describe('limit x and y pos', () => {
    it('should return 0 when below 0', () => {
      expect(wrapper.instance().limitPos(-1, 20, 5)).toBe(0);
    });

    it('should return cellsize * dimension when above', () => {
      expect(wrapper.instance().limitPos(101, 20, 5)).toBe(100);
    });

    it('should return position when within limits', () => {
      expect(wrapper.instance().limitPos(50, 20, 5)).toBe(50);
    });
  });

  describe('nearest cell', () => {
    let returnValue;
    let spy;

    afterAll(() => {
      spy.mockRestore();
      wrapper.update();
    });

    beforeAll(() => {
      spy = jest.spyOn(wrapper.instance(), 'limitPos');
      wrapper.update();
      wrapper.instance().boundary = { x: 0, y: 0 };
      returnValue = wrapper.instance().nearestCell(40, 60, 20, dimensions);
    });

    it('should call limit pos twice', () => {
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should round to nearest cell', () => {
      expect(returnValue).toEqual({ x: 40, y: 60 });
    });
  });

  describe('overlay mouse move', () => {
    describe('when mouse position is after start position', () => {
      beforeAll(() => {
        wrapper.instance().boundary = { x: 0, y: 0 };
        wrapper.instance().startPosition = { x: 10, y: 20 };
        wrapper.instance().overlayMouseMove({ clientX: 20, clientY: 50 });
      });

      it('should set marker state', () => {
        const expected = {
          height: 30,
          show: true,
          x: 10,
          y: 20,
          width: 10,
        };
        expect(wrapper.state('marker')).toEqual(expected);
      });
    });

    describe('when mouse position is befire start position', () => {
      beforeAll(() => {
        wrapper.instance().boundary = { x: 0, y: 0 };
        wrapper.instance().startPosition = { x: 10, y: 20 };
        wrapper.instance().overlayMouseMove({ clientX: 5, clientY: 10 });
      });

      it('should set marker state', () => {
        const expected = {
          height: 10,
          show: true,
          x: 5,
          y: 10,
          width: 5,
        };
        expect(wrapper.state('marker')).toEqual(expected);
      });
    });
  });

  describe('overlay mouse up', () => {
    let markerSpy;
    let selectSpy;

    afterAll(() => {
      markerSpy.mockRestore();
      selectSpy.mockRestore();
      wrapper.update();
    });

    beforeAll(() => {
      wrapper.instance().boundary = { x: 0, y: 0 };
      wrapper.instance().startPosition = { x: 60, y: 60 };
      markerSpy = jest.spyOn(wrapper.instance(), 'addMarker');
      selectSpy = jest.spyOn(wrapper.instance(), 'selectMarkerGenes');
      wrapper.update();
    });

    describe('when the selection box has no height', () => {
      beforeAll(() => {
        markerSpy.mockClear();
        selectSpy.mockClear();
        wrapper.instance().overlayMouseUp({ clientX: 60, clientY: 100 });
      });

      it('should not call add marker', () => {
        expect(markerSpy).not.toHaveBeenCalled();
      });

      it('should not call add marker', () => {
        expect(selectSpy).not.toHaveBeenCalled();
      });

      it('should reset marker state', () => {
        const expected = {
          height: 0,
          show: false,
          width: 0,
          x: 0,
          y: 0,
        };
        expect(wrapper.state('marker')).toEqual(expected);
      });
    });

    describe('when the selection box has no width', () => {
      beforeAll(() => {
        markerSpy.mockClear();
        selectSpy.mockClear();
        wrapper.instance().overlayMouseUp({ clientX: 100, clientY: 60 });
      });

      it('should not call add marker', () => {
        expect(markerSpy).not.toHaveBeenCalled();
      });

      it('should not call add marker', () => {
        expect(selectSpy).not.toHaveBeenCalled();
      });

      it('should reset marker state', () => {
        const expected = {
          height: 0,
          show: false,
          width: 0,
          x: 0,
          y: 0,
        };
        expect(wrapper.state('marker')).toEqual(expected);
      });
    });

    describe('when the selection box has height and width', () => {
      beforeAll(() => {
        markerSpy.mockClear();
        selectSpy.mockClear();
        wrapper.instance().overlayMouseUp({ clientX: 100, clientY: 100 });
      });

      it('should not call add marker', () => {
        expect(markerSpy).toHaveBeenCalled();
      });

      it('should not call add marker', () => {
        expect(selectSpy).toHaveBeenCalled();
      });

      it('should reset marker state', () => {
        const expected = {
          height: 40,
          show: true,
          width: 40,
          x: 60,
          y: 60,
        };
        expect(wrapper.state('marker')).toEqual(expected);
      });
    });

    describe('when the selection box has height and width but ends below start', () => {
      beforeAll(() => {
        markerSpy.mockClear();
        selectSpy.mockClear();
        wrapper.instance().overlayMouseUp({ clientX: 0, clientY: 0 });
      });

      it('should not call add marker', () => {
        expect(markerSpy).toHaveBeenCalled();
      });

      it('should not call add marker', () => {
        expect(selectSpy).toHaveBeenCalled();
      });

      it('should reset marker state', () => {
        const expected = {
          height: 60,
          show: true,
          width: 60,
          x: 0,
          y: 0,
        };
        expect(wrapper.state('marker')).toEqual(expected);
      });
    });
  });

  it('should call set selected genes', () => {
    wrapper.instance().selectMarkerGenes(
      'rows',
      'rowsSelected',
      10,
      ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
      10,
      2,
      50,
      'rowMap',
    );
    expect(setSelectedGenes).toHaveBeenCalledWith(['d', 'e', 'f', 'g', 'h'], 'rows', 'rowsSelected', true, 'rowMap');
  });

  describe('update overlay', () => {
    const defaultState = {
      height: 0,
      show: false,
      x: 0,
      y: 0,
      width: 0,
    };

    const startingState = {
      height: 10,
      show: true,
      x: 0,
      y: 0,
      width: 10,
    };

    it('should not update when props do not change', () => {
      wrapper.setState({ marker: startingState });
      const nextProps = {
        dimensions,
        position,
      };
      wrapper.instance().updateOverlay(nextProps, dimensions, position);
      expect(wrapper.state('marker')).toEqual(startingState);
    });

    it('should update when X page size changes', () => {
      wrapper.setState({ marker: startingState });
      const nextProps = {
        dimensions: {
          ...dimensions,
          pageX: 6,
        },
        position,
      };
      wrapper.instance().updateOverlay(nextProps, dimensions, position);
      expect(wrapper.state('marker')).toEqual(defaultState);
    });

    it('should update when Y page size changes', () => {
      wrapper.setState({ marker: startingState });
      const nextProps = {
        dimensions: {
          ...dimensions,
          pageY: 6,
        },
        position,
      };
      wrapper.instance().updateOverlay(nextProps, dimensions, position);
      expect(wrapper.state('marker')).toEqual(defaultState);
    });

    it('should update when x position changes', () => {
      const nextProps = {
        dimensions,
        position: {
          ...position,
          x: 1,
        },
      };
      wrapper.instance().updateOverlay(nextProps, dimensions, position);
      expect(wrapper.state('marker')).toEqual(defaultState);
    });

    it('should update when x position changes', () => {
      const nextProps = {
        dimensions,
        position: {
          ...position,
          y: 1,
        },
      };
      wrapper.instance().updateOverlay(nextProps, dimensions, position);
      expect(wrapper.state('marker')).toEqual(defaultState);
    });
  });
});
