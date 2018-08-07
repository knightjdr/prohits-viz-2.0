import React from 'react';
import { shallow } from 'enzyme';

import FloatMap from './float-map';

const attachMap = jest.fn();
const handleMouseDown = jest.fn();
const handleMouseMove = jest.fn();
const handleMouseUp = jest.fn();

beforeEach(() => {
  attachMap.mockClear();
  handleMouseDown.mockClear();
  handleMouseMove.mockClear();
  handleMouseUp.mockClear();
});

describe('Floating minimap', () => {
  describe('when visible', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <FloatMap
          attached={false}
          attachMap={attachMap}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          mouseDown={false}
          right={10}
          top={20}
        />,
      );
    });

    it('should render', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('backdrop (i.e. container) should be have display block', () => {
      expect(wrapper.find('.float-map__backdrop').props().style.display).toBe('block');
    });

    it('backdrop should not have pointer events', () => {
      expect(wrapper.find('.float-map__backdrop').props().style.pointerEvents).toBe('none');
    });

    it('panel should have pointer events', () => {
      expect(wrapper.find('.float-map').props().style.pointerEvents).toBe('auto');
    });

    it('panel should have right position specified by prop', () => {
      expect(wrapper.find('.float-map').props().style.right).toBe(10);
    });

    it('panel should have top position specified by prop', () => {
      expect(wrapper.find('.float-map').props().style.top).toBe(20);
    });

    it('mousing over backdrop should call mouse move prop method', () => {
      wrapper.find('.float-map__backdrop').last().simulate('mouseMove');
      expect(handleMouseMove).toHaveBeenCalledTimes(1);
    });

    it('mouse up on backdrop should call mouse move prop method', () => {
      wrapper.find('.float-map__backdrop').last().simulate('mouseUp');
      expect(handleMouseUp).toHaveBeenCalledTimes(1);
    });

    it('clicking button should call attach map prop method', () => {
      wrapper.find('button').first().simulate('click');
      expect(attachMap).toHaveBeenCalledTimes(1);
    });

    it('mouse down on arrow button should call mouse down prop method', () => {
      wrapper.find('button').last().simulate('mouseDown');
      expect(handleMouseDown).toHaveBeenCalledTimes(1);
    });

    it('mousing over arrow button should call mouse move prop method', () => {
      wrapper.find('button').last().simulate('mouseMove');
      expect(handleMouseMove).toHaveBeenCalledTimes(1);
    });

    it('mouse up on arrow button should call mouse move prop method', () => {
      wrapper.find('button').last().simulate('mouseUp');
      expect(handleMouseUp).toHaveBeenCalledTimes(1);
    });
  });

  describe('when hidden', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <FloatMap
          attached
          attachMap={attachMap}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          mouseDown={false}
          right={10}
          top={20}
        />,
      );
    });

    it('should render', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('backdrop (i.e. container) should be have display none', () => {
      expect(wrapper.find('.float-map__backdrop').props().style.display).toBe('none');
    });
  });

  describe('when visible and mouse is down', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <FloatMap
          attached={false}
          attachMap={attachMap}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          mouseDown
          right={10}
          top={20}
        />,
      );
    });

    it('backdrop should have pointer events', () => {
      expect(wrapper.find('.float-map__backdrop').props().style.pointerEvents).toBe('auto');
    });

    it('panel should not have pointer events', () => {
      expect(wrapper.find('.float-map').props().style.pointerEvents).toBe('none');
    });
  });
});
