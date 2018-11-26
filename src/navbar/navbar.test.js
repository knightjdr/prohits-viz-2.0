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
  describe('dark background', () => {
    let wrapper;
    let navbar;

    beforeAll(() => {
      wrapper = shallow(
        <Navbar
          background="dark"
          fixed={false}
          links={links}
          smallScreen={false}
          tasks={[]}
        />,
      );
      navbar = wrapper.find('.navbar');
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have relative position', () => {
      expect(navbar.props().style.position).toBe('relative');
    });

    it('should have dark background', () => {
      expect(wrapper.find('.navbar_dark').length).toBe(1);
    });

    it('should not show popover', () => {
      expect(wrapper.find('Popover').length).toBe(0);
    });
  });

  describe('semi-transparent background', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Navbar
          background="semi"
          fixed={false}
          links={links}
          smallScreen={false}
          tasks={[]}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have semi background', () => {
      expect(wrapper.find('.navbar_semi-transparent').length).toBe(1);
    });
  });

  describe('transparent background', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Navbar
          background="transparent"
          fixed={false}
          links={links}
          smallScreen={false}
          tasks={[]}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have semi background', () => {
      expect(wrapper.find('.navbar_transparent').length).toBe(1);
    });
  });

  describe('fixed background', () => {
    let wrapper;
    let navbar;

    beforeAll(() => {
      wrapper = shallow(
        <Navbar
          background="dark"
          fixed
          links={links}
          smallScreen={false}
          tasks={[]}
        />,
      );
      navbar = wrapper.find('.navbar');
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have fixed position', () => {
      expect(navbar.props().style.position).toBe('fixed');
    });
  });
});
