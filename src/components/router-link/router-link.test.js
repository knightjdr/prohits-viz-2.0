import React from 'react';
import { shallow } from 'enzyme';

import RouterLink from './router-link';
import scrollTop from '../../helpers/scroll-top';

jest.mock('../../helpers/scroll-top');

describe('RouterLink', () => {
  describe('with defaults', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <RouterLink
          to="/test/route"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call scroll to top on click', () => {
      wrapper.simulate('click');
      expect(scrollTop).toHaveBeenCalled();
    });

    it('should have to prop', () => {
      expect(wrapper.props().to).toBe('/test/route');
    });

    it('should have default text', () => {
      expect(wrapper.props().children).toBe('link');
    });
  });

  describe('with user values', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <RouterLink
          className="test-class"
          otherProp="other-prop"
          to="/test/route"
        >
          testText
        </RouterLink>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have class name', () => {
      expect(wrapper.hasClass('test-class')).toBeTruthy();
    });

    it('should call scroll to top on click', () => {
      wrapper.simulate('click');
      expect(scrollTop).toHaveBeenCalled();
    });

    it('should have other prop', () => {
      expect(wrapper.props().otherProp).toBe('other-prop');
    });

    it('should have to prop', () => {
      expect(wrapper.props().to).toBe('/test/route');
    });

    it('should have prop text', () => {
      expect(wrapper.props().children).toBe('testText');
    });
  });
});
