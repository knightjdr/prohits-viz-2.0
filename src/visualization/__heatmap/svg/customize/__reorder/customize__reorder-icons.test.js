import React from 'react';
import { shallow } from 'enzyme';

import reorderIcons from './customize__reorder-icons';

const mouseDown = jest.fn();

describe('Reorder icons', () => {
  describe('for columns', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <div>
          { reorderIcons(5, 20, 'col', mouseDown) }
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

      it('should call mouseDown', () => {
        mouseDown.mockClear();
        g.simulate('mousedown', {});
        expect(mouseDown).toHaveBeenCalledWith({}, 0);
      });
    });
  });

  describe('for rows', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <div>
          { reorderIcons(5, 20, 'row', mouseDown) }
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

      it('should call mouseDown', () => {
        mouseDown.mockClear();
        g.simulate('mousedown', {});
        expect(mouseDown).toHaveBeenCalledWith({}, 0);
      });
    });
  });
});
