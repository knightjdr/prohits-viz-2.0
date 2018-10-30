import React from 'react';
import { shallow } from 'enzyme';

import deleteIcons from './customize__delete-icons';

const handleClick = jest.fn();
const mouseEnter = jest.fn();
const mouseLeave = jest.fn();

describe('Delete icons', () => {
  describe('for columns', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <div>
          { deleteIcons(5, 20, handleClick, 'col', mouseEnter, mouseLeave) }
        </div>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have five g elements', () => {
      expect(wrapper.find('g').length).toBe(5);
    });

    describe('mouse events', () => {
      let g;

      beforeAll(() => {
        g = wrapper.find('g').first();
      });

      it('should call handleClick', () => {
        handleClick.mockClear();
        g.simulate('click');
        expect(handleClick).toHaveBeenCalledWith(0, 'col');
      });

      it('should call mouseEnter', () => {
        mouseEnter.mockClear();
        g.simulate('mouseenter');
        expect(mouseEnter).toHaveBeenCalledWith(0, 'col');
      });

      it('should call mouseLeave', () => {
        mouseLeave.mockClear();
        g.simulate('mouseleave');
        expect(mouseLeave).toHaveBeenCalledWith(0, 'col');
      });
    });
  });

  describe('for rows', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <div>
          { deleteIcons(5, 20, handleClick, 'row', mouseEnter, mouseLeave) }
        </div>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have five g elements', () => {
      expect(wrapper.find('g').length).toBe(5);
    });

    describe('mouse events', () => {
      let g;

      beforeAll(() => {
        g = wrapper.find('g').first();
      });

      it('should call handleClick', () => {
        handleClick.mockClear();
        g.simulate('click');
        expect(handleClick).toHaveBeenCalledWith(0, 'row');
      });

      it('should call mouseEnter', () => {
        mouseEnter.mockClear();
        g.simulate('mouseenter');
        expect(mouseEnter).toHaveBeenCalledWith(0, 'row');
      });

      it('should call mouseLeave', () => {
        mouseLeave.mockClear();
        g.simulate('mouseleave');
        expect(mouseLeave).toHaveBeenCalledWith(0, 'row');
      });
    });
  });
});
