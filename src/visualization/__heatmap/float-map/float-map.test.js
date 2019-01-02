import React from 'react';
import { shallow } from 'enzyme';

import FloatMap from './float-map';

jest.mock('../../__side-panel/panel/__map/panel__map-container');
jest.mock('../../__side-panel/panel/__map/panel__map-contents');

const attachMap = jest.fn();
const handleMouseDownMove = jest.fn();
const handleMouseDownResize = jest.fn();
const handleMouseMove = jest.fn();
const handleMouseUp = jest.fn();
const mouseEnter = jest.fn();
const mouseLeave = jest.fn();
const toggleOpacity = jest.fn();
const toggleVisibility = jest.fn();

const props = {
  attached: false,
  attachMap,
  handleMouseDownMove,
  handleMouseDownResize,
  handleMouseMove,
  handleMouseUp,
  height: 500,
  imageMax: {
    maxHeight: 490,
    maxWidth: 490,
  },
  mouseDown: false,
  mouseEnter,
  mouseLeave,
  opacity: 1,
  opaque: true,
  right: 10,
  visible: true,
  toggleOpacity,
  toggleVisibility,
  top: 10,
  width: 600,
};

describe('Floating minimap', () => {
  describe('when visible', () => {
    let wrapper;

    beforeAll(() => {
      attachMap.mockClear();
      handleMouseDownMove.mockClear();
      handleMouseDownResize.mockClear();
      handleMouseMove.mockClear();
      handleMouseUp.mockClear();
      mouseEnter.mockClear();
      mouseLeave.mockClear();
      toggleOpacity.mockClear();
      toggleVisibility.mockClear();
      wrapper = shallow(
        <FloatMap {...props} />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('backdrop', () => {
      it('should have display block', () => {
        const backdrop = wrapper.find('.float-map__backdrop');
        expect(backdrop.props().style.display).toBe('block');
      });

      it('should not have pointer events', () => {
        const backdrop = wrapper.find('.float-map__backdrop');
        expect(backdrop.props().style.pointerEvents).toBe('none');
      });
    });

    describe('panel', () => {
      it('should have pointer events', () => {
        const panel = wrapper.find('.float-map');
        expect(panel.props().style.pointerEvents).toBe('auto');
      });

      it('should have right position specified by prop', () => {
        const panel = wrapper.find('.float-map');
        expect(panel.props().style.right).toBe(10);
      });

      it('should have top position specified by prop', () => {
        const panel = wrapper.find('.float-map');
        expect(panel.props().style.top).toBe(10);
      });
    });

    describe('buttons', () => {
      it('should have the visibility button with slash icon', () => {
        const button = wrapper.find('RoundButton').at(1);
        expect(button.props().icon.iconName).toBe('eye-slash');
      });

      it('should have the visibility button with transparent theme', () => {
        const button = wrapper.find('RoundButton').at(1);
        expect(button.props().theme).toBe('transparent');
      });

      it('should have the visibility button with hide tooltip', () => {
        const button = wrapper.find('RoundButton').at(1);
        expect(button.props().tooltip).toBe('Hide minimap');
      });

      it('should have the opacity button with transparent theme', () => {
        const button = wrapper.find('RoundButton').at(2);
        expect(button.props().theme).toBe('transparent');
      });
    });

    describe('inner panel', () => {
      it('should have a height', () => {
        const innerPanel = wrapper.find('.float-map__inner');
        expect(innerPanel.props().style.height).toBe(500);
      });

      it('should be opaque', () => {
        const innerPanel = wrapper.find('.float-map__inner');
        expect(innerPanel.props().style.opacity).toBe(1);
      });

      it('should have padding', () => {
        const innerPanel = wrapper.find('.float-map__inner');
        expect(innerPanel.props().style.padding).toBeGreaterThan(0);
      });

      it('should have pointer events', () => {
        const innerPanel = wrapper.find('.float-map__inner');
        expect(innerPanel.props().style.pointerEvents).toBe('auto');
      });

      it('should have a width', () => {
        const innerPanel = wrapper.find('.float-map__inner');
        expect(innerPanel.props().style.width).toBe(600);
      });
    });

    it('should show resize button', () => {
      expect(wrapper.find('.float-map__resize').length).toBe(1);
    });

    describe('mouse events', () => {
      it('should call mouse move prop method when mousing over backdrop', () => {
        wrapper.find('.float-map__backdrop').last().simulate('mouseMove');
        expect(handleMouseMove).toHaveBeenCalled();
      });

      it('should call mouse move prop method on mouse up on backdrop', () => {
        wrapper.find('.float-map__backdrop').last().simulate('mouseUp');
        expect(handleMouseUp).toHaveBeenCalled();
      });

      it('should call mouse enter prop method on entering panel', () => {
        wrapper.find('.float-map').simulate('mouseEnter');
        expect(mouseEnter).toHaveBeenCalled();
      });

      it('should call mouse leave prop method on leaving panel', () => {
        wrapper.find('.float-map').simulate('mouseLeave');
        expect(mouseLeave).toHaveBeenCalled();
      });

      it('should call attach map prop method on clicking button', () => {
        wrapper.find('RoundButton').first().simulate('click');
        expect(attachMap).toHaveBeenCalled();
      });

      it('should toggle visibility on clicking button', () => {
        wrapper.find('RoundButton').at(1).simulate('click');
        expect(toggleVisibility).toHaveBeenCalled();
      });

      it('should toggle opacity on clicking button', () => {
        wrapper.find('RoundButton').at(2).simulate('click');
        expect(toggleOpacity).toHaveBeenCalled();
      });

      it('should call mouse down prop method when mouse down on arrow button ', () => {
        wrapper.find('RoundButton').last().simulate('mouseDown');
        expect(handleMouseDownMove).toHaveBeenCalled();
      });

      it('should call mouse move prop method on mousing over arrow button ', () => {
        wrapper.find('button').last().simulate('mouseMove');
        expect(handleMouseMove).toHaveBeenCalled();
      });

      it('should call mouse move prop method on mouse up on arrow button', () => {
        wrapper.find('button').last().simulate('mouseUp');
        expect(handleMouseUp).toHaveBeenCalled();
      });
    });
  });

  describe('when visible and mouse is down', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <FloatMap
          {...props}
          mouseDown
        />,
      );
    });

    it('backdrop should have pointer events', () => {
      const backdrop = wrapper.find('.float-map__backdrop');
      expect(backdrop.props().style.pointerEvents).toBe('auto');
    });

    it('panel should not have pointer events', () => {
      const panel = wrapper.find('.float-map');
      expect(panel.props().style.pointerEvents).toBe('none');
    });
  });

  describe('when not opaque', () => {
    let wrapper;

    beforeAll(() => {
      attachMap.mockClear();
      handleMouseDownMove.mockClear();
      handleMouseDownResize.mockClear();
      handleMouseMove.mockClear();
      handleMouseUp.mockClear();
      mouseEnter.mockClear();
      mouseLeave.mockClear();
      toggleOpacity.mockClear();
      toggleVisibility.mockClear();
      wrapper = shallow(
        <FloatMap
          {...props}
          opacity={0}
          opaque={false}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have a panel that is not opaque', () => {
      const panel = wrapper.find('.float-map');
      expect(panel.props().style.opacity).toBe(0);
    });

    it('should have the opacity button with success theme', () => {
      const button = wrapper.find('RoundButton').at(2);
      expect(button.props().theme).toBe('success');
    });
  });

  describe('when hidden', () => {
    let wrapper;

    beforeAll(() => {
      attachMap.mockClear();
      handleMouseDownMove.mockClear();
      handleMouseDownResize.mockClear();
      handleMouseMove.mockClear();
      handleMouseUp.mockClear();
      mouseEnter.mockClear();
      mouseLeave.mockClear();
      toggleOpacity.mockClear();
      toggleVisibility.mockClear();
      wrapper = shallow(
        <FloatMap
          {...props}
          visible={false}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have the visibility button with eye icon', () => {
      const button = wrapper.find('RoundButton').at(1);
      expect(button.props().icon.iconName).toBe('eye');
    });

    it('should have the visibility button with warning theme', () => {
      const button = wrapper.find('RoundButton').at(1);
      expect(button.props().theme).toBe('warning');
    });

    it('should have the visibility button with show tooltip', () => {
      const button = wrapper.find('RoundButton').at(1);
      expect(button.props().tooltip).toBe('Show minimap');
    });

    describe('inner panel', () => {
      it('should not have a height', () => {
        const innerPanel = wrapper.find('.float-map__inner');
        expect(innerPanel.props().style.height).toBe(0);
      });

      it('should not be opaque', () => {
        const innerPanel = wrapper.find('.float-map__inner');
        expect(innerPanel.props().style.opacity).toBe(0);
      });

      it('should not have padding', () => {
        const innerPanel = wrapper.find('.float-map__inner');
        expect(innerPanel.props().style.padding).toBe(0);
      });

      it('should not have pointer events', () => {
        const innerPanel = wrapper.find('.float-map__inner');
        expect(innerPanel.props().style.pointerEvents).toBe('none');
      });

      it('should not have a width', () => {
        const innerPanel = wrapper.find('.float-map__inner');
        expect(innerPanel.props().style.width).toBe(0);
      });
    });

    it('should not show resize button', () => {
      expect(wrapper.find('.float-map__resize').length).toBe(0);
    });
  });

  describe('when attached', () => {
    let wrapper;

    beforeAll(() => {
      attachMap.mockClear();
      handleMouseDownMove.mockClear();
      handleMouseDownResize.mockClear();
      handleMouseMove.mockClear();
      handleMouseUp.mockClear();
      mouseEnter.mockClear();
      mouseLeave.mockClear();
      toggleOpacity.mockClear();
      toggleVisibility.mockClear();
      wrapper = shallow(
        <FloatMap
          {...props}
          attached
        />,
      );
    });

    it('should have display none', () => {
      const backdrop = wrapper.find('.float-map__backdrop');
      expect(backdrop.props().style.display).toBe('none');
    });
  });
});
