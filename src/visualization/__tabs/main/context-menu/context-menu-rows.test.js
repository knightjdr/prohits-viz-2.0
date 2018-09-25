import React from 'react';
import { shallow } from 'enzyme';

import { ContextMenuRows } from './context-menu-rows';

const closeMenu = jest.fn();
const setSelections = jest.fn();

describe('Row context menu', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <ContextMenuRows
        closeMenu={closeMenu}
        setSelections={setSelections}
        target="test"
      />,
    );
  });

  it('should render and match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('on click', () => {
    beforeAll(() => {
      wrapper.find('button').simulate('click');
    });

    it('should call closeMenu', () => {
      expect(closeMenu).toHaveBeenCalled();
    });

    it('should call setSelections', () => {
      expect(setSelections).toHaveBeenCalledWith(['test'], 'rows', 'rowsSelected');
    });
  });
});
