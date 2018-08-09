import React from 'react';
import { shallow } from 'enzyme';

import Arrows from './heatmap-svg__arrows';

const changePosition = jest.fn();

describe('Heatmap arrows', () => {
  describe('should be visible', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Arrows
          arrowOpacity={{
            down: false,
            up: false,
          }}
          changePosition={changePosition}
          elPosition={{
            bottom: 0,
            right: 0,
            transform: 'translate(0)',
          }}
          length={20}
          page={10}
          show
        />,
      );
    });

    it('and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('and have visibility visible', () => {
      expect(wrapper.find('div').first().props().style.visibility).toBe('visible');
    });

    it('and up arrows should be active', () => {
      expect(wrapper.find('button').first().props().style.opacity).toBe(1);
      expect(wrapper.find('button').first().props().style.cursor).toBe('pointer');
    });

    it('and down arrows should be active', () => {
      expect(wrapper.find('button').last().props().style.opacity).toBe(1);
      expect(wrapper.find('button').last().props().style.cursor).toBe('pointer');
    });

    it('and clicking first button should call changePosition with minus length', () => {
      wrapper.find('button').first().simulate('click');
      expect(changePosition).toHaveBeenCalledWith(-20);
    });

    it('and clicking second button should call changePosition with minus page', () => {
      wrapper.find('button').at(1).simulate('click');
      expect(changePosition).toHaveBeenCalledWith(-10);
    });

    it('and clicking third button should call changePosition with minus 1', () => {
      wrapper.find('button').at(2).simulate('click');
      expect(changePosition).toHaveBeenCalledWith(-1);
    });

    it('and clicking fourth button should call changePosition with 1', () => {
      wrapper.find('button').at(3).simulate('click');
      expect(changePosition).toHaveBeenCalledWith(1);
    });

    it('and clicking fifth button should call changePosition with page', () => {
      wrapper.find('button').at(4).simulate('click');
      expect(changePosition).toHaveBeenCalledWith(10);
    });

    it('and clicking last button should call changePosition with length', () => {
      wrapper.find('button').last().simulate('click');
      expect(changePosition).toHaveBeenCalledWith(20);
    });
  });

  describe('should be hidden', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Arrows
          arrowOpacity={{
            down: false,
            up: true,
          }}
          changePosition={changePosition}
          elPosition={{
            bottom: 0,
            right: 0,
            transform: 'translate(0)',
          }}
          length={20}
          page={10}
          show={false}
        />,
      );
    });

    it('and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('and have visibility hidden', () => {
      expect(wrapper.find('div').first().props().style.visibility).toBe('hidden');
    });
  });

  describe('should render at top position', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Arrows
          arrowOpacity={{
            down: false,
            up: true,
          }}
          changePosition={changePosition}
          elPosition={{
            bottom: 0,
            right: 0,
            transform: 'translate(0)',
          }}
          length={20}
          page={10}
          show
        />,
      );
    });

    it('with inactive up arrows', () => {
      expect(wrapper.find('button').first().props().style.opacity).toBe(0.6);
      expect(wrapper.find('button').first().props().style.cursor).toBe('not-allowed');
    });

    it('with active down arrows', () => {
      expect(wrapper.find('button').last().props().style.opacity).toBe(1);
      expect(wrapper.find('button').last().props().style.cursor).toBe('pointer');
    });
  });

  describe('should render at bottom position', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Arrows
          arrowOpacity={{
            down: true,
            up: false,
          }}
          changePosition={changePosition}
          elPosition={{
            bottom: 0,
            right: 0,
            transform: 'translate(0)',
          }}
          length={20}
          page={10}
          show
        />,
      );
    });

    it('with active up arrows', () => {
      expect(wrapper.find('button').first().props().style.opacity).toBe(1);
      expect(wrapper.find('button').first().props().style.cursor).toBe('pointer');
    });

    it('with inactive down arrows', () => {
      expect(wrapper.find('button').last().props().style.opacity).toBe(0.6);
      expect(wrapper.find('button').last().props().style.cursor).toBe('not-allowed');
    });
  });
});
