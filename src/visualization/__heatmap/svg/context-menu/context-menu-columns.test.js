import React from 'react';
import { shallow } from 'enzyme';

import { ContextMenuColumns } from './context-menu-columns';

const closeMenu = jest.fn();
const setReference = jest.fn();
const setSelections = jest.fn();
const sortRows = jest.fn();

describe('Column context menu', () => {
  describe('without reference', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <ContextMenuColumns
          closeMenu={closeMenu}
          setReference={setReference}
          setSelections={setSelections}
          sortRows={sortRows}
          target="test"
        />,
      );
    });

    it('should render and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have correct text for third button', () => {
      expect(wrapper.find('button').at(2).text()).toBe('Set as reference');
    });

    describe('on click of first button', () => {
      beforeAll(() => {
        closeMenu.mockClear();
        sortRows.mockClear();
        wrapper.find('button').first().simulate('click');
      });

      it('should call closeMenu', () => {
        expect(closeMenu).toHaveBeenCalled();
      });

      it('should call sortRows with "asc" argument', () => {
        expect(sortRows).toHaveBeenCalledWith('test', 'asc');
      });
    });

    describe('on click of second button', () => {
      beforeAll(() => {
        closeMenu.mockClear();
        sortRows.mockClear();
        wrapper.find('button').at(1).simulate('click');
      });

      it('should call closeMenu', () => {
        expect(closeMenu).toHaveBeenCalled();
      });

      it('should call sortRows with "desc" argument', () => {
        expect(sortRows).toHaveBeenCalledWith('test', 'desc');
      });
    });

    describe('on click of third button', () => {
      beforeAll(() => {
        closeMenu.mockClear();
        setReference.mockClear();
        wrapper.find('button').at(2).simulate('click');
      });

      it('should call closeMenu', () => {
        expect(closeMenu).toHaveBeenCalled();
      });

      it('should call setReference', () => {
        expect(setReference).toHaveBeenCalledWith('test');
      });
    });

    describe('on click of last button', () => {
      beforeAll(() => {
        closeMenu.mockClear();
        setSelections.mockClear();
        wrapper.find('button').last().simulate('click');
      });

      it('should call closeMenu', () => {
        expect(closeMenu).toHaveBeenCalled();
      });

      it('should call setSelections', () => {
        expect(setSelections).toHaveBeenCalledWith(['test'], 'columns', 'columnsSelected');
      });
    });
  });

  describe('with reference', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <ContextMenuColumns
          closeMenu={closeMenu}
          reference="test"
          setReference={setReference}
          setSelections={setSelections}
          sortRows={sortRows}
          target="test"
        />,
      );
    });

    it('should render and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have correct text for third button', () => {
      expect(wrapper.find('button').at(2).text()).toBe('Unset as reference');
    });

    describe('on click of third button', () => {
      beforeAll(() => {
        closeMenu.mockClear();
        setReference.mockClear();
        wrapper.find('button').at(2).simulate('click');
      });

      it('should call closeMenu', () => {
        expect(closeMenu).toHaveBeenCalled();
      });

      it('should call setReference', () => {
        expect(setReference).toHaveBeenCalledWith(null);
      });
    });
  });
});

