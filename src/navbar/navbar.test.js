import React from 'react';
import { shallow } from 'enzyme';

import navbar from './navbar';

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

describe('navbar', () => {
  test('Shows background', () => {
    const wrapper = shallow(
      <navbar
        background
        fixed={false}
        links={links}
        smallScreen={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    const navbar = wrapper.find('.navbar');
    expect(navbar.props().style.position).toBe('relative');
    expect(wrapper.find('.navbar_default').length).toBe(1);
    expect(wrapper.find('Popover').length).toBe(0);
  });

  test('Transparent background', () => {
    const wrapper = shallow(
      <navbar
        background={false}
        fixed={false}
        links={links}
        smallScreen={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.navbar_transparent').length).toBe(1);
    expect(wrapper.find('Popover').length).toBe(0);
  });

  test('Small screen', () => {
    const wrapper = shallow(
      <navbar
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
      <navbar
        background
        fixed
        links={links}
        smallScreen={false}
      />,
    );
    const navbar = wrapper.find('.navbar');
    expect(navbar.props().style.position).toBe('fixed');
  });
});
