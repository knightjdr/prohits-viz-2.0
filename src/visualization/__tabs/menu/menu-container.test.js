import React from 'react';
import { shallow } from 'enzyme';

import { MenuContainer } from './menu-container';

const closeMenu = jest.fn();
const removeTab = jest.fn();
const setTab = jest.fn();

describe('Tab menu container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <MenuContainer
        closeMenu={closeMenu}
        removeTab={removeTab}
        setTab={setTab}
        show
        tabs={{
          available: ['main'],
          selected: 'main',
        }}
      />,
    );
  });

  describe('set handler', () => {
    beforeAll(() => {
      closeMenu.mockClear();
      setTab.mockClear();
      wrapper.instance().handleClick('main');
    });

    it('should close menu', () => {
      expect(closeMenu).toHaveBeenCalled();
    });

    it('should set tab', () => {
      expect(setTab).toHaveBeenCalledWith('main');
    });
  });

  describe('remove handler', () => {
    beforeAll(() => {
      closeMenu.mockClear();
      removeTab.mockClear();
      wrapper.instance().removeTab('main');
    });

    it('should close menu', () => {
      expect(closeMenu).toHaveBeenCalled();
    });

    it('should remove tab', () => {
      expect(removeTab).toHaveBeenCalledWith('main');
    });
  });
});
