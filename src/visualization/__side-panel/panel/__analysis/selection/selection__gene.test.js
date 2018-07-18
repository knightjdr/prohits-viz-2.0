import React from 'react';
import { shallow } from 'enzyme';

import Gene from './selection__gene';

const props = {
  columns: ['a', 'b'],
  columnsSelected: ['c'],
  listSelect: jest.fn(),
  openContextMenu: jest.fn(),
  rows: ['e'],
  rowsSelected: ['d', 'f'],
};

const arrangeSelected = jest.fn();
const listSwap = jest.fn();

describe('Gene select', () => {
  beforeEach(() => {
    /* Clear call count */
    arrangeSelected.mockClear();
    listSwap.mockClear();
  });

  it('should render', () => {
    const wrapper = shallow(
      <Gene
        arrangeSelected={arrangeSelected}
        listSwap={listSwap}
        {...props}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should swap columns with columnsSelected on button click', () => {
    const wrapper = shallow(
      <Gene
        arrangeSelected={arrangeSelected}
        listSwap={listSwap}
        {...props}
      />,
    );
    wrapper.find('button').at(0).simulate('click');
    expect(listSwap).toHaveBeenCalledWith('columns', 'columnsSelected', false);
  });

  it('should swap columnsSelected with columns on button click', () => {
    const wrapper = shallow(
      <Gene
        arrangeSelected={arrangeSelected}
        listSwap={listSwap}
        {...props}
      />,
    );
    wrapper.find('button').at(1).simulate('click');
    expect(listSwap).toHaveBeenCalledWith('columnsSelected', 'columns', true, 'columnMap');
  });

  it('should call arrange selected for columns with decrement on button click', () => {
    const wrapper = shallow(
      <Gene
        arrangeSelected={arrangeSelected}
        listSwap={listSwap}
        {...props}
      />,
    );
    wrapper.find('button').at(2).simulate('click');
    expect(arrangeSelected).toHaveBeenCalledWith('columnsSelected', -1);
  });

  it('should call arrange selected for columns with increment on button click', () => {
    const wrapper = shallow(
      <Gene
        arrangeSelected={arrangeSelected}
        listSwap={listSwap}
        {...props}
      />,
    );
    wrapper.find('button').at(3).simulate('click');
    expect(arrangeSelected).toHaveBeenCalledWith('columnsSelected', 1);
  });

  it('should swap rows with rowsSelected on button click', () => {
    const wrapper = shallow(
      <Gene
        arrangeSelected={arrangeSelected}
        listSwap={listSwap}
        {...props}
      />,
    );
    wrapper.find('button').at(4).simulate('click');
    expect(listSwap).toHaveBeenCalledWith('rows', 'rowsSelected', false);
  });

  it('should swap rowsSelected with rows on button click', () => {
    const wrapper = shallow(
      <Gene
        arrangeSelected={arrangeSelected}
        listSwap={listSwap}
        {...props}
      />,
    );
    wrapper.find('button').at(5).simulate('click');
    expect(listSwap).toHaveBeenCalledWith('rowsSelected', 'rows', true, 'rowMap');
  });

  it('should call arrange selected for rows with decrement on button click', () => {
    const wrapper = shallow(
      <Gene
        arrangeSelected={arrangeSelected}
        listSwap={listSwap}
        {...props}
      />,
    );
    wrapper.find('button').at(6).simulate('click');
    expect(arrangeSelected).toHaveBeenCalledWith('rowsSelected', -1);
  });

  it('should call arrange selected for rows with increment on button click', () => {
    const wrapper = shallow(
      <Gene
        arrangeSelected={arrangeSelected}
        listSwap={listSwap}
        {...props}
      />,
    );
    wrapper.find('button').at(7).simulate('click');
    expect(arrangeSelected).toHaveBeenCalledWith('rowsSelected', 1);
  });
});
