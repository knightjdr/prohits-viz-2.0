import React from 'react';
import { mount } from 'enzyme';

import TooltipContainer from './heatmap-svg__tooltips-container';

const cellSize = 10;
const dimensions = {
  height: 100,
  pageX: 10,
  pageY: 10,
  width: 100,
};
const plotTranslate = 100;
const position = {
  x: 0,
  y: 0,
};
const rows = [
  { data: [{ value: 1 }, { value: 2 }, { value: 3 }] },
  { data: [{ value: 4 }, { value: 5 }, { value: 6 }] },
  { data: [{ value: 7 }, { value: 8 }, { value: 9 }] },
  { data: [{ value: 2 }, { value: 3 }, { value: 4 }] },
  { data: [{ value: 5 }, { value: 6 }, { value: 7 }] },
  { data: [{ value: 8 }, { value: 9 }, { value: 9 }] },
  { data: [{ value: 3 }, { value: 4 }, { value: 5 }] },
  { data: [{ value: 6 }, { value: 7 }, { value: 8 }] },
  { data: [{ value: 9 }, { value: 9 }, { value: 9 }] },
  { data: [{ value: 4 }, { value: 5 }, { value: 6 }] },
];
const toggleTooltip = jest.fn();

describe('TooltipContainer', () => {
  let spy;
  let wrapper;

  afterAll(() => {
    spy.mockRestore();
    wrapper.update();
  });

  beforeAll(() => {
    wrapper = mount(
      <TooltipContainer
        cellSize={cellSize}
        dimensions={dimensions}
        plotTranslate={plotTranslate}
        position={position}
        rows={rows}
        showTooltips={false}
        toggleTooltip={toggleTooltip}
      />,
    );
    spy = jest.spyOn(wrapper.instance(), 'getBoundary');
    wrapper.update();
  });

  it('should set boundary on mount', () => {
    expect(wrapper.instance().boundary).toEqual({ x: -100, y: 0 });
  });

  it('should call get boundary with new props', () => {
    spy.mockClear();
    wrapper.setProps({ showTooltips: true });
    expect(spy).toHaveBeenCalledWith(100);
  });

  it('should return left and top boundary via getBoundary', () => {
    expect(wrapper.instance().getBoundary(100)).toEqual({ x: -100, y: 0 });
  });

  it('should hide tooltip', () => {
    toggleTooltip.mockClear();
    wrapper.instance().clearTooltip();
    expect(toggleTooltip).toHaveBeenCalledWith(false);
  });

  describe('format text', () => {
    let text;

    beforeAll(() => {
      const obj = { prop1: 'a', prop2: 'b' };
      text = wrapper.instance().formatText(obj);
    });

    it('should have two divs', () => {
      expect(text.props.children.length).toBe(2);
    });

    it('should have prop as key ', () => {
      expect(text.props.children[0].key).toBe('prop1');
    });

    it('should have key and value as text', () => {
      expect(text.props.children[0].props.children).toEqual(['prop1', ': ', 'a']);
    });
  });

  it('should handle mouse move', () => {
    wrapper.instance().boundary = { x: 0, y: 0 };
    wrapper.instance().handleMouseMove({ clientX: 120, clientY: 70 });
    expect(toggleTooltip).toHaveBeenCalledWith(true, true, expect.anything(), 135, 20);
  });

  it('should return the cell hovered over', () => {
    wrapper.instance().boundary = { x: 0, y: 0 };
    const cell = wrapper.instance().hoveredCell(75, 45, 10, position, dimensions);
    expect(cell).toEqual({ x: 7, y: 4 });
  });

  describe('limit x and y pos', () => {
    it('should return 0 when below 0', () => {
      expect(wrapper.instance().limitPos(-1, 5)).toBe(0);
    });

    it('should return cellsize * dimension when above', () => {
      expect(wrapper.instance().limitPos(6, 5)).toBe(5);
    });

    it('should return position when within limits', () => {
      expect(wrapper.instance().limitPos(4, 5)).toBe(4);
    });
  });
});
