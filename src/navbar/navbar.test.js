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

describe('navbar', () => {
  it('should show background', () => {
    const wrapper = shallow(
      <Navbar
        background
        fixed={false}
        links={links}
        smallScreen={false}
        tasks={[]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    const navbar = wrapper.find('.navbar');
    expect(navbar.props().style.position).toBe('relative');
    expect(wrapper.find('.navbar_default').length).toBe(1);
    expect(wrapper.find('Popover').length).toBe(0);
  });

  it('should have transparent background', () => {
    const wrapper = shallow(
      <Navbar
        background={false}
        fixed={false}
        links={links}
        smallScreen={false}
        tasks={[]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.navbar_transparent').length).toBe(1);
    expect(wrapper.find('Popover').length).toBe(0);
  });

  it('should have fixed position', () => {
    const wrapper = shallow(
      <Navbar
        background
        fixed
        links={links}
        smallScreen={false}
        tasks={[]}
      />,
    );
    const navbar = wrapper.find('.navbar');
    expect(navbar.props().style.position).toBe('fixed');
  });
});
