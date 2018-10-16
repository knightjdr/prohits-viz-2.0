import React from 'react';
import { shallow } from 'enzyme';

import { NavbarContainer } from './navbar-container';

const links = [
  {
    route: '/analysis',
    text: 'analysis',
  },
  {
    route: '/help',
    text: 'help',
  },
];
const tasks = { list: [] };

describe('NavbarContainer', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <NavbarContainer links={links} tasks={tasks} />,
    );
  });

  it('should add resize listener on mount', () => {
    global.addEventListener = jest.fn();
    const mountedWrapper = shallow(
      <NavbarContainer links={links} tasks={tasks} />,
    );
    expect(global.addEventListener).toHaveBeenCalledWith('resize', mountedWrapper.instance().onResize);
  });

  it('should remove resize listener on mount', () => {
    global.removeEventListener = jest.fn();
    const mountedWrapper = shallow(
      <NavbarContainer links={links} tasks={tasks} />,
    );
    const resize = mountedWrapper.instance().onResize;
    mountedWrapper.unmount();
    expect(global.removeEventListener).toHaveBeenCalledWith('resize', resize);
  });

  it('should set screen to small when window width <= 680', () => {
    global.innerWidth = 680;
    global.dispatchEvent(new Event('resize'));
    expect(wrapper.instance().smallScreen()).toBeTruthy();
    global.innerWidth = 681;
    global.dispatchEvent(new Event('resize'));
    expect(wrapper.instance().smallScreen()).toBeFalsy();
  });

  it('should change state when resizing window ', () => {
    global.innerWidth = 680;
    global.dispatchEvent(new Event('resize'));
    expect(wrapper.state('isSmallScreen')).toBeTruthy();
    global.innerWidth = 681;
    global.dispatchEvent(new Event('resize'));
    expect(wrapper.state('isSmallScreen')).toBeFalsy();
  });
});
