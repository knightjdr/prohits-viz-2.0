import React from 'react';
import { shallow } from 'enzyme';

import TrimText from '../helpers/trim-text';
import { RowsContainer } from './heatmap-svg__rows-container';

jest.mock('../helpers/trim-text');
TrimText.mockImplementation(text => ({ original: text, text, trimmed: false }));

describe('Heatmap row container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <RowsContainer
        cellSize={15}
        handleClick={jest.fn()}
        openContextMenu={jest.fn()}
        pageHeight={3}
        position={0}
        rows={['a', 'b', 'c']}
        search={{
          match: false,
          rows: {},
          text: null,
        }}
        sortID={0}
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
        pageHeight: 3,
        position: 0,
        rows: ['a', 'b', 'c'],
        search: {
          columns: {},
          match: false,
          term: null,
        },
        sortID: 0,
      };
      wrapper.setProps(originalProps);
      const newProps = {
        cellSize: 20,
        pageHeight: 2,
        position: 1,
        rows: ['a', 'b', 'c'],
        search: {
          columns: { b: true },
          match: true,
          term: 'b',
        },
        sortID: 1,
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
      pageHeight: 3,
      position: 0,
      search: {
        columns: {},
        match: false,
        term: null,
      },
      sortID: 0,
    };

    beforeAll(() => {
      wrapper.setProps(originalProps);
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

    it('should return true when pageHeight changes', () => {
      let newProps = {
        ...originalProps,
        pageHeight: 3,
      };
      expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeFalsy();
      newProps = {
        ...originalProps,
        pageHeight: 2,
      };
      expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeTruthy();
    });

    it('should return true when y position changes', () => {
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

    it('should return true when there is a new sort order', () => {
      let newProps = {
        ...originalProps,
        sortID: 0,
      };
      expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeFalsy();
      newProps = {
        ...originalProps,
        sortID: 1,
      };
      expect(wrapper.instance().shouldComponentUpdate(newProps)).toBeTruthy();
    });
  });

  it('getPage method should splice an array of rows based on current page size', () => {
    expect(wrapper.instance().getPage(['a', 'b', 'c'], 1, 2)).toEqual(['b', 'c']);
  });

  describe('checkRowSize method', () => {
    let trimmedColumns;

    beforeAll(() => {
      TrimText.mockClear();
      trimmedColumns = wrapper.instance().checkRowSize(['a', 'b', 'c'], 16);
    });

    it('should called TrimText method for each array item', () => {
      expect(TrimText).toHaveBeenCalledTimes(3);
    });

    it('should map the rows array to an array of objects with text to display', () => {
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

  describe('update methods', () => {
    let checkRowSizeOriginal;
    let fontSizeOriginal;
    let getPageOriginal;

    beforeAll(() => {
      checkRowSizeOriginal = wrapper.instance().checkRowSize;
      wrapper.instance().checkRowSize = jest.fn();
      fontSizeOriginal = wrapper.instance().fontSize;
      wrapper.instance().fontSize = jest.fn().mockReturnValue(10);
      getPageOriginal = wrapper.instance().getPage;
      wrapper.instance().getPage = jest.fn();
      wrapper.update();
    });

    afterAll(() => {
      wrapper.instance().checkRowSize = checkRowSizeOriginal;
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
        wrapper.instance().checkRowSize.mockClear();
        wrapper.instance().fontSize.mockClear();
        wrapper.instance().updateFontSize(20, 15, []);
        expect(wrapper.instance().fontSize).toHaveBeenCalled();
        expect(wrapper.instance().checkRowSize).toHaveBeenCalled();
      });
    });

    describe('updatePage', () => {
      it('should not update when position, page and sort id remain the same', () => {
        wrapper.instance().checkRowSize.mockClear();
        wrapper.instance().updatePage(0, 0, 3, 3, 0, 0, []);
        expect(wrapper.instance().checkRowSize).not.toHaveBeenCalled();
      });

      it('should update when y position changes', () => {
        wrapper.instance().checkRowSize.mockClear();
        wrapper.instance().updatePage(0, 1, 3, 3, 0, 0, []);
        expect(wrapper.instance().checkRowSize).toHaveBeenCalled();
      });

      it('should update when page size changes', () => {
        wrapper.instance().checkRowSize.mockClear();
        wrapper.instance().updatePage(0, 0, 3, 2, 0, 0, []);
        expect(wrapper.instance().checkRowSize).toHaveBeenCalled();
      });

      it('should update when sort id changes', () => {
        wrapper.instance().checkRowSize.mockClear();
        wrapper.instance().updatePage(0, 0, 3, 3, 0, 1, []);
        expect(wrapper.instance().checkRowSize).toHaveBeenCalled();
      });
    });
  });
});
