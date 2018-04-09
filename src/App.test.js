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

describe('App', () => {
  test('Renders', () => {
    const wrapper = mount(
      <App />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state().hidePrompt).toBeFalsy();
    expect(wrapper.state().onScroll).toEqual(wrapper.instance().handleScroll);
  });

  test('checkTop hides prompt and removes event listener when scrollTop > 0', () => {
    const wrapper = mount(
      <App />,
    );
    jest.clearAllMocks();
    wrapper.instance().checkTop(0);
    expect(wrapper.state().hidePrompt).toBeFalsy();
    expect(wrapper.state().onScroll).toEqual(wrapper.instance().handleScroll);
    wrapper.instance().checkTop(1);
    expect(wrapper.state().hidePrompt).toBeTruthy();
    expect(wrapper.state().onScroll).toBeNull();
  });

  test('checkTop does nothing when prompt is already hidden', () => {
    const onScrollMock = jest.fn();
    const wrapper = mount(
      <App />,
    );
    jest.clearAllMocks();
    wrapper.setState({
      hidePrompt: true,
      onScroll: onScrollMock,
    });
    wrapper.instance().checkTop(1);
    expect(wrapper.state().hidePrompt).toBeTruthy();
    expect(wrapper.state().onScroll).toEqual(onScrollMock);
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
  });
});
