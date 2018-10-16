import React from 'react';
import { shallow } from 'enzyme';

import Contents from './status__contents';

jest.mock('../../../components/router-link/router-link');

describe('Status modal content', () => {
  describe('complete', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Contents
          id="taskID"
          status="complete"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should pass id to router link', () => {
      expect(wrapper.find('RouterLink').props().to).toBe('/visualization/taskID');
    });
  });

  describe('error', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Contents
          id="taskID"
          status="error"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('loading', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Contents
          id="taskID"
          status="loading"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('running', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Contents
          id="taskID"
          status="running"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
