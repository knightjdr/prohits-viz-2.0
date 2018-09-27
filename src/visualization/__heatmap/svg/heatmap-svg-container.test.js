import React from 'react';
import { mount } from 'enzyme';

import onResizeModule from '../../../helpers/on-resize';
import renderDims from './heatmap-svg-container';

jest.mock('../../../helpers/on-resize');

const props = {
  columns: {
    names: ['a', 'b', 'c'],
    ref: null,
  },
  display: {
    plotFixed: false,
    plotTranslate: 0,
  },
  panel: false,
  renderProp: dimProps => <div ref={dimProps.setContainerRef} />,
  rowNames: ['x', 'y', 'z'],
  setDims: jest.fn(),
  setRef: jest.fn(),
  setSelectedGenes: jest.fn(),
  settings: {
    cellSize: 10,
  },
  sort: jest.fn(),
  updatePlotXY: jest.fn(),
  updateID: null,
};

describe('Svg container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      renderDims(props),
    );
  });

  describe('on mounting', () => {
    let onResizeFn;
    let spyAdd;
    let spyRemove;

    beforeAll(() => {
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
      wrapper.mount();
      wrapper.instance().onResize = onResizeFn;
    });

    it('should add resize event listener', () => {
      expect(spyAdd).toHaveBeenCalledWith('resize', wrapper.instance().onResize);
    });

    it('should remove resize event listener on unmount', () => {
      const { onResize } = wrapper.instance();
      wrapper.unmount();
      expect(spyRemove).toHaveBeenCalledWith('resize', onResize);
    });
  });

  describe('recieving props', () => {
    let updateDimensionsSpy;
    let updateTranslateSpy;

    afterAll(() => {
      updateDimensionsSpy.mockRestore();
      updateTranslateSpy.mockRestore();
      wrapper.update();
    });

    beforeAll(() => {
      updateDimensionsSpy = jest.spyOn(wrapper.instance(), 'updateDimensions');
      updateTranslateSpy = jest.spyOn(wrapper.instance(), 'updateTranslate');
      wrapper.update();
      wrapper.setProps(props);
    });

    it('should update dimensions', () => {
      expect(updateDimensionsSpy).toHaveBeenCalled();
    });

    it('should update translation', () => {
      expect(updateTranslateSpy).toHaveBeenCalled();
    });
  });

  it('should call resize method', () => {
    wrapper.instance().onResize();
    expect(onResizeModule).toHaveBeenCalled();
  });

  describe('set dimensions', () => {
    let calculateHeightFn;
    let calculateHeightSpy;
    let calculateWidthFn;
    let calculateWidthSpy;
    const height = {
      heatmap: 100,
      pageY: 10,
      rows: 20,
    };
    let setTranslateFn;
    let setTranslateSpy;
    const width = {
      arrowsX: false,
      columns: 20,
      heatmap: 200,
      pageX: 10,
    };

    afterAll(() => {
      calculateHeightSpy.mockRestore();
      calculateWidthSpy.mockRestore();
      setTranslateSpy.mockRestore();
      wrapper.instance().calculateHeight = calculateHeightFn;
      wrapper.instance().calculateWidth = calculateWidthFn;
      wrapper.instance().setTranslate = setTranslateFn;
      wrapper.update();
    });

    beforeAll(() => {
      calculateHeightFn = wrapper.instance().calculateHeight;
      calculateWidthFn = wrapper.instance().calculateWidth;
      setTranslateFn = wrapper.instance().setTranslate;
      wrapper.instance().calculateHeight = jest.fn().mockReturnValue(height);
      wrapper.instance().calculateWidth = jest.fn().mockReturnValue(width);
      wrapper.instance().setTranslate = jest.fn().mockReturnValue({});
      calculateHeightSpy = jest.spyOn(wrapper.instance(), 'calculateHeight');
      calculateWidthSpy = jest.spyOn(wrapper.instance(), 'calculateWidth');
      setTranslateSpy = jest.spyOn(wrapper.instance(), 'setTranslate');
      wrapper.update();
      props.setDims.mockClear();
      wrapper.instance().setDimensions(10, props.columns, false, props.rowNames, props.display);
    });

    it('should calculate height', () => {
      expect(calculateHeightSpy).toHaveBeenCalledWith(10, props.rowNames, false);
    });

    it('should calculate width', () => {
      expect(calculateWidthSpy).toHaveBeenCalledWith(10, props.columns);
    });

    it('should calculate translation', () => {
      expect(setTranslateSpy).toHaveBeenCalledWith(props.display, false, width);
    });

    it('should set dimensions', () => {
      expect(props.setDims).toHaveBeenCalledWith(20, 20, 10, 10, 100, 200);
    });

    it('should udpate plot', () => {
      expect(props.updatePlotXY).toHaveBeenCalledWith(false, {});
    });

    it('should set state', () => {
      expect(wrapper.state('height')).toEqual(height);
      expect(wrapper.state('showSvg')).toBeTruthy();
      expect(wrapper.state('width')).toEqual(width);
    });
  });

  describe('set translation', () => {
    /* Window width with JSDOM is 1024 */
    it('should return translation when plot is fixed', () => {
      const display = {
        plotFixed: true,
        plotTranslate: 0,
      };
      const width = {
        canTranslate: false,
        wrapper: 424,
      };
      expect(wrapper.instance().setTranslate(display, false, width)).toBe(-280);
    });

    describe('plot not fixed and panel visible', () => {
      it('should return translation when available width is greater than panel', () => {
        const display = {
          plotFixed: false,
          plotTranslate: 0,
        };
        const width = {
          canTranslate: true,
          wrapper: 424,
        };
        expect(wrapper.instance().setTranslate(display, true, width)).toBe(-200);
      });

      it('should return translation when available width is less than panel', () => {
        const display = {
          plotFixed: false,
          plotTranslate: 0,
        };
        const width = {
          canTranslate: true,
          wrapper: 824,
        };
        expect(wrapper.instance().setTranslate(display, true, width)).toBe(-80);
      });
    });
  });

  describe('calculate height', () => {
    it('should return height values when all rows fit within page', () => {
      const wrapperRef = {
        current: {
          getBoundingClientRect: () => ({
            height: 200,
          }),
        },
      };
      wrapper.instance().wrapperRef = wrapperRef;
      const expected = {
        arrowsY: false,
        heatmap: 30,
        pageY: 3,
        rows: 3,
        wrapper: 132,
      };
      expect(wrapper.instance().calculateHeight(10, props.rowNames, false)).toEqual(expected);
    });

    it('should return height values when all rows do not fit within page', () => {
      const wrapperRef = {
        current: {
          getBoundingClientRect: () => ({
            height: 140,
          }),
        },
      };
      wrapper.instance().wrapperRef = wrapperRef;
      const expected = {
        arrowsY: true,
        heatmap: 20,
        pageY: 2,
        rows: 3,
        wrapper: 120,
      };
      expect(wrapper.instance().calculateHeight(10, props.rowNames, false)).toEqual(expected);
    });

    it('should return height values when extra padding is available', () => {
      const wrapperRef = {
        current: {
          getBoundingClientRect: () => ({
            height: 170,
          }),
        },
      };
      wrapper.instance().wrapperRef = wrapperRef;
      const expected = {
        arrowsY: true,
        heatmap: 20,
        pageY: 2,
        rows: 3,
        wrapper: 120,
      };
      expect(wrapper.instance().calculateHeight(10, props.rowNames, true)).toEqual(expected);
    });
  });
});
