import { shallow } from 'enzyme';

import status from './task__status';

describe('Task status', () => {
  describe('complete', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        status('complete'),
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have correct class', () => {
      expect(wrapper.hasClass('tasks__complete')).toBeTruthy();
    });
  });

  describe('error', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        status('error'),
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have correct class', () => {
      expect(wrapper.hasClass('tasks__error')).toBeTruthy();
    });
  });

  describe('default status is running', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        status('other'),
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have correct class', () => {
      expect(wrapper.hasClass('tasks__running')).toBeTruthy();
    });
  });
});
