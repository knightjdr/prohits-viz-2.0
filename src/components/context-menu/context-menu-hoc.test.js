import React from 'react';
import { mount } from 'enzyme';

import ContextMenu from './context-menu-hoc';

jest.mock('./context-menu');

const component = () => (
  <div className="child" />
);

describe('Context menu HOC', () => {
  let WrappedHOC;

  beforeAll(() => {
    WrappedHOC = ContextMenu(component);
  });

  describe('should create wrapper component', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <WrappedHOC
          closeMenu={jest.fn}
          event={{
            clientX: 0,
            clientY: 0,
          }}
          show
        />,
      );
    });

    it('and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('and wrap component with context menu', () => {
      expect(wrapper.find('.context-menu-mock-wrapper > component').length).toBe(1);
    });

    it('and place childred of component', () => {
      expect(wrapper.find('component > .child').length).toBe(1);
    });
  });

  describe('should have visible state when "show" is true', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <WrappedHOC
          closeMenu={jest.fn}
          event={{
            clientX: 100,
            clientY: 100,
          }}
          show
        />,
      );
    });

    it('with height auto', () => {
      expect(wrapper.state('height')).toBe('auto');
    });

    it('with left position equal to clientX', () => {
      expect(wrapper.state('left')).toBe(100);
    });

    it('with top position equal to clientY', () => {
      expect(wrapper.state('top')).toBe(100);
    });
  });

  describe('should have hidden state when "show" is false', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <WrappedHOC
          closeMenu={jest.fn}
          event={{
            clientX: 100,
            clientY: 100,
          }}
          show={false}
        />,
      );
    });

    it('with height 0', () => {
      expect(wrapper.state('height')).toBe(0);
    });

    it('with left position equal to 0', () => {
      expect(wrapper.state('left')).toBe(0);
    });

    it('with top position equal to 0', () => {
      expect(wrapper.state('top')).toBe(0);
    });
  });

  describe('should set left position', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <WrappedHOC
          closeMenu={jest.fn}
          event={{
            clientX: 0,
            clientY: 0,
          }}
          show
        />,
      );
    });

    it('to argument when menu will not overflow window', () => {
      expect(wrapper.instance().setLeft(100)).toBe(100);
    });

    it('to limit when menu will overflow window', () => {
      // Jest window width is 1024.
      expect(wrapper.instance().setLeft(1025)).toBe(1024);
    });
  });

  describe('should set top position', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <WrappedHOC
          closeMenu={jest.fn}
          event={{
            clientX: 0,
            clientY: 0,
          }}
          show
        />,
      );
    });

    it('to argument when menu will not overflow window', () => {
      expect(wrapper.instance().setTop(100)).toBe(100);
    });

    it('to limit when menu will overflow window', () => {
      // Jest window height is 768.
      expect(wrapper.instance().setTop(769)).toBe(768);
    });
  });

  describe('should update menu state', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <WrappedHOC
          closeMenu={jest.fn}
          event={{
            clientX: 0,
            clientY: 0,
          }}
          show={false}
        />,
      );
    });

    it('for showing menu', () => {
      const event = {
        clientX: 100,
        clientY: 100,
      };
      wrapper.instance().updateMenu({ event, show: true }, false);
      expect(wrapper.state('height')).toBe('auto');
      expect(wrapper.state('left')).toBe(100);
      expect(wrapper.state('left')).toBe(100);
    });

    it('for hiding menu', () => {
      const event = {
        clientX: 100,
        clientY: 100,
      };
      wrapper.instance().updateMenu({ event, show: false }, true);
      expect(wrapper.state('height')).toBe(0);
      expect(wrapper.state('left')).toBe(0);
      expect(wrapper.state('left')).toBe(0);
    });

    it('for not changing, i.e. show props does not change', () => {
      const event = {
        clientX: 100,
        clientY: 100,
      };
      wrapper.instance().updateMenu({ event, show: false }, false);
      expect(wrapper.state('height')).toBe(0);
      expect(wrapper.state('left')).toBe(0);
      expect(wrapper.state('left')).toBe(0);
    });
  });

  it('should check show prop on change', () => {
    const wrapper = mount(
      <WrappedHOC
        closeMenu={jest.fn}
        event={{
          clientX: 0,
          clientY: 0,
        }}
        show={false}
      />,
    );
    const spy = jest.spyOn(wrapper.instance(), 'updateMenu');
    wrapper.setProps({ show: true });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
