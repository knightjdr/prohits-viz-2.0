import React from 'react';
import { shallow } from 'enzyme';

import Menu, { textTransform } from './menu';

const closeMenu = jest.fn();
const handleClick = jest.fn();
const removeTab = jest.fn();

describe('Tab menu', () => {
  describe('text transform function', () => {
    describe('when tab is selected', () => {
      let style;

      beforeAll(() => {
        style = textTransform('tab', 'tab');
      });

      it('should set bold weight when tab is selected', () => {
        expect(style.fontWeight).toBe(600);
      });

      it('should set uppercase transform tab is selected', () => {
        expect(style.textTransform).toBe('uppercase');
      });
    });

    describe('when tab is selected', () => {
      let style;

      beforeAll(() => {
        style = textTransform('tab', 'other');
      });

      it('should set bold weight when tab is selected', () => {
        expect(style.fontWeight).toBe(400);
      });

      it('should set uppercase transform tab is selected', () => {
        expect(style.textTransform).toBe('none');
      });
    });
  });

  describe('menu component', () => {
    describe('when menu is open', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = shallow(
          <Menu
            activeTab="main"
            closeMenu={closeMenu}
            handleClick={handleClick}
            removeTab={removeTab}
            show
            tabs={['main', 'customize']}
          />,
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should set opacity', () => {
        expect(wrapper.find('.tab-menu').props().style.opacity).toBe(1);
      });

      it('should set pointerEvents', () => {
        expect(wrapper.find('.tab-menu').props().style.pointerEvents).toBe('auto');
      });

      it('should set transform', () => {
        expect(wrapper.find('.tab-menu').props().style.transform).toBe('scaleY(1)');
      });

      it('should set visibility', () => {
        expect(wrapper.find('.tab-menu').props().style.visibility).toBe('visible');
      });

      it('should hide remove button for main tab', () => {
        expect(wrapper.find('button').at(1).hasClass('tab-menu__remove_hidden')).toBeTruthy();
      });

      it('should not hide remove button for secondary tabs', () => {
        expect(wrapper.find('button').at(3).hasClass('tab-menu__remove_hidden')).toBeFalsy();
      });

      it('should handle open tab click', () => {
        handleClick.mockClear();
        wrapper.find('button').at(0).simulate('click');
        expect(handleClick).toHaveBeenCalled();
      });

      it('should handle remove tab click', () => {
        removeTab.mockClear();
        wrapper.find('button').at(3).simulate('click');
        expect(removeTab).toHaveBeenCalled();
      });
    });
  });

  describe('when menu is closed', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Menu
          activeTab="main"
          closeMenu={closeMenu}
          handleClick={handleClick}
          removeTab={removeTab}
          show={false}
          tabs={['main', 'customize']}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should set opacity', () => {
      expect(wrapper.find('.tab-menu').props().style.opacity).toBe(0);
    });

    it('should set pointerEvents', () => {
      expect(wrapper.find('.tab-menu').props().style.pointerEvents).toBe('none');
    });

    it('should set transform', () => {
      expect(wrapper.find('.tab-menu').props().style.transform).toBe('scaleY(0)');
    });

    it('should set visibility', () => {
      expect(wrapper.find('.tab-menu').props().style.visibility).toBe('hidden');
    });
  });
});
