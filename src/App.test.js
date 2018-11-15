import React from 'react';
import { mount } from 'enzyme';

import App from './App';

// mock components because I have to use mount to test ref on .App div
jest.mock('./about/about');
jest.mock('./home/arrow-prompt/arrow-prompt');
jest.mock('./home/home-container');
jest.mock('./spotlight/spotlight');
jest.mock('./tools/tools');
jest.mock('./about/about');

const { addEventListener, removeEventListener } = window;

beforeAll(() => {
  Object.defineProperty(window, 'addEventListener', { value: jest.fn(), writable: true });
  Object.defineProperty(window, 'removeEventListener', { value: jest.fn(), writable: true });
});

afterAll(() => {
  window.addEventListener = addEventListener;
  window.removeEventListener = removeEventListener;
});

describe('App', () => {
  describe('mounting with screen top at 0', () => {
    let wrapper;

    beforeAll(() => {
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      wrapper = mount(
        <App />,
      );
    });

    it('should add event listener', () => {
      expect(window.addEventListener).toHaveBeenCalledWith('scroll', wrapper.instance().handleScroll);
    });

    it('should not hide prompt', () => {
      expect(wrapper.state().hidePrompt).toBeFalsy();
    });

    describe('check top', () => {
      it('should not remove listener when prompt is already hidden', () => {
        wrapper.setState({
          hidePrompt: true,
        });
        wrapper.instance().checkTop(1);
        expect(window.removeEventListener).not.toHaveBeenCalledWith('scroll');
      });

      it('should remove listener when prompt is visible', () => {
        wrapper.setState({
          hidePrompt: false,
        });
        wrapper.instance().checkTop(1);
        expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.anything());
      });
    });

    describe('handle scroll', () => {
      let spy;

      afterAll(() => {
        spy.mockRestore();
      });

      beforeAll(() => {
        spy = jest.spyOn(wrapper.instance(), 'checkTop');
        wrapper.update();
        wrapper.instance().handleScroll();
      });

      it('should call method', () => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    it('should remove event listener on unmount', () => {
      window.removeEventListener.mockClear();
      wrapper.setState({
        hidePrompt: false,
      });
      wrapper.unmount();
      expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.anything());
    });
  });

  describe('mounting with screen top > 0', () => {
    let wrapper;

    beforeAll(() => {
      window.addEventListener.mockClear();
      Object.defineProperty(window, 'scrollY', { value: 10, writable: true });
      wrapper = mount(
        <App />,
      );
    });

    it('should not add event listener', () => {
      expect(window.addEventListener).not.toHaveBeenCalledWith('scroll', expect.anything());
    });

    it('should hide prompt', () => {
      expect(wrapper.state().hidePrompt).toBeTruthy();
    });

    it('should not remove event listener on umount when already removed', () => {
      wrapper.unmount();
      expect(window.removeEventListener).not.toHaveBeenCalledWith('scroll');
    });
  });
});
