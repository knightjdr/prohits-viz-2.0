import React from 'react';
import { shallow } from 'enzyme';

import { FloatMapContainer } from './float-map-container';

const resetMapPosition = jest.fn();
const updateMapPosition = jest.fn();

beforeEach(() => {
  resetMapPosition.mockClear();
  updateMapPosition.mockClear();
});

describe('Floating minimap container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <FloatMapContainer
        attachMap={jest.fn()}
        display={{
          floatMapRight: 20,
          floatMapTop: 100,
        }}
        minimap={{
          attached: false,
        }}
        resetMapPosition={resetMapPosition}
        updateMapPosition={updateMapPosition}
      />,
    );
  });

  it('should have mouse down as false', () => {
    expect(wrapper.state('mouseDown')).toBeFalsy();
  });

  it('handle mouse down should set mouse down state to true', () => {
    wrapper.instance().handleMouseDown();
    expect(wrapper.state('mouseDown')).toBeTruthy();
  });

  describe('handle mouse down', () => {
    it('should not call update map position prop method', () => {
      wrapper.setState({ mouseDown: false });
      wrapper.instance().handleMouseMove({ clientX: 100, clientY: 100 });
      expect(updateMapPosition).not.toHaveBeenCalled();
    });

    it('should call update map position prop method', () => {
      wrapper.setState({ mouseDown: true });
      wrapper.instance().handleMouseMove({ clientX: 100, clientY: 100 });
      expect(updateMapPosition).toHaveBeenCalledWith(892, 80);
    });
  });

  it('handle mouse up should set mouse down state to false', () => {
    wrapper.setState({ mouseDown: true });
    wrapper.instance().handleMouseUp();
    expect(wrapper.state('mouseDown')).toBeFalsy();
  });

  describe('and position', () => {
    it('should reset when attach state changes to true', () => {
      const nextProps = { minimap: { attached: true } };
      wrapper.instance().resetPosition(nextProps, false);
      expect(resetMapPosition).toHaveBeenCalled();
    });

    it('should not reset when attach state changes to false', () => {
      const nextProps = { minimap: { attached: false } };
      wrapper.instance().resetPosition(nextProps, true);
      expect(resetMapPosition).not.toHaveBeenCalled();
    });

    it('should not reset when attach state does not change', () => {
      const nextProps = { minimap: { attached: true } };
      wrapper.instance().resetPosition(nextProps, true);
      expect(resetMapPosition).not.toHaveBeenCalled();
    });
  });
});
