import React from 'react';
import { shallow } from 'enzyme';

import round from '../../../../helpers/round';
import { AnnotationOverlayContainer } from './heatmap-svg__annotation-container';

jest.mock('../../../../helpers/round');

const updateAnnotation = jest.fn();

const annotations = {
  fontSize: 12,
  list: [
    { text: 'a', x: 0.1, y: 0.1 },
    { text: 'b', x: 0.7, y: 0.7 },
  ],
  show: true,
};
const dimensions = {
  columns: 10,
  height: 100,
  pageX: 5,
  pageY: 5,
  rows: 10,
  width: 100,
};
const markers = {
  color: '#fff',
  list: [
    {
      height: 2,
      width: 2,
      x: 1,
      y: 1,
    },
    {
      height: 2,
      width: 2,
      x: 6,
      y: 6,
    },
  ],
  show: true,
};
const position = {
  x: 0,
  y: 0,
};

describe('Annotation overlay container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <AnnotationOverlayContainer
        annotations={annotations}
        cellSize={20}
        dimensions={dimensions}
        markers={markers}
        position={position}
        updateAnnotation={updateAnnotation}
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

  describe('constructor', () => {
    it('should subset annotations', () => {
      const expected = [{
        index: 0,
        text: 'a',
        x: 20,
        y: 20,
      }];
      expect(wrapper.state('annotations')).toEqual(expected);
    });

    it('should subset markers', () => {
      const expected = [{
        height: 40,
        width: 40,
        x: 20,
        y: 20,
      }];
      expect(wrapper.state('markers')).toEqual(expected);
    });
  });

  describe('when recieving props', () => {
    let annotationSpy;
    let markerSpy;

    afterAll(() => {
      annotationSpy.mockRestore();
      markerSpy.mockRestore();
      wrapper.update();
    });

    beforeAll(() => {
      annotationSpy = jest.spyOn(wrapper.instance(), 'updateAnnotations');
      markerSpy = jest.spyOn(wrapper.instance(), 'updateMarkers');
      wrapper.update();
      wrapper.setProps({});
    });

    it('should call update annotations', () => {
      expect(annotationSpy).toHaveBeenCalled();
    });

    it('should call update markers', () => {
      expect(markerSpy).toHaveBeenCalled();
    });
  });

  it('should return left and top boundary via getBoundary', () => {
    expect(wrapper.instance().getBoundary()).toEqual({ x: 10, y: 20 });
  });

  describe('annotation in range', () => {
    it('should return true when annotation is in display range', () => {
      const annotation = { x: 0, y: 0 };
      const xRange = { start: 0, end: 5 };
      const yRange = { start: 0, end: 5 };
      expect(wrapper.instance().annotationInRange(annotation, xRange, yRange)).toBeTruthy();
    });

    it('should return false when annotation is beyond x display range', () => {
      const annotation = { x: 6, y: 0 };
      const xRange = { start: 0, end: 5 };
      const yRange = { start: 0, end: 5 };
      expect(wrapper.instance().annotationInRange(annotation, xRange, yRange)).toBeFalsy();
    });

    it('should return false when annotation is below x display range', () => {
      const annotation = { x: 0, y: 0 };
      const xRange = { start: 1, end: 6 };
      const yRange = { start: 0, end: 5 };
      expect(wrapper.instance().annotationInRange(annotation, xRange, yRange)).toBeFalsy();
    });

    it('should return false when annotation is beyond y display range', () => {
      const annotation = { x: 0, y: 6 };
      const xRange = { start: 0, end: 5 };
      const yRange = { start: 0, end: 5 };
      expect(wrapper.instance().annotationInRange(annotation, xRange, yRange)).toBeFalsy();
    });

    it('should return false when annotation is below y display range', () => {
      const annotation = { x: 0, y: 0 };
      const xRange = { start: 0, end: 5 };
      const yRange = { start: 1, end: 6 };
      expect(wrapper.instance().annotationInRange(annotation, xRange, yRange)).toBeFalsy();
    });
  });

  it('should move an annotation', () => {
    wrapper.instance().boundary = {
      x: 10,
      y: 20,
    };
    wrapper.instance().moveIndex = 0;
    wrapper.instance().annotationMouseMove({ clientX: 20, clientY: 25 });
    const expected = [{
      index: 0,
      text: 'a',
      x: 10,
      y: 5,
    }];
    expect(wrapper.state('annotations')).toEqual(expected);
  });

  describe('mousing up with annotation', () => {
    beforeAll(() => {
      round.mockReturnValue(10);
      updateAnnotation.mockClear();
      const annotation = {
        index: 0,
        text: 'a',
        x: 10,
        y: 5,
      };
      wrapper.instance().annotationMouseUp(annotation, dimensions, position);
    });

    it('should round x position', () => {
      expect(round).toHaveBeenCalledWith(0.05, 2);
    });

    it('should round y position', () => {
      expect(round).toHaveBeenCalledWith(0.025, 2);
    });

    it('should update annotation on mouse up', () => {
      expect(updateAnnotation).toHaveBeenCalledWith(0, 10, 10);
    });
  });

  describe('mousing down', () => {
    beforeAll(() => {
      wrapper.instance().handleMouseDown(0);
    });

    it('should set boundary', () => {
      expect(wrapper.instance().boundary).toEqual({ x: 10, y: 20 });
    });

    it('should set index', () => {
      expect(wrapper.instance().moveIndex).toBe(0);
    });

    it('should set cursor state', () => {
      expect(wrapper.state('cursor')).toBe('pointer');
    });

    it('should set dragging state', () => {
      expect(wrapper.state('dragging')).toBeTruthy();
    });
  });

  describe('mouse move', () => {
    let spy;

    afterAll(() => {
      spy.mockRestore();
      wrapper.update();
    });

    beforeAll(() => {
      spy = jest.spyOn(wrapper.instance(), 'annotationMouseMove');
      wrapper.update();
    });

    it('should not call annotation move method when not dragging', () => {
      wrapper.setState({ dragging: false });
      wrapper.instance().handleMouseMove({});
      expect(spy).not.toHaveBeenCalled();
    });

    it('should call annotation move method when dragging', () => {
      wrapper.setState({ dragging: true });
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
      wrapper.instance().moveIndex = 0;
      spy = jest.spyOn(wrapper.instance(), 'annotationMouseUp');
      wrapper.update();
      wrapper.instance().handleMouseUp();
    });

    it('should call annotation mouse up', () => {
      expect(spy).toHaveBeenCalled();
    });

    it('should reset move index', () => {
      expect(wrapper.instance().moveIndex).toBeNull();
    });

    it('should set dragging state', () => {
      expect(wrapper.state('dragging')).toBeFalsy();
    });
  });

  describe('marker in range', () => {
    it('should return true when marker start is in display range', () => {
      const marker = {
        height: 2,
        width: 2,
        x: 0,
        y: 0,
      };
      const xRange = { start: 0, end: 5 };
      const yRange = { start: 0, end: 5 };
      expect(wrapper.instance().markerInRange(marker, xRange, yRange)).toBeTruthy();
    });

    it('should return false when marker x is beyond display range', () => {
      const marker = {
        height: 2,
        width: 2,
        x: 6,
        y: 0,
      };
      const xRange = { start: 0, end: 5 };
      const yRange = { start: 0, end: 5 };
      expect(wrapper.instance().markerInRange(marker, xRange, yRange)).toBeFalsy();
    });

    it('should return false when marker end x is below display range', () => {
      const marker = {
        height: 2,
        width: 2,
        x: 0,
        y: 0,
      };
      const xRange = { start: 3, end: 7 };
      const yRange = { start: 0, end: 5 };
      expect(wrapper.instance().markerInRange(marker, xRange, yRange)).toBeFalsy();
    });

    it('should return true when marker end is in display range', () => {
      const marker = {
        height: 2,
        width: 2,
        x: 4,
        y: 4,
      };
      const xRange = { start: 5, end: 10 };
      const yRange = { start: 5, end: 10 };
      expect(wrapper.instance().markerInRange(marker, xRange, yRange)).toBeTruthy();
    });

    it('should return false when marker y is beyond display range', () => {
      const marker = {
        height: 2,
        width: 2,
        x: 0,
        y: 6,
      };
      const xRange = { start: 0, end: 5 };
      const yRange = { start: 0, end: 5 };
      expect(wrapper.instance().markerInRange(marker, xRange, yRange)).toBeFalsy();
    });

    it('should return false when marker end y is below display range', () => {
      const marker = {
        height: 2,
        width: 2,
        x: 0,
        y: 0,
      };
      const xRange = { start: 0, end: 5 };
      const yRange = { start: 3, end: 7 };
      expect(wrapper.instance().markerInRange(marker, xRange, yRange)).toBeFalsy();
    });
  });

  it('should subset annotations to only keep those in display range', () => {
    const expected = [{
      index: 0,
      text: 'a',
      x: 20,
      y: 20,
    }];
    const subset = wrapper.instance().subsetAnnotations(annotations.list, dimensions, position);
    expect(subset).toEqual(expected);
  });

  it('should subset markers to only keep those in display range', () => {
    const expected = [{
      height: 40,
      width: 40,
      x: 20,
      y: 20,
    }];
    const subset = wrapper.instance().subsetMarkers(markers.list, 20, dimensions, position);
    expect(subset).toEqual(expected);
  });

  describe('update annotations', () => {
    let spy;

    afterAll(() => {
      spy.mockRestore();
      wrapper.update();
    });

    beforeAll(() => {
      spy = jest.spyOn(wrapper.instance(), 'subsetAnnotations');
      wrapper.update();
    });

    it('should not update when props do not change', () => {
      const nextProps = {
        annotations,
        dimensions,
        position,
      };
      wrapper.instance().updateAnnotations(nextProps, annotations, dimensions, position);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should update annotation number changes', () => {
      spy.mockClear();
      const nextProps = {
        annotations: {
          ...annotations,
          list: [],
        },
        dimensions,
        position,
      };
      wrapper.instance().updateAnnotations(nextProps, annotations, dimensions, position);
      expect(spy).toHaveBeenCalled();
    });

    it('should update when X page size changes', () => {
      spy.mockClear();
      const nextProps = {
        annotations,
        dimensions: {
          ...dimensions,
          pageX: 6,
        },
        position,
      };
      wrapper.instance().updateAnnotations(nextProps, annotations, dimensions, position);
      expect(spy).toHaveBeenCalled();
    });

    it('should update when Y page size changes', () => {
      spy.mockClear();
      const nextProps = {
        annotations,
        dimensions: {
          ...dimensions,
          pageY: 6,
        },
        position,
      };
      wrapper.instance().updateAnnotations(nextProps, annotations, dimensions, position);
      expect(spy).toHaveBeenCalled();
    });

    it('should update when x position changes', () => {
      spy.mockClear();
      const nextProps = {
        annotations,
        dimensions,
        position: {
          ...position,
          x: 1,
        },
      };
      wrapper.instance().updateAnnotations(nextProps, annotations, dimensions, position);
      expect(spy).toHaveBeenCalled();
    });

    it('should update when y position changes', () => {
      spy.mockClear();
      const nextProps = {
        annotations,
        dimensions,
        position: {
          ...position,
          y: 1,
        },
      };
      wrapper.instance().updateAnnotations(nextProps, annotations, dimensions, position);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('update markers', () => {
    let spy;

    afterAll(() => {
      spy.mockRestore();
      wrapper.update();
    });

    beforeAll(() => {
      spy = jest.spyOn(wrapper.instance(), 'subsetMarkers');
      wrapper.update();
    });

    it('should not update when props do not change', () => {
      const nextProps = {
        cellSize: 20,
        markers,
        dimensions,
        position,
      };
      wrapper.instance().updateMarkers(nextProps, 20, markers, dimensions, position);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should update when cell size changes', () => {
      spy.mockClear();
      const nextProps = {
        cellSize: 15,
        markers,
        dimensions,
        position,
      };
      wrapper.instance().updateMarkers(nextProps, 20, markers, dimensions, position);
      expect(spy).toHaveBeenCalled();
    });

    it('should update when annotation number changes', () => {
      spy.mockClear();
      const nextProps = {
        cellSize: 20,
        markers: {
          ...markers,
          list: [],
        },
        dimensions,
        position,
      };
      wrapper.instance().updateMarkers(nextProps, 20, markers, dimensions, position);
      expect(spy).toHaveBeenCalled();
    });

    it('should update when X page size changes', () => {
      spy.mockClear();
      const nextProps = {
        cellSize: 20,
        markers,
        dimensions: {
          ...dimensions,
          pageX: 6,
        },
        position,
      };
      wrapper.instance().updateMarkers(nextProps, 20, markers, dimensions, position);
      expect(spy).toHaveBeenCalled();
    });

    it('should update when Y page size changes', () => {
      spy.mockClear();
      const nextProps = {
        cellSize: 20,
        markers,
        dimensions: {
          ...dimensions,
          pageY: 6,
        },
        position,
      };
      wrapper.instance().updateMarkers(nextProps, 20, markers, dimensions, position);
      expect(spy).toHaveBeenCalled();
    });

    it('should update when x position changes', () => {
      spy.mockClear();
      const nextProps = {
        cellSize: 20,
        markers,
        dimensions,
        position: {
          ...position,
          x: 1,
        },
      };
      wrapper.instance().updateMarkers(nextProps, 20, markers, dimensions, position);
      expect(spy).toHaveBeenCalled();
    });

    it('should update when y position changes', () => {
      spy.mockClear();
      const nextProps = {
        cellSize: 20,
        markers,
        dimensions,
        position: {
          ...position,
          y: 1,
        },
      };
      wrapper.instance().updateMarkers(nextProps, 20, markers, dimensions, position);
      expect(spy).toHaveBeenCalled();
    });
  });
});
