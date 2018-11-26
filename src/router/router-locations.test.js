import React from 'react';
import { shallow } from 'enzyme';

import { Locations } from './router-locations';

describe('Router locations', () => {
  describe('home route', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Locations
          location={{ pathname: '/' }}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have navbar with semi background', () => {
      expect(wrapper.find('Connect(NavbarContainer)').props().background).toBe('semi');
    });
  });

  describe('help route', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Locations
          location={{ pathname: '/help/introduction' }}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have a fixed navbar', () => {
      expect(wrapper.find('Connect(NavbarContainer)').props().fixed).toBeTruthy();
    });
  });

  describe('other route', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Locations
          location={{ pathname: '/news' }}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have navbar with dark background', () => {
      expect(wrapper.find('Connect(NavbarContainer)').props().background).toBe('dark');
    });

    it('should not have a fixed navbar', () => {
      expect(wrapper.find('Connect(NavbarContainer)').props().fixed).toBeFalsy();
    });
  });
});
