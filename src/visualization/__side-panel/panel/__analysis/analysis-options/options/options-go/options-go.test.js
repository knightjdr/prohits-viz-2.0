import React from 'react';
import { shallow } from 'enzyme';

import OptionsGo from './options-go';

const toggleAdvanced = jest.fn();

describe('Analysis GO options panel', () => {
  describe('with advanced options shown', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <OptionsGo
          form={{}}
          handleCheckbox={jest.fn()}
          handleGoCheckbox={jest.fn()}
          handleInput={jest.fn()}
          handleSelect={jest.fn()}
          showAdvanced
          toggleAdvanced={toggleAdvanced}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should show "hide" button text', () => {
      expect(wrapper.find('Button').props().children).toBe('Hide advanced');
    });

    it('should show advanced component', () => {
      expect(wrapper.find('Advanced').length).toBe(1);
    });

    it('should toggle advanced options visibility click', () => {
      wrapper.find('Button').simulate('click');
      expect(toggleAdvanced).toHaveBeenCalled();
    });
  });

  describe('with advanced options hidden', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <OptionsGo
          form={{}}
          handleCheckbox={jest.fn()}
          handleGoCheckbox={jest.fn()}
          handleInput={jest.fn()}
          handleSelect={jest.fn()}
          showAdvanced={false}
          toggleAdvanced={toggleAdvanced}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should show "show" button text', () => {
      expect(wrapper.find('Button').props().children).toBe('Show advanced');
    });

    it('should show advanced component', () => {
      expect(wrapper.find('Advanced').length).toBe(0);
    });
  });
});
