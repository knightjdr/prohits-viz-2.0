import React from 'react';
import { shallow } from 'enzyme';

import CopyToClipboard from '../../../../../helpers/copy-to-clipboard';
import { SelectionContainer } from './selection-container';

jest.mock('../../../../../helpers/copy-to-clipboard');

const genes = {
  columnMap: { a: 0, b: 1, c: 2 },
  columns: ['a', 'b', 'c'],
  columnsSelected: [],
  rowMap: { d: 0, e: 1, f: 1 },
  rows: ['d', 'e', 'f'],
  rowsSelected: [],
};

const setSelections = jest.fn();
const updateGeneList = jest.fn();

describe('Gene select', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <SelectionContainer
        columns={{ names: ['a', 'b', 'c'] }}
        genes={genes}
        position={{ x: 0, y: 0 }}
        rows={['d', 'e', 'f']}
        setSelections={setSelections}
        sortInfo={{ id: 0 }}
        updateGeneList={updateGeneList}
      />,
    );
  });

  it('setHighlighted method should select the indexed item from the arr arg', () =>{
    expect(wrapper.instance().setHighlighted(['a', 'b', 'c'], 2)).toBe('c');
  });

  describe('arrangeSelected', () => {
    beforeAll(() => {
      wrapper.setProps({
        genes: {
          columnMap: { a: 0, b: 1, c: 2 },
          columns: [],
          columnsSelected: ['a', 'b', 'c'],
          rowMap: { d: 0, e: 1, f: 1 },
          rows: ['d', 'e', 'f'],
          rowsSelected: [],
        },
      });
    });

    describe('should move up selected list when index is -1', () => {
      it('and move one item', () => {
        wrapper.setState({
          columnsSelectedHighlighted: ['b'],
        });
        wrapper.instance().arrangeSelected('columnsSelected', -1);
        expect(updateGeneList).toHaveBeenCalledWith({ columnsSelected: ['b', 'a', 'c'] });
      });

      it('but not when first item is highlighted', () => {
        wrapper.setState({
          columnsSelectedHighlighted: ['a'],
        });
        wrapper.instance().arrangeSelected('columnsSelected', -1);
        expect(updateGeneList).toHaveBeenCalledWith({ columnsSelected: ['a', 'b', 'c'] });
      });

      it('and move two items', () => {
        wrapper.setState({
          columnsSelectedHighlighted: ['b', 'c'],
        });
        wrapper.instance().arrangeSelected('columnsSelected', -1);
        expect(updateGeneList).toHaveBeenCalledWith({ columnsSelected: ['b', 'c', 'a'] });
      });
    });

    describe('should move down selected list when index is 1', () => {
      it('and move one item', () => {
        wrapper.setState({
          columnsSelectedHighlighted: ['b'],
        });
        wrapper.instance().arrangeSelected('columnsSelected', 1);
        expect(updateGeneList).toHaveBeenCalledWith({ columnsSelected: ['a', 'c', 'b'] });
      });

      it('but not when last item is highlighted', () => {
        wrapper.setState({
          columnsSelectedHighlighted: ['c'],
        });
        wrapper.instance().arrangeSelected('columnsSelected', 1);
        expect(updateGeneList).toHaveBeenCalledWith({ columnsSelected: ['a', 'b', 'c'] });
      });

      it('and move two items', () => {
        wrapper.setState({
          columnsSelectedHighlighted: ['a', 'b'],
        });
        wrapper.instance().arrangeSelected('columnsSelected', 1);
        expect(updateGeneList).toHaveBeenCalledWith({ columnsSelected: ['c', 'a', 'b'] });
      });
    });
  });

  describe('should close context menu', () => {
    beforeAll(() => {
      wrapper.setState({ showContext: true });
      wrapper.instance().closeContextMenu();
    });

    it('and nullify context event', () => {
      expect(wrapper.state('contextEvent')).toBeNull();
    });

    it('and set show context to false', () => {
      expect(wrapper.state('showContext')).toBeFalsy();
    });
  });

  describe('copy all items to clipboard', () => {
    let spy;

    beforeAll(() => {
      wrapper.setProps({
        genes: {
          columnMap: { a: 0, b: 1, c: 2 },
          columns: ['a', 'b', 'c'],
          columnsSelected: [],
          rowMap: { d: 0, e: 1, f: 1 },
          rows: ['d', 'e', 'f'],
          rowsSelected: [],
        },
      });
      spy = jest.spyOn(wrapper.instance(), 'closeContextMenu');
      wrapper.update();
    });

    afterAll(() => {
      spy.mockRestore();
    });

    describe('when list has items', () => {
      beforeAll(() => {
        wrapper.setState({ contextTarget: 'columns' });
      });

      afterAll(() => {
        CopyToClipboard.mockClear();
        spy.mockClear();
      });

      it('and copies items', () => {
        wrapper.instance().copyAll();
        expect(CopyToClipboard).toHaveBeenCalledWith('a\r\nb\r\nc');
      });

      it('and context menu is closed', () => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when list has no items', () => {
      beforeAll(() => {
        wrapper.setState({ contextTarget: 'columnsSelected' });
        wrapper.instance().copyAll();
      });

      afterAll(() => {
        CopyToClipboard.mockClear();
        spy.mockClear();
      });

      it('and copy items', () => {
        expect(CopyToClipboard).not.toHaveBeenCalled();
      });

      it('and context menu is closed', () => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('copy selected items to clipboard', () => {
    let spy;

    beforeAll(() => {
      wrapper.setProps({
        genes: {
          columnMap: { a: 0, b: 1, c: 2 },
          columns: ['a', 'b', 'c'],
          columnsSelected: [],
          rowMap: { d: 0, e: 1, f: 1 },
          rows: ['d', 'e', 'f'],
          rowsSelected: [],
        },
      });
      spy = jest.spyOn(wrapper.instance(), 'closeContextMenu');
      wrapper.update();
    });

    afterAll(() => {
      spy.mockRestore();
    });

    describe('when list has items', () => {
      beforeAll(() => {
        wrapper.setState({
          contextTarget: 'columns',
          columnsHighlighted: ['b', 'c'],
        });
      });

      afterAll(() => {
        CopyToClipboard.mockClear();
        spy.mockClear();
      });

      it('and copies items', () => {
        wrapper.instance().copySelected();
        expect(CopyToClipboard).toHaveBeenCalledWith('b\r\nc');
      });

      it('and context menu is closed', () => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when list has no items', () => {
      beforeAll(() => {
        wrapper.setState({
          contextTarget: 'columns',
          columnsHighlighted: [],
        });
        wrapper.instance().copySelected();
      });

      afterAll(() => {
        CopyToClipboard.mockClear();
        spy.mockClear();
      });

      it('and copy items', () => {
        expect(CopyToClipboard).not.toHaveBeenCalled();
      });

      it('and context menu is closed', () => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });

  it('listSelect should put selected options into highlighed list', () => {
    const fakeEvent = {
      target: {
        options: [
          { selected: true, value: 'a' },
          { selected: false, value: 'b' },
          { selected: true, value: 'c' },
        ],
      },
    };
    wrapper.instance().listSelect(fakeEvent, 'columns');
    expect(wrapper.state('columnsHighlighted')).toEqual(['a', 'c']);
  });

  describe('listSwap', () => {
    beforeAll(() => {
      wrapper.setProps({
        genes: {
          columnMap: { a: 0, b: 1, c: 2 },
          columns: ['a', 'c'],
          columnsSelected: ['b'],
          rowMap: { d: 0, e: 1, f: 1 },
          rows: ['d', 'e', 'f'],
          rowsSelected: [],
        },
      });
      wrapper.setState({
        columnsHighlighted: ['a', 'c'],
      });
      wrapper.instance().listSwap('columns', 'columnsSelected', false);
    });

    it('should call setSelections prop method', () => {
      expect(setSelections).toHaveBeenCalledWith(['a', 'c'], 'columns', 'columnsSelected', false, false);
    });

    it('should clear highlighted list', () => {
      expect(wrapper.state('columnsHighlighted')).toEqual([]);
    });
  });

  describe('openContextMenu should open context menu at cursor position without paste options', () => {
    beforeAll(() => {
      wrapper.instance().elementRef = {
        current: {
          getBoundingClientRect: () => ({
            left: 500,
            top: 500,
          }),
        },
      };
      wrapper.update();
    });

    describe('when click event is far enough away from right side of panel', () => {
      beforeAll(() => {
        const fakeEvent = {
          clientX: 600,
          clientY: 600,
          preventDefault: () => {},
        };
        wrapper.instance().openContextMenu(fakeEvent, false, 'columns');
      });

      it('should not have paste option', () => {
        expect(wrapper.state('canPasteContext')).toBeFalsy();
      });

      it('should set position', () => {
        expect(wrapper.state('contextEvent')).toEqual({ clientX: 100, clientY: 100 });
      });

      it('should set target', () => {
        expect(wrapper.state('contextTarget')).toBe('columns');
      });

      it('should toggle show state', () => {
        expect(wrapper.state('showContext')).toBeTruthy();
      });
    });

    describe('when click event is too close right side of panel', () => {
      beforeAll(() => {
        const fakeEvent = {
          clientX: 750,
          clientY: 600,
          preventDefault: () => {},
        };
        wrapper.instance().openContextMenu(fakeEvent, false, 'columns');
      });

      it('should set position', () => {
        expect(wrapper.state('contextEvent')).toEqual({ clientX: 250, clientY: 100 });
      });
    });
  });

  describe('should append paste items to end of list and remove duplicates', () => {
    beforeAll(() => {
      wrapper.setProps({
        genes: {
          columnMap: { a: 0, b: 1, c: 2 },
          columns: ['a', 'c'],
          columnsSelected: ['b'],
          rowMap: { d: 0, e: 1, f: 1 },
          rows: ['d', 'e', 'f'],
          rowsSelected: [],
        },
      });
      wrapper.setState({
        contextTarget: 'columnsSelected',
        pasteText: 'a,c,b,a,d',
        pasteType: 'pasteAppend',
        showModal: true,
      });
      wrapper.instance().pasteAppend();
    });

    it('should call set selections prop method', () => {
      expect(setSelections).toHaveBeenCalledWith(
        ['a', 'c', 'b', 'd'],
        'columns',
        'columnsSelected',
        false,
      );
    });

    it('should clear paste text', () => {
      expect(wrapper.state('pasteText')).toBe('');
    });

    it('should nullify pasteType', () => {
      expect(wrapper.state('pasteType')).toBeNull();
    });

    it('should close showModal', () => {
      expect(wrapper.state('showModal')).toBeFalsy();
    });
  });

  describe('should paste and replace items', () => {
    beforeAll(() => {
      wrapper.setProps({
        genes: {
          columnMap: { a: 0, b: 1, c: 2 },
          columns: ['a', 'c'],
          columnsSelected: ['b'],
          rowMap: { d: 0, e: 1, f: 1 },
          rows: ['d', 'e', 'f'],
          rowsSelected: [],
        },
      });
      wrapper.setState({
        contextTarget: 'columnsSelected',
        pasteText: 'a,c',
        pasteType: 'pasteReplace',
        showModal: true,
      });
      wrapper.instance().pasteReplace();
    });

    it('should call set selections prop method', () => {
      expect(setSelections).toHaveBeenCalledWith(
        ['a', 'c'],
        'columns',
        'columnsSelected',
        true,
        'columnMap',
      );
    });

    it('should clear paste text', () => {
      expect(wrapper.state('pasteText')).toBe('');
    });

    it('should nullify pasteType', () => {
      expect(wrapper.state('pasteType')).toBeNull();
    });

    it('should close showModal', () => {
      expect(wrapper.state('showModal')).toBeFalsy();
    });
  });

  describe('should not add/paste items when there is no text to paste', () => {
    let spyAppend;
    let spyReplace;

    beforeAll(() => {
      wrapper.setState({
        pasteText: '',
        pasteType: 'pasteAppend',
        showModal: true,
      });
      spyAppend = jest.spyOn(wrapper.instance(), 'pasteAppend');
      spyReplace = jest.spyOn(wrapper.instance(), 'pasteReplace');
      wrapper.update();
      wrapper.instance().paste();
    });

    afterAll(() => {
      spyAppend.mockRestore();
      spyReplace.mockRestore();
    });

    it('should not call paste append method', () => {
      expect(spyAppend).not.toHaveBeenCalled();
    });

    it('should not call paste replace method', () => {
      expect(spyReplace).not.toHaveBeenCalled();
    });

    it('should nullify pasteType', () => {
      expect(wrapper.state('pasteType')).toBeNull();
    });

    it('should close modal', () => {
      expect(wrapper.state('showModal')).toBeFalsy();
    });
  });

  it('should update paste list', () => {
    const fakeEvent = {
      target: {
        value: 'a, b\t c',
      },
    };
    wrapper.instance().updatePasteList(fakeEvent);
    expect(wrapper.state('pasteText')).toBe('a, b\t c');
  });

  describe('should toggle modal', () => {
    beforeAll(() => {
      wrapper.setState({
        pasteText: 'abc',
        pasteType: null,
        showContext: true,
        showModal: false,
      });
      wrapper.instance().toggleModal('pasteAppend');
    });

    it('and clear paste text', () => {
      expect(wrapper.state('pasteText')).toBe('');
    });

    it('and set paste type', () => {
      expect(wrapper.state('pasteType')).toBe('pasteAppend');
    });

    it('and hide context', () => {
      expect(wrapper.state('showContext')).toBeFalsy();
    });

    it('and show modal', () => {
      expect(wrapper.state('showModal')).toBeTruthy();
    });
  });
});
