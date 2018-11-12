import React from 'react';
import { shallow } from 'enzyme';

import Loading from './loading';

describe('Loading', () => {
  describe('with error', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Loading
          error
          message="Error message"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should display error', () => {
      expect(wrapper.find('.loading_error').length).toBe(1);
    });

    it('should contain prop message as text', () => {
      expect(wrapper.find('span').text()).toBe('Error message');
    });
  });

  describe('when loading', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Loading />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have spinner', () => {
      expect(wrapper.find('Spin').length).toBe(1);
    });
  });

  describe('when loading delay has not been reached', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Loading
          pastDelay={false}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have spinner', () => {
      expect(wrapper.getElement()).toBeNull();
    });
  });
});
