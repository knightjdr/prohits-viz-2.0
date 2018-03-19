import React from 'react';
import { shallow } from 'enzyme';

import HelpBarContainer from './help-bar-container';

describe('HelpBarContainer', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <HelpBarContainer />,
    );
  });

  test('Resize listener bound on mount', () => {
    global.addEventListener = jest.fn();
    const mountWrapper = shallow(
      <HelpBarContainer />,
    );
    expect(global.addEventListener).toHaveBeenCalledWith('resize', mountWrapper.instance().onResize);
  });

  test('Resize listener unbound on mount', () => {
    global.removeEventListener = jest.fn();
    const mountWrapper = shallow(
      <HelpBarContainer />,
    );
    const resize = mountWrapper.instance().onResize;
    mountWrapper.unmount();
    expect(global.removeEventListener).toHaveBeenCalledWith('resize', resize);
  });

  test('Screen is small when window width <= 680', () => {
    global.innerWidth = 680;
    global.dispatchEvent(new Event('resize'));
    expect(wrapper.instance().smallScreen()).toBeTruthy();
    global.innerWidth = 681;
    global.dispatchEvent(new Event('resize'));
    expect(wrapper.instance().smallScreen()).toBeFalsy();
  });

  test('Resizing window changes state', () => {
    global.innerWidth = 680;
    global.dispatchEvent(new Event('resize'));
    expect(wrapper.state('isSmallScreen')).toBeTruthy();
    expect(wrapper.state('isPanelVisible')).toBeFalsy();
    global.innerWidth = 681;
    global.dispatchEvent(new Event('resize'));
    expect(wrapper.state('isSmallScreen')).toBeFalsy();
    expect(wrapper.state('isPanelVisible')).toBeFalsy();
  });

  test('Show panel toggle changes boolean state', () => {
    expect(wrapper.state('isPanelVisible')).toBeFalsy();
    wrapper.instance().showPanel();
    expect(wrapper.state('isPanelVisible')).toBeTruthy();
    wrapper.instance().showPanel();
    expect(wrapper.state('isPanelVisible')).toBeFalsy();
  });
});
