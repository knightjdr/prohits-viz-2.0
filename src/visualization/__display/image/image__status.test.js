import React from 'react';
import { shallow } from 'enzyme';

import Status from './image__status';

describe('Image status', () => {
  describe('with error', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Status
          error
          loading={false}
        />);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render error content', () => {
      expect(wrapper.find('.image__status_red').length).toBe(1);
    });
  });

  describe('when loading', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Status
          error={false}
          loading
        />);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render error content', () => {
      expect(wrapper.find('.image__status_default').length).toBe(1);
    });
  });

  describe('otherwise', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Status
          error={false}
          loading={false}
        />);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render error content', () => {
      expect(wrapper.find('.image__status_red').length).toBe(1);
    });
  });
});
