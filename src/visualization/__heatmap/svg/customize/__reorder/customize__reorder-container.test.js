import React from 'react';
import { shallow } from 'enzyme';

import ReorderContainer from './customize__reorder-container';
import setFontSize from '../../font-size/font-size';

jest.mock('../../font-size/font-size');
setFontSize.mockReturnValue(12);

const reorder = jest.fn();

describe('Customize reorder container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <ReorderContainer
        cellSize={20}
        columnNames={['a', 'b', 'c', 'd', 'e']}
        dimensions={{
          pageX: 5,
          pageY: 5,
        }}
        position={{
          x: 0,
          y: 0,
        }}
        reorder={reorder}
        rowNames={['v', 'w', 'x', 'y', 'z']}
        show
      />);
  });

  describe('on mounting', () => {
    it('should set font size', () => {
      expect(wrapper.state('fontSize')).toBe(12);
    });

    it('should set column dimensions', () => {
      const expectedDimenions = {
        height: 100,
        width: 100,
      };
      expect(wrapper.state('column')).toEqual(expectedDimenions);
    });

    it('should set row dimensions', () => {
      const expectedDimenions = {
        height: 100,
        width: 100,
      };
      expect(wrapper.state('row')).toEqual(expectedDimenions);
    });
  });

  describe('prop change', () => {
    let spyDimensions;
    let spyFontSize;

    afterAll(() => {
      spyDimensions.mockRestore();
      spyFontSize.mockRestore();
    });

    beforeAll(() => {
      spyDimensions = jest.spyOn(wrapper.instance(), 'updateDimensions');
      spyFontSize = jest.spyOn(wrapper.instance(), 'updateFontSize');
      wrapper.update();
      wrapper.setProps({});
    });

    it('should call update dimensions method', () => {
      expect(spyDimensions).toHaveBeenCalled();
    });

    it('should call update font size method', () => {
      expect(spyFontSize).toHaveBeenCalled();
    });
  });

  describe('get index of hovered column/row', () => {
    const dimensions = { pageX: 10, pageY: 15 };

    it('should return column index', () => {
      const index = wrapper.instance().getIndex(20, dimensions, 150, 'col');
      expect(index).toBe(2);
    });

    it('should return row index', () => {
      const index = wrapper.instance().getIndex(20, dimensions, 350, 'row');
      expect(index).toBe(12);
    });
  });

  describe('hovered lines', () => {
    const dimensions = { pageX: 10, pageY: 15 };
    it('should hovered column line', () => {
      const expectedLine = {
        a: {
          x1: 120,
          x2: 120,
          y1: 100,
          y2: 400,
        },
        b: {
          x1: 140,
          x2: 140,
          y1: 100,
          y2: 400,
        },
      };
      expect(wrapper.instance().setColumnLine(20, dimensions, 1)).toEqual(expectedLine);
    });

    it('should hovered row line', () => {
      const expectedLine = {
        a: {
          x1: 100,
          x2: 300,
          y1: 140,
          y2: 140,
        },
        b: {
          x1: 100,
          x2: 300,
          y1: 160,
          y2: 160,
        },
      };
      expect(wrapper.instance().setRowLine(20, dimensions, 2)).toEqual(expectedLine);
    });
  });

  it('should set container dimensions', () => {
    const dimensions = { pageX: 10, pageY: 15 };
    const expectedDimensions = {
      column: {
        height: 100,
        width: 200,
      },
      row: {
        height: 300,
        width: 100,
      },
    };
    expect(wrapper.instance().setDimensions(20, dimensions)).toEqual(expectedDimensions);
  });

  describe('mouse down', () => {
    describe('on column', () => {
      beforeAll(() => {
        wrapper.instance().mouseDownColumn({ clientX: 100 }, 2);
      });

      it('should set item values', () => {
        const expected = {
          dropIndex: 2,
          index: 2,
          startX: 100,
          type: 'col',
          x: 100,
        };
        expect(wrapper.instance().selectedItem).toEqual(expected);
      });

      it('should set circle state', () => {
        const expected = {
          radius: 10,
          x: 150,
          y: 10,
        };
        expect(wrapper.state().circle).toEqual(expected);
      });

      it('should set cover item state', () => {
        const expected = {
          height: 100,
          width: 20,
          x: 140,
          y: 0,
        };
        expect(wrapper.state().coverItem).toEqual(expected);
      });

      it('should set line state', () => {
        const expected = {
          a: {
            x1: 140,
            x2: 140,
            y1: 100,
            y2: 200,
          },
          b: {
            x1: 160,
            x2: 160,
            y1: 100,
            y2: 200,
          },
        };
        expect(wrapper.state().lines).toEqual(expected);
      });

      it('should hide icons', () => {
        expect(wrapper.state().showIcons).toBeFalsy();
      });

      it('should set text state', () => {
        const expected = {
          height: 20,
          name: 'c',
          rotation: 90,
          transform: 'translate(-2 -10)',
          width: 80,
          x: 150,
          y: 22,
        };
        expect(wrapper.state().text).toEqual(expected);
      });
    });

    describe('on row', () => {
      beforeAll(() => {
        wrapper.instance().mouseDownRow({ clientY: 50 }, 1);
      });

      it('should set item values', () => {
        const expected = {
          dropIndex: 1,
          index: 1,
          startY: 50,
          type: 'row',
          y: 50,
        };
        expect(wrapper.instance().selectedItem).toEqual(expected);
      });

      it('should set circle state', () => {
        const expected = {
          radius: 10,
          x: 10,
          y: 130,
        };
        expect(wrapper.state().circle).toEqual(expected);
      });

      it('should set cover item state', () => {
        const expected = {
          height: 100,
          width: 20,
          x: 0,
          y: 120,
        };
        expect(wrapper.state().coverItem).toEqual(expected);
      });

      it('should set line state', () => {
        const expected = {
          a: {
            x1: 100,
            x2: 200,
            y1: 120,
            y2: 120,
          },
          b: {
            x1: 100,
            x2: 200,
            y1: 140,
            y2: 140,
          },
        };
        expect(wrapper.state().lines).toEqual(expected);
      });

      it('should hide icons', () => {
        expect(wrapper.state().showIcons).toBeFalsy();
      });

      it('should set text state', () => {
        const expected = {
          height: 20,
          name: 'w',
          rotation: 0,
          transform: 'translate(-2 -10)',
          width: 80,
          x: 22,
          y: 130,
        };
        expect(wrapper.state().text).toEqual(expected);
      });
    });
  });

  describe('mouse move', () => {
    describe('on column with limit', () => {
      beforeAll(() => {
        // this.setState(({ circle, column, text }, { cellSize, dimensions })
        wrapper.setState({
          circle: { radius: 10, x: 100 },
          column: { width: 100 },
          text: { x: 100 },
        });
        wrapper.instance().selectedItem = {
          dropIndex: 0,
          index: 0,
          startX: 100,
          type: 'col',
          x: 100,
        };
        wrapper.instance().mouseMoveColumn({ clientX: 150 });
      });

      it('should update drop index', () => {
        expect(wrapper.instance().selectedItem.dropIndex).toBe(2);
      });

      it('should update circle state', () => {
        const expected = {
          radius: 10,
          x: 150,
        };
        expect(wrapper.state('circle')).toEqual(expected);
      });

      it('should update lines state', () => {
        const expected = {
          a: {
            x1: 140,
            x2: 140,
            y1: 100,
            y2: 200,
          },
          b: {
            x1: 160,
            x2: 160,
            y1: 100,
            y2: 200,
          },
        };
        expect(wrapper.state('lines')).toEqual(expected);
      });

      it('should update text state', () => {
        const expected = {
          x: 150,
        };
        expect(wrapper.state('text')).toEqual(expected);
      });
    });

    describe('on column outside limit', () => {
      beforeAll(() => {
        // this.setState(({ circle, column, text }, { cellSize, dimensions })
        wrapper.setState({
          circle: { radius: 10, x: 100 },
          column: { width: 100 },
          text: { x: 100 },
        });
        wrapper.instance().selectedItem = {
          dropIndex: 0,
          index: 0,
          startX: 100,
          type: 'col',
          x: 100,
        };
        wrapper.instance().mouseMoveColumn({ clientX: 300 });
      });

      it('should set drop index to limit', () => {
        expect(wrapper.instance().selectedItem.dropIndex).toBe(4);
      });

      it('should set text position to limit', () => {
        const expected = {
          x: 190,
        };
        expect(wrapper.state('text')).toEqual(expected);
      });
    });

    describe('on row within limit', () => {
      beforeAll(() => {
        // this.setState(({ circle, column, text }, { cellSize, dimensions })
        wrapper.setState({
          circle: { radius: 10, y: 100 },
          row: { height: 100 },
          text: { y: 100 },
        });
        wrapper.instance().selectedItem = {
          dropIndex: 0,
          index: 0,
          startY: 100,
          type: 'row',
          y: 100,
        };
        wrapper.instance().mouseMoveRow({ clientY: 130 });
      });

      it('should update drop index', () => {
        expect(wrapper.instance().selectedItem.dropIndex).toBe(1);
      });

      it('should update circle state', () => {
        const expected = {
          radius: 10,
          y: 130,
        };
        expect(wrapper.state('circle')).toEqual(expected);
      });

      it('should update lines state', () => {
        const expected = {
          a: {
            x1: 100,
            x2: 200,
            y1: 120,
            y2: 120,
          },
          b: {
            x1: 100,
            x2: 200,
            y1: 140,
            y2: 140,
          },
        };
        expect(wrapper.state('lines')).toEqual(expected);
      });

      it('should update text state', () => {
        const expected = {
          y: 130,
        };
        expect(wrapper.state('text')).toEqual(expected);
      });
    });

    describe('on row outside limit', () => {
      beforeAll(() => {
        // this.setState(({ circle, column, text }, { cellSize, dimensions })
        wrapper.setState({
          circle: { radius: 10, y: 100 },
          row: { height: 100 },
          text: { y: 100 },
        });
        wrapper.instance().selectedItem = {
          dropIndex: 0,
          index: 0,
          startY: 100,
          type: 'row',
          y: 100,
        };
        wrapper.instance().mouseMoveRow({ clientY: 300 });
      });

      it('should set drop index to limit', () => {
        expect(wrapper.instance().selectedItem.dropIndex).toBe(4);
      });

      it('should set text state to limit', () => {
        const expected = {
          y: 190,
        };
        expect(wrapper.state('text')).toEqual(expected);
      });
    });
  });

  describe('mouse up', () => {
    describe('with no selected item', () => {
      beforeAll(() => {
        wrapper.instance().selectedItem = null;
      });

      it('should not call reorder method', () => {
        reorder.mockClear();
        wrapper.instance().mouseUp();
        expect(reorder).not.toHaveBeenCalled();
      });
    });

    describe('when icons are visible', () => {
      beforeAll(() => {
        wrapper.instance().selectedItem = {
          dropIndex: 2,
          index: 1,
          type: 'col',
        };
        wrapper.setState({
          showIcons: true,
        });
      });

      it('should not call reorder method', () => {
        reorder.mockClear();
        wrapper.instance().mouseUp();
        expect(reorder).not.toHaveBeenCalled();
      });
    });

    describe('with selected item and icons are not visible', () => {
      beforeAll(() => {
        wrapper.instance().selectedItem = {
          dropIndex: 2,
          index: 1,
          type: 'col',
        };
        wrapper.setState({
          showIcons: false,
        });
      });

      it('should call reorder method', () => {
        reorder.mockClear();
        wrapper.instance().mouseUp();
        expect(reorder).toHaveBeenCalledWith(1, 2, 'col');
      });

      it('should show icons', () => {
        expect(wrapper.state('showIcons')).toBeTruthy();
      });
    });
  });

  describe('update dimensions', () => {
    let spy;

    afterAll(() => {
      spy.mockRestore();
    });

    beforeAll(() => {
      spy = jest.spyOn(wrapper.instance(), 'setDimensions');
      wrapper.update();
    });

    it('should update when cellSize changes', () => {
      const cellSize = 20;
      const dimensions = {
        pageX: 10,
        pageY: 10,
      };
      spy.mockClear();
      wrapper.instance().updateDimensions({ cellSize, dimensions }, 10, { pageX: 10, pageY: 10 });
      expect(spy).toHaveBeenCalledWith(cellSize, dimensions);
    });

    it('should update when pageX changes', () => {
      const cellSize = 10;
      const dimensions = {
        pageX: 20,
        pageY: 10,
      };
      spy.mockClear();
      wrapper.instance().updateDimensions({ cellSize, dimensions }, 10, { pageX: 10, pageY: 10 });
      expect(spy).toHaveBeenCalledWith(cellSize, dimensions);
    });

    it('should update when pageY changes', () => {
      const cellSize = 10;
      const dimensions = {
        pageX: 10,
        pageY: 20,
      };
      spy.mockClear();
      wrapper.instance().updateDimensions({ cellSize, dimensions }, 10, { pageX: 10, pageY: 10 });
      expect(spy).toHaveBeenCalledWith(cellSize, dimensions);
    });

    it('should not update when nothing changes', () => {
      const cellSize = 10;
      const dimensions = {
        pageX: 10,
        pageY: 10,
      };
      spy.mockClear();
      wrapper.instance().updateDimensions({ cellSize, dimensions }, 10, { pageX: 10, pageY: 10 });
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('update font size', () => {
    it('should update when cellSize changes', () => {
      setFontSize.mockClear();
      wrapper.instance().updateFontSize({ cellSize: 20 }, 10);
      expect(setFontSize).toHaveBeenCalled();
    });

    it('should not update when cellSize does not change', () => {
      setFontSize.mockClear();
      wrapper.instance().updateFontSize({ cellSize: 10 }, 10);
      expect(setFontSize).not.toHaveBeenCalled();
    });
  });
});
