import React from 'react';
import { shallow } from 'enzyme';

import Gene from './selection__gene';

const arrangeSelected = jest.fn();
const listSwap = jest.fn();

beforeEach(() => {
  /* Clear call count */
  arrangeSelected.mockClear();
  listSwap.mockClear();
});

describe('Gene select', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Gene
        arrangeSelected={arrangeSelected}
        columnRef={{}}
        columns={['a', 'b']}
        columnsSelected={['c']}
        listSelect={jest.fn()}
        listSwap={listSwap}
        openContextMenu={jest.fn()}
        rowRef={{}}
        rows={['e']}
        rowsSelected={['d', 'f']}
      />,
    );
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should swap columns with columnsSelected on button click', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(listSwap).toHaveBeenCalledWith('columns', 'columnsSelected');
  });

  it('should swap columnsSelected with columns on button click', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(listSwap).toHaveBeenCalledWith('columnsSelected', 'columns', 'columnMap');
  });

  it('should call arrange selected for columns with decrement on button click', () => {
    wrapper.find('button').at(2).simulate('click');
    expect(arrangeSelected).toHaveBeenCalledWith('columnsSelected', -1);
  });

  it('should call arrange selected for columns with increment on button click', () => {
    wrapper.find('button').at(3).simulate('click');
    expect(arrangeSelected).toHaveBeenCalledWith('columnsSelected', 1);
  });

  it('should swap rows with rowsSelected on button click', () => {
    wrapper.find('button').at(4).simulate('click');
    expect(listSwap).toHaveBeenCalledWith('rows', 'rowsSelected');
  });

  it('should swap rowsSelected with rows on button click', () => {
    wrapper.find('button').at(5).simulate('click');
    expect(listSwap).toHaveBeenCalledWith('rowsSelected', 'rows', 'rowMap');
  });

  it('should call arrange selected for rows with decrement on button click', () => {
    wrapper.find('button').at(6).simulate('click');
    expect(arrangeSelected).toHaveBeenCalledWith('rowsSelected', -1);
  });

  it('should call arrange selected for rows with increment on button click', () => {
    wrapper.find('button').at(7).simulate('click');
    expect(arrangeSelected).toHaveBeenCalledWith('rowsSelected', 1);
  });
});
