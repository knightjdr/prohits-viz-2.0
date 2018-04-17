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

beforeAll(() => {
  Object.defineProperty(window, 'addEventListener', { value: jest.fn(), writable: true });
  Object.defineProperty(window, 'removeEventListener', { value: jest.fn(), writable: true });
});

describe('App', () => {
  afterEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  test('Renders', () => {
    jest.clearAllMocks();
    const wrapper = mount(
      <App />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(window.addEventListener).toHaveBeenCalledWith('scroll', wrapper.instance().handleScroll);
    expect(wrapper.state().hidePrompt).toBeFalsy();
  });

  test('Mounting with scrollY > 0 hides prompt', () => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'scrollY', { value: 10, writable: true });
    const wrapper = mount(
      <App />,
    );
    expect(window.addEventListener).not.toHaveBeenCalledWith('scroll');
    expect(wrapper.state().hidePrompt).toBeTruthy();
  });

  test('checkTop hides prompt and removes event listener when scrollTop > 0', () => {
    const wrapper = mount(
      <App />,
    );
    jest.clearAllMocks();
    wrapper.instance().checkTop(0);
    expect(wrapper.state().hidePrompt).toBeFalsy();
    wrapper.instance().checkTop(1);
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', wrapper.instance().handleScroll);
    expect(wrapper.state().hidePrompt).toBeTruthy();
  });

  test('checkTop does nothing when prompt is already hidden', () => {
    const wrapper = mount(
      <App />,
    );
    jest.clearAllMocks();
    wrapper.setState({
      hidePrompt: true,
    });
    wrapper.instance().checkTop(1);
    expect(window.removeEventListener).not.toHaveBeenCalledWith('scroll');
    expect(wrapper.state().hidePrompt).toBeTruthy();
  });

  test('handleScroll calls checkTop with scroll top', () => {
    const wrapper = mount(
      <App />,
    );
    jest.clearAllMocks();
    const checkTopSpy = jest.spyOn(wrapper.instance(), 'checkTop');
    wrapper.instance().handleScroll();
    expect(checkTopSpy).toHaveBeenCalledTimes(1);
    expect(checkTopSpy).toHaveBeenCalledWith(0);
    checkTopSpy.mockRestore();
  });

  test('Unmount remove event listener', () => {
    const wrapper = mount(
      <App />,
    );
    jest.clearAllMocks();
    const { handleScroll } = wrapper.instance();
    wrapper.unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', handleScroll);
  });

  test('Unmount does not remove event listener when already removed', () => {
    const wrapper = mount(
      <App />,
    );
    jest.clearAllMocks();
    wrapper.setState({
      hidePrompt: true,
    });
    wrapper.unmount();
    expect(window.removeEventListener).not.toHaveBeenCalledWith('scroll');
  });
});
