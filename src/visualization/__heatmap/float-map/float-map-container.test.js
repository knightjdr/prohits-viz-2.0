import React from 'react';
import { shallow } from 'enzyme';

import { FloatMapContainer } from './float-map-container';


describe('Floating minimap container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <FloatMapContainer
        attachMap={jest.fn()}
        minimap={{
          attached: false,
        }}
      />,
    );
  });

  describe('with initial state', () => {
    it('should have initial state with right position', () => {
      expect(wrapper.state('right')).toBe(20);
    });

    it('should have initial state with top position', () => {
      expect(wrapper.state('top')).toBe(100);
    });

    it('should have mouse down as false', () => {
      expect(wrapper.state('mouseDown')).toBeFalsy();
    });
  });

  it('handle mouse down should set mouse down state to true', () => {
    wrapper.instance().handleMouseDown();
    expect(wrapper.state('mouseDown')).toBeTruthy();
  });

  describe('handle mouse down', () => {
    it('should not set state when mouseDown is false', () => {
      wrapper.setState({
        mouseDown: false,
        right: 0,
        top: 0,
      });
      wrapper.instance().handleMouseMove({ clientX: 100, clientY: 100 });
      expect(wrapper.state('right')).toBe(0);
    });

    it('should set state when mouseDown is true', () => {
      wrapper.setState({
        mouseDown: true,
        right: 0,
        top: 0,
      });
      wrapper.instance().handleMouseMove({ clientX: 100, clientY: 100 });
      expect(wrapper.state('right')).toBe(892);
    });
  });

  it('handle mouse up should set mouse down state to false', () => {
    wrapper.setState({ mouseDown: true });
    wrapper.instance().handleMouseUp();
    expect(wrapper.state('mouseDown')).toBeFalsy();
  });
});
