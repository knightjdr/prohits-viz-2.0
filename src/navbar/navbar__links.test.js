import React from 'react';
import { shallow } from 'enzyme';

import Links from './navbar__links';

jest.mock('../components/router-link/router-link');

const links = [
  { route: '/', text: 'home' },
  { route: '/analysis', text: 'analysis' },
];

describe('Navbar links', () => {
  describe('for normal screen', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Links
          links={links}
          smallScreen={false}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have two router links', () => {
      expect(wrapper.find('RouterLink').length).toBe(2);
    });

    it('should have link matching first input link', () => {
      const link = wrapper.find('RouterLink').first();
      expect(link.props().children).toBe('home');
    });

    it('should have link matching secondr input link', () => {
      const link = wrapper.find('RouterLink').at(1);
      expect(link.props().children).toBe('analysis');
    });

    it('should not have popover component', () => {
      expect(wrapper.find('Popover').length).toBe(0);
    });
  });

  describe('for small screen', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Links
          links={links}
          smallScreen
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have popover component', () => {
      expect(wrapper.find('Popover').length).toBe(1);
    });
  });
});
