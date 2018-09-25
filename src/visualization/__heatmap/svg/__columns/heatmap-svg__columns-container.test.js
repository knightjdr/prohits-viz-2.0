import React from 'react';
import { shallow } from 'enzyme';

import TrimText from '../helpers/trim-text';
import { ColumnsContainer } from './heatmap-svg__columns-container';

jest.mock('../helpers/trim-text');
TrimText.mockImplementation(text => ({ original: text, text, trimmed: false }));

const openContextMenu = jest.fn();

describe('Heatmap column container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <ColumnsContainer
        cellSize={15}
        columns={{
          names: ['a', 'b', 'c'],
          ref: null,
        }}
        handleClick={jest.fn()}
        openContextMenu={openContextMenu}
        pageWidth={3}
        position={0}
        search={{
          columns: {},
          match: false,
          text: null,
        }}
        toggleTooltip={jest.fn()}
      />,
    );
  });

  describe('initial state', () => {
    it('should set font size', () => {
      expect(wrapper.state('fontSize')).toBe(9);
    });

    it('should set page names', () => {
      const expectedArr = [
        { original: 'a', text: 'a', trimmed: false },
        { original: 'b', text: 'b', trimmed: false },
        { original: 'c', text: 'c', trimmed: false },
      ];
      expect(wrapper.state('names')).toEqual(expectedArr);
    });
  });

  describe('should update when props change', () => {
    beforeAll(() => {
      const originalProps = {
        cellSize: 15,
        columns: {
          names: ['a', 'b', 'c'],
          ref: null,
        },
        pageWidth: 3,
        position: 0,
        search: {
          columns: {},
          match: false,
          term: null,
        },
      };
      wrapper.setProps(originalProps);
      const newProps = {
        cellSize: 20,
        columns: {
          names: ['a', 'b', 'c'],
          ref: 'a',
        },
        pageWidth: 2,
        position: 1,
        search: {
          columns: { b: true },
          match: true,
          term: 'b',
        },
      };
      wrapper.setProps(newProps);
    });

    it('should update fontSize', () => {
      expect(wrapper.state('fontSize')).toBe(12);
    });

    it('should set page names', () => {
      const expectedArr = [
        { original: 'b', text: 'b', trimmed: false },
        { original: 'c', text: 'c', trimmed: false },
      ];
      expect(wrapper.state('names')).toEqual(expectedArr);
    });
  });

  describe('shouldComponentUpdate', () => {
    const originalProps = {
      cellSize: 15,
      columns: {
        names: ['a', 'b', 'c'],
        ref: null,
      },
      pageWidth: 3,
      position: 0,
      search: {
        columns: {},
        match: false,
        term: null,
      },
      updateID: 0,
    };

    beforeAll(() => {
      wrapper.setProps(originalProps);
    });

    it('should return true when updateID changes', () => {
      let newProps = {
        ...originalProps,
        updateID: 0,
      };
      expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeFalsy();
      newProps = {
        ...originalProps,
        updateID: 1,
      };
      expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeTruthy();
    });

    it('should return true when cellSize changes', () => {
      let newProps = {
        ...originalProps,
        cellSize: 15,
      };
      expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeFalsy();
      newProps = {
        ...originalProps,
        cellSize: 20,
      };
      expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeTruthy();
    });

    it('should return true when column reference changes', () => {
      let newProps = {
        ...originalProps,
        columns: {
          names: ['a', 'b', 'c'],
          ref: null,
        },
      };
      expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeFalsy();
      newProps = {
        ...originalProps,
        columns: {
          names: ['a', 'b', 'c'],
          ref: 'a',
        },
      };
      expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeTruthy();
    });

    it('should return true when pageWidth changes', () => {
      let newProps = {
        ...originalProps,
        pageWidth: 3,
      };
      expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeFalsy();
      newProps = {
        ...originalProps,
        pageWidth: 2,
      };
      expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeTruthy();
    });

    it('should return true when position changes', () => {
      let newProps = {
        ...originalProps,
        position: 0,
      };
      expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeFalsy();
      newProps = {
        ...originalProps,
        position: 1,
      };
      expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeTruthy();
    });

    it('should return true when there is a new search match', () => {
      let newProps = {
        ...originalProps,
        search: {
          columns: {},
          match: false,
          term: null,
        },
      };
      expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeFalsy();
      newProps = {
        ...originalProps,
        search: {
          columns: {},
          match: true,
          term: 'a',
        },
      };
      expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeTruthy();
    });
  });

  it('getPage method should splice an array of columns based on current page size', () => {
    expect(wrapper.instance().getPage(['a', 'b', 'c'], 1, 2)).toEqual(['b', 'c']);
  });

  describe('checkColumnSize method', () => {
    let trimmedColumns;

    beforeAll(() => {
      TrimText.mockClear();
      trimmedColumns = wrapper.instance().checkColumnSize(['a', 'b', 'c'], 16);
    });

    it('should called TrimText method for each array item', () => {
      expect(TrimText).toHaveBeenCalledTimes(3);
    });

    it('should map the columns array to an array of objects with text to display', () => {
      const expectedArr = [
        { original: 'a', text: 'a', trimmed: false },
        { original: 'b', text: 'b', trimmed: false },
        { original: 'c', text: 'c', trimmed: false },
      ];
      expect(trimmedColumns).toEqual(expectedArr);
    });
  });

  it('fontSize method should set the fontsize based on the current cell size', () => {
    expect(wrapper.instance().fontSize(20)).toEqual(12);
  });

  it('should open menu', () => {
    openContextMenu.mockClear();
    wrapper.instance().openMenu({}, 'a');
    expect(openContextMenu).toHaveBeenCalledWith({}, 'a', 'column');
  });

  describe('update methods', () => {
    let checkColumnSizeOriginal;
    let fontSizeOriginal;
    let getPageOriginal;

    beforeAll(() => {
      checkColumnSizeOriginal = wrapper.instance().checkColumnSize;
      wrapper.instance().checkColumnSize = jest.fn();
      fontSizeOriginal = wrapper.instance().fontSize;
      wrapper.instance().fontSize = jest.fn().mockReturnValue(10);
      getPageOriginal = wrapper.instance().getPage;
      wrapper.instance().getPage = jest.fn();
      wrapper.update();
    });

    afterAll(() => {
      wrapper.instance().checkColumnSize = checkColumnSizeOriginal;
      wrapper.instance().fontSize = fontSizeOriginal;
      wrapper.instance().getPage = getPageOriginal;
      wrapper.update();
    });

    describe('fontSize', () => {
      it('should not update when cell size does not change', () => {
        wrapper.instance().fontSize.mockClear();
        wrapper.instance().updateFontSize(15, 15, []);
        expect(wrapper.instance().fontSize).not.toHaveBeenCalled();
      });

      it('should update when cell size does change', () => {
        wrapper.instance().checkColumnSize.mockClear();
        wrapper.instance().fontSize.mockClear();
        wrapper.instance().updateFontSize(20, 15, []);
        expect(wrapper.instance().fontSize).toHaveBeenCalled();
        expect(wrapper.instance().checkColumnSize).toHaveBeenCalled();
      });
    });

    describe('updatePage', () => {
      it('should not update when position, page and updateID remain the same', () => {
        wrapper.instance().checkColumnSize.mockClear();
        wrapper.instance().updatePage(0, 0, 3, 3, 0, 0, []);
        expect(wrapper.instance().checkColumnSize).not.toHaveBeenCalled();
      });

      it('should update when x position changes', () => {
        wrapper.instance().checkColumnSize.mockClear();
        wrapper.instance().updatePage(0, 1, 3, 3, 0, 0, []);
        expect(wrapper.instance().checkColumnSize).toHaveBeenCalled();
      });

      it('should update when page size changes', () => {
        wrapper.instance().checkColumnSize.mockClear();
        wrapper.instance().updatePage(0, 0, 3, 2, 0, 0, []);
        expect(wrapper.instance().checkColumnSize).toHaveBeenCalled();
      });

      it('should update when udpateID changes', () => {
        wrapper.instance().checkColumnSize.mockClear();
        wrapper.instance().updatePage(0, 0, 3, 3, 0, 1, []);
        expect(wrapper.instance().checkColumnSize).toHaveBeenCalled();
      });
    });
  });
});
