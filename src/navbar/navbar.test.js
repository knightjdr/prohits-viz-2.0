import React from 'react';
import { shallow } from 'enzyme';

import Navbar from './navbar';

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

describe('Navbar', () => {
  test('Shows background', () => {
    const wrapper = shallow(
      <Navbar
        background
        fixed={false}
        links={links}
        smallScreen={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    const navbar = wrapper.find('.Navbar');
    expect(navbar.props().style.position).toBe('relative');
    expect(wrapper.find('.Navbar-default').length).toBe(1);
    expect(wrapper.find('Popover').length).toBe(0);
  });

  test('Transparent background', () => {
    const wrapper = shallow(
      <Navbar
        background={false}
        fixed={false}
        links={links}
        smallScreen={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.Navbar-transparent').length).toBe(1);
    expect(wrapper.find('Popover').length).toBe(0);
  });

  test('Small screen', () => {
    const wrapper = shallow(
      <Navbar
        background
        fixed={false}
        links={links}
        smallScreen
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Popover').length).toBe(1);
  });

  test('Has fixed position', () => {
    const wrapper = shallow(
      <Navbar
        background
        fixed
        links={links}
        smallScreen={false}
      />,
    );
    const navbar = wrapper.find('.Navbar');
    expect(navbar.props().style.position).toBe('fixed');
  });
});
