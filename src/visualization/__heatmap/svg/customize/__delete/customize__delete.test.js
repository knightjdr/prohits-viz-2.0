import React from 'react';
import { shallow } from 'enzyme';

import Delete from './customize__delete';

jest.mock('./customize__delete-icons');

describe('Delete component', () => {
  describe('when not shown', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Delete
          cellSize={20}
          deleteItem={jest.fn()}
          dimensions={{
            pageX: 10,
            pageY: 10,
          }}
          mouseEnter={jest.fn()}
          mouseLeave={jest.fn()}
          rect={{
            height: 20,
            show: false,
            width: 100,
            x: 0,
            y: 100,
          }}
          show={false}
        />);
    });

    it('should return null', () => {
      expect(wrapper.getElement()).toBeNull();
    });
  });

  describe('when shown without rect', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Delete
          cellSize={20}
          deleteItem={jest.fn()}
          dimensions={{
            pageX: 10,
            pageY: 10,
          }}
          mouseEnter={jest.fn()}
          mouseLeave={jest.fn()}
          rect={{
            height: 20,
            show: false,
            width: 100,
            x: 0,
            y: 100,
          }}
          show
        />);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not show rect', () => {
      const rect = wrapper.find('rect');
      expect(rect.props().visibility).toBe('hidden');
    });
  });

  describe('when shown with rect', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Delete
          cellSize={20}
          deleteItem={jest.fn()}
          dimensions={{
            pageX: 10,
            pageY: 10,
          }}
          mouseEnter={jest.fn()}
          mouseLeave={jest.fn()}
          rect={{
            height: 20,
            show: true,
            width: 100,
            x: 0,
            y: 100,
          }}
          show
        />);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should show rect', () => {
      const rect = wrapper.find('rect');
      expect(rect.props().visibility).toBe('visible');
    });
  });
});
