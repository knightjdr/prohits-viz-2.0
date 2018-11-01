import React from 'react';
import { shallow } from 'enzyme';

import DeleteContainer, { defaultRect } from './customize__delete-container';

const deleteItem = jest.fn();

describe('Customize delete container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <DeleteContainer
        cellSize={20}
        deleteItem={deleteItem}
        dimensions={{
          pageX: 10,
          pageY: 10,
        }}
        position={{
          x: 5,
          y: 5,
        }}
        show
      />,
    );
  });

  describe('delete item', () => {
    describe('delete column', () => {
      beforeAll(() => {
        wrapper.setState({
          rect: {
            height: 20,
            show: true,
            width: 100,
            x: 0,
            y: 5,
          },
        });
        deleteItem.mockClear();
        wrapper.instance().deleteItem(1, 'col');
      });

      it('should call deleteItem prop method', () => {
        expect(deleteItem).toHaveBeenCalledWith(6, 'col');
      });

      it('should reset state rect', () => {
        expect(wrapper.state('rect')).toEqual(defaultRect);
      });
    });

    describe('delete row', () => {
      beforeAll(() => {
        wrapper.setState({
          rect: {
            height: 20,
            show: true,
            width: 100,
            x: 0,
            y: 5,
          },
        });
        deleteItem.mockClear();
        wrapper.instance().deleteItem(1, 'row');
      });

      it('should call deleteItem prop method', () => {
        expect(deleteItem).toHaveBeenCalledWith(6, 'row');
      });

      it('should reset state rect', () => {
        expect(wrapper.state('rect')).toEqual(defaultRect);
      });
    });
  });

  describe('mouse enter', () => {
    beforeAll(() => {
      wrapper.setState({ rect: defaultRect });
    });

    it('should set rect dimension and position when a column is entered', () => {
      const expectedRect = {
        height: 300,
        show: true,
        width: 20,
        x: 140,
        y: 0,
      };
      wrapper.instance().mouseEnter(2, 'col');
      expect(wrapper.state('rect')).toEqual(expectedRect);
    });

    it('should set rect dimension and position when a row is entered', () => {
      const expectedRect = {
        height: 20,
        show: true,
        width: 300,
        x: 0,
        y: 120,
      };
      wrapper.instance().mouseEnter(1, 'row');
      expect(wrapper.state('rect')).toEqual(expectedRect);
    });
  });

  describe('mouse leave', () => {
    beforeAll(() => {
      wrapper.setState({
        rect: {
          height: 20,
          show: true,
          width: 100,
          x: 0,
          y: 5,
        },
      });
      wrapper.instance().mouseLeave();
    });

    it('should set state rect show state to false', () => {
      expect(wrapper.state('rect').show).toBeFalsy();
    });
  });
});
