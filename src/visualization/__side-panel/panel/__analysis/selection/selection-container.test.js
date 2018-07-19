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

const storeSelections = jest.fn();

describe('Gene select', () => {
  beforeEach(() => {
    /* Clear call count */
    storeSelections.mockClear();
  });

  it('should set state from props on mount', () => {
    const wrapper = shallow(
      <SelectionContainer
        genes={genes}
        storeSelections={storeSelections}
      />,
    );
    expect(wrapper.state('columns')).toEqual(genes.columns);
    expect(wrapper.state('columnsSelected')).toEqual(genes.columnsSelected);
    expect(wrapper.state('rows')).toEqual(genes.rows);
    expect(wrapper.state('rowsSelected')).toEqual(genes.rowsSelected);
  });

  it('should store column and row state on unmount via prop method', () => {
    const wrapper = shallow(
      <SelectionContainer
        genes={genes}
        storeSelections={storeSelections}
      />,
    );
    const unMountSpy = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
    wrapper.update();
    wrapper.unmount();
    expect(storeSelections).toHaveBeenCalledTimes(1);
    expect(storeSelections).toHaveBeenCalledWith({
      columns: genes.columns,
      columnsSelected: genes.columnsSelected,
      rows: genes.rows,
      rowsSelected: genes.rowsSelected,
    });
    unMountSpy.mockRestore();
  });

  it('should move columns up selected list, i.e. lower index, when arrange method is passed -1', () => {
    const wrapper = shallow(
      <SelectionContainer
        genes={genes}
        storeSelections={storeSelections}
      />,
    );

    // Test moving first item.
    wrapper.setState({
      columnsSelected: ['a', 'b', 'c'],
      columnsSelectedHighlighted: ['a'],
    });
    wrapper.instance().arrangeSelected('columnsSelected', -1);
    expect(wrapper.state('columnsSelected')).toEqual(['a', 'b', 'c']);

    // Test moving one item.
    wrapper.setState({
      columnsSelected: ['a', 'b', 'c'],
      columnsSelectedHighlighted: ['b'],
    });
    wrapper.instance().arrangeSelected('columnsSelected', -1);
    expect(wrapper.state('columnsSelected')).toEqual(['b', 'a', 'c']);

    // Test moving two items.
    wrapper.setState({
      columnsSelected: ['a', 'b', 'c'],
      columnsSelectedHighlighted: ['b', 'c'],
    });
    wrapper.instance().arrangeSelected('columnsSelected', -1);
    expect(wrapper.state('columnsSelected')).toEqual(['b', 'c', 'a']);
  });

  it('should move columns down selected list, i.e. higher index, when arrange method is passed 1', () => {
    const wrapper = shallow(
      <SelectionContainer
        genes={genes}
        storeSelections={storeSelections}
      />,
    );

    // Test moving last item.
    wrapper.setState({
      columnsSelected: ['a', 'b', 'c'],
      columnsSelectedHighlighted: ['c'],
    });
    wrapper.instance().arrangeSelected('columnsSelected', 1);
    expect(wrapper.state('columnsSelected')).toEqual(['a', 'b', 'c']);

    // Test moving one item.
    wrapper.setState({
      columnsSelected: ['a', 'b', 'c'],
      columnsSelectedHighlighted: ['b'],
    });
    wrapper.instance().arrangeSelected('columnsSelected', 1);
    expect(wrapper.state('columnsSelected')).toEqual(['a', 'c', 'b']);

    // Test moving two items.
    wrapper.setState({
      columnsSelected: ['a', 'b', 'c'],
      columnsSelectedHighlighted: ['a', 'b'],
    });
    wrapper.instance().arrangeSelected('columnsSelected', 1);
    expect(wrapper.state('columnsSelected')).toEqual(['c', 'a', 'b']);
  });

  it('should close context menu', () => {
    const wrapper = shallow(
      <SelectionContainer
        genes={genes}
        storeSelections={storeSelections}
      />,
    );
    wrapper.setState({ showContext: true });
    expect(wrapper.state('showContext')).toBeTruthy();
    wrapper.instance().closeContextMenu();
    expect(wrapper.state('showContext')).toBeFalsy();
  });

  it('should copy all list items to clipboard', () => {
    const wrapper = shallow(
      <SelectionContainer
        genes={genes}
        storeSelections={storeSelections}
      />,
    );
    const closeContextSpy = jest.spyOn(wrapper.instance(), 'closeContextMenu');
    wrapper.update();

    // Test when list has values for copying.
    wrapper.setState({
      contextTarget: 'columns',
    });
    wrapper.instance().copyAll();
    expect(CopyToClipboard).toHaveBeenCalledWith('a\r\nb\r\nc');
    expect(closeContextSpy).toHaveBeenCalledTimes(1);

    // Test when list has no values for copying.
    CopyToClipboard.mockClear();
    closeContextSpy.mockClear();
    wrapper.setState({
      contextTarget: 'columnsSelected',
    });
    wrapper.instance().copyAll();
    expect(CopyToClipboard).not.toHaveBeenCalled();
    expect(closeContextSpy).toHaveBeenCalledTimes(1);
    closeContextSpy.mockRestore();
  });

  it('should copy selected list items to clipboard', () => {
    const wrapper = shallow(
      <SelectionContainer
        genes={genes}
        storeSelections={storeSelections}
      />,
    );
    const closeContextSpy = jest.spyOn(wrapper.instance(), 'closeContextMenu');
    wrapper.update();

    // Test when list has values for copying.
    wrapper.setState({
      contextTarget: 'columns',
      columnsHighlighted: ['b', 'c'],
    });
    wrapper.instance().copySelected();
    expect(CopyToClipboard).toHaveBeenCalledWith('b\r\nc');
    expect(closeContextSpy).toHaveBeenCalledTimes(1);

    // Test when list has no values for copying.
    CopyToClipboard.mockClear();
    closeContextSpy.mockClear();
    wrapper.setState({
      contextTarget: 'columns',
      columnsHighlighted: [],
    });
    wrapper.instance().copySelected();
    expect(CopyToClipboard).not.toHaveBeenCalled();
    expect(closeContextSpy).toHaveBeenCalledTimes(1);
    closeContextSpy.mockRestore();
  });

  it('should put selected options into highlighed list', () => {
    const wrapper = shallow(
      <SelectionContainer
        genes={genes}
        storeSelections={storeSelections}
      />,
    );
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

  it('should swap highlighted items between lists without sorting', () => {
    const wrapper = shallow(
      <SelectionContainer
        genes={genes}
        storeSelections={storeSelections}
      />,
    );
    wrapper.setState({
      columns: ['a', 'c'],
      columnsHighlighted: ['a', 'c'],
      columnsSelected: ['b'],
    });
    wrapper.instance().listSwap('columns', 'columnsSelected', false);
    expect(wrapper.state('columns')).toEqual([]);
    expect(wrapper.state('columnsHighlighted')).toEqual([]);
    expect(wrapper.state('columnsSelected')).toEqual(['b', 'a', 'c']);
  });

  it('should swap highlighted items between lists with sorting', () => {
    const wrapper = shallow(
      <SelectionContainer
        genes={genes}
        storeSelections={storeSelections}
      />,
    );
    wrapper.setState({
      columns: ['a', 'c'],
      columnsSelectedHighlighted: ['b'],
      columnsSelected: ['b'],
    });
    wrapper.instance().listSwap('columnsSelected', 'columns', true, 'columnMap');
    expect(wrapper.state('columns')).toEqual(['a', 'b', 'c']);
    expect(wrapper.state('columnsSelectedHighlighted')).toEqual([]);
    expect(wrapper.state('columnsSelected')).toEqual([]);
  });

  it('should open context menu at cursor position', () => {
    const wrapper = shallow(
      <SelectionContainer
        genes={genes}
        storeSelections={storeSelections}
      />,
    );
    wrapper.instance().elementRef = {
      current: {
        getBoundingClientRect: () => ({
          left: 500,
          top: 500,
        }),
      },
    };
    wrapper.update();

    // When click event is far enough away from right side of panel.
    let fakeEvent = {
      clientX: 600,
      clientY: 600,
      preventDefault: () => {},
    };
    wrapper.instance().openContextMenu(fakeEvent, false, 'columns');
    expect(wrapper.state('canPasteContext')).toBeFalsy();
    expect(wrapper.state('contextPos')).toEqual({ left: 100, top: 100 });
    expect(wrapper.state('contextTarget')).toBe('columns');
    expect(wrapper.state('showContext')).toBeTruthy();

    // When click event is too close right side of panel.
    fakeEvent = {
      clientX: 750,
      clientY: 600,
      preventDefault: () => {},
    };
    wrapper.instance().openContextMenu(fakeEvent, false, 'columns');
    expect(wrapper.state('canPasteContext')).toBeFalsy();
    expect(wrapper.state('contextPos')).toEqual({ left: 210, top: 100 });
    expect(wrapper.state('contextTarget')).toBe('columns');
    expect(wrapper.state('showContext')).toBeTruthy();
  });

  it('should append paste items to end of list, removing duplicates and missing values', () => {
    const wrapper = shallow(
      <SelectionContainer
        genes={genes}
        storeSelections={storeSelections}
      />,
    );
    wrapper.setState({
      contextTarget: 'columnsSelected',
      columns: ['a', 'c'],
      columnsSelected: ['b'],
      pasteText: 'a,c,b,a,d',
      showModal: true,
    });
    wrapper.instance().pasteAppend();
    expect(wrapper.state('columns')).toEqual([]);
    expect(wrapper.state('columnsSelected')).toEqual(['b', 'a', 'c']);
    expect(wrapper.state('pasteText')).toBe('');
    expect(wrapper.state('pasteType')).toBeNull();
    expect(wrapper.state('showModal')).toBeFalsy();
  });

  it('should append paste items and replace list, removing duplicates and missing values', () => {
    const wrapper = shallow(
      <SelectionContainer
        genes={genes}
        storeSelections={storeSelections}
      />,
    );
    wrapper.setState({
      contextTarget: 'columnsSelected',
      columns: ['a', 'c'],
      columnsSelected: ['b'],
      pasteText: 'a,c,a,d',
      showModal: true,
    });
    wrapper.instance().pasteReplace();
    expect(wrapper.state('columns')).toEqual(['b']);
    expect(wrapper.state('columnsSelected')).toEqual(['a', 'c']);
    expect(wrapper.state('pasteText')).toBe('');
    expect(wrapper.state('pasteType')).toBeNull();
    expect(wrapper.state('showModal')).toBeFalsy();

    // Ensure replaced items return to list in sorted order
    wrapper.setState({
      contextTarget: 'columnsSelected',
      columns: ['a'],
      columnsSelected: ['c', 'b'],
      pasteText: 'a,a,d',
      showModal: true,
    });
    wrapper.instance().pasteReplace();
    expect(wrapper.state('columns')).toEqual(['b', 'c']);
    expect(wrapper.state('columnsSelected')).toEqual(['a']);
  });

  it('should not add/paste items when there is no text to paste', () => {
    const wrapper = shallow(
      <SelectionContainer
        genes={genes}
        storeSelections={storeSelections}
      />,
    );
    wrapper.setState({
      pasteText: '',
      pasteType: 'pasteAppend',
      showModal: true,
    });
    wrapper.instance().paste();
    expect(wrapper.state('pasteType')).toBeNull();
    expect(wrapper.state('showModal')).toBeFalsy();
  });

  it('should add/paste items to end of list', () => {
    const wrapper = shallow(
      <SelectionContainer
        genes={genes}
        storeSelections={storeSelections}
      />,
    );
    wrapper.setState({
      contextTarget: 'columnsSelected',
      columns: ['a', 'c'],
      columnsSelected: ['b'],
      pasteText: 'a,c',
      pasteType: 'pasteAppend',
      showModal: true,
    });
    wrapper.instance().paste();
    expect(wrapper.state('columns')).toEqual([]);
    expect(wrapper.state('columnsSelected')).toEqual(['b', 'a', 'c']);
    expect(wrapper.state('pasteText')).toBe('');
    expect(wrapper.state('pasteType')).toBeNull();
    expect(wrapper.state('showModal')).toBeFalsy();
  });

  it('should add/paste items and replace list', () => {
    const wrapper = shallow(
      <SelectionContainer
        genes={genes}
        storeSelections={storeSelections}
      />,
    );
    wrapper.setState({
      contextTarget: 'columnsSelected',
      columns: ['a', 'c'],
      columnsSelected: ['b'],
      pasteText: 'a,c',
      pasteType: 'pasteReplace',
      showModal: true,
    });
    wrapper.instance().paste();
    expect(wrapper.state('columns')).toEqual(['b']);
    expect(wrapper.state('columnsSelected')).toEqual(['a', 'c']);
    expect(wrapper.state('pasteText')).toBe('');
    expect(wrapper.state('pasteType')).toBeNull();
    expect(wrapper.state('showModal')).toBeFalsy();
  });

  it('should toggle modal', () => {
    const wrapper = shallow(
      <SelectionContainer
        genes={genes}
        storeSelections={storeSelections}
      />,
    );
    wrapper.setState({
      pasteText: 'abc',
      pasteType: null,
      showContext: true,
      showModal: false,
    });
    wrapper.instance().toggleModal('pasteAppend');
    expect(wrapper.state('pasteText')).toBe('');
    expect(wrapper.state('pasteType')).toBe('pasteAppend');
    expect(wrapper.state('showContext')).toBeFalsy();
    expect(wrapper.state('showModal')).toBeTruthy();
  });

  it('should update paste list', () => {
    const wrapper = shallow(
      <SelectionContainer
        genes={genes}
        storeSelections={storeSelections}
      />,
    );
    const fakeEvent = {
      target: {
        value: 'a, b\t c',
      },
    };
    wrapper.instance().updatePasteList(fakeEvent);
    expect(wrapper.state('pasteText')).toBe('a, b\t c');
  });
});
