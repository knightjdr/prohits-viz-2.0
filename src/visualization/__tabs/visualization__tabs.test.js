import React from 'react';
import { shallow } from 'enzyme';

import Tabs from './visualization__tabs';

jest.mock('./customize/tab-customize');
jest.mock('./go/go-container');
jest.mock('./main-heatmap/tab-main');

describe('Tab button', () => {
  describe('when visible', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Tabs
          activeTab="main"
          handleClick={jest.fn()}
          imageType="heatmap"
          showButton
          showMenu
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should show button', () => {
      expect(wrapper.find('RoundButton').length).toBe(1);
    });

    it('should show activeTab', () => {
      expect(wrapper.find('Main').length).toBe(1);
    });
  });

  describe('when visible with customize tab', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Tabs
          activeTab="customize"
          handleClick={jest.fn()}
          imageType="heatmap"
          showButton
          showMenu
        />,
      );
    });
    it('should show activeTab', () => {
      expect(wrapper.find('Customize').length).toBe(1);
    });
  });

  describe('when visible with GO tab', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Tabs
          activeTab="go"
          handleClick={jest.fn()}
          imageType="heatmap"
          showButton
          showMenu
        />,
      );
    });

    it('should show activeTab', () => {
      expect(wrapper.find('Connect(GoContainer)').length).toBe(1);
    });
  });

  describe('when hidden', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Tabs
          activeTab="main"
          handleClick={jest.fn()}
          imageType="heatmap"
          showButton={false}
          showMenu
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not show button', () => {
      expect(wrapper.find('RoundButton').length).toBe(0);
    });
  });
});
