import React from 'react';
import { shallow } from 'enzyme';

import Select from './selection__select';

const listSelect = jest.fn();
const openContextMenu = jest.fn();

describe('Custom select menu', () => {
  beforeEach(() => {
    /* Clear call count */
    listSelect.mockClear();
    openContextMenu.mockClear();
  });

  it('should render with a hidden placeholder item', () => {
    const wrapper = shallow(
      <Select
        canPaste={false}
        listSelect={listSelect}
        openContextMenu={openContextMenu}
        options={['a', 'b', 'c']}
        target="menu"
      />,
    );
    expect(wrapper).toMatchSnapshot();
    const option = wrapper.find('.selection__select_option-hidden');
    expect(option.props().value).toBe('');
    expect(option.props().children).toBe('Select...');
  });

  it('should call list select prop method on change', () => {
    const wrapper = shallow(
      <Select
        canPaste={false}
        listSelect={listSelect}
        openContextMenu={openContextMenu}
        options={['a', 'b', 'c']}
        target="menu"
      />,
    );
    wrapper.find('select').simulate('change', { target: 'test' });
    expect(listSelect).toHaveBeenCalledWith({ target: 'test' }, 'menu');
  });

  it('should call context menu prop method on right click', () => {
    const wrapper = shallow(
      <Select
        canPaste={false}
        listSelect={listSelect}
        openContextMenu={openContextMenu}
        options={['a', 'b', 'c']}
        target="menu"
      />,
    );
    wrapper.find('select').prop('onContextMenu')({ target: 'test' });
    expect(openContextMenu).toHaveBeenCalledWith({ target: 'test' }, false, 'menu');
  });
});
