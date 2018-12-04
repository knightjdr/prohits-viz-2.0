import React from 'react';
import { shallow } from 'enzyme';

import FieldButton from './field-button';

const onClick = jest.fn();

describe('Panel settings button', () => {
  describe('default appearance', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <FieldButton
          onClick={onClick}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call onClick prop method', () => {
      onClick.mockClear();
      wrapper.find('RoundButton').simulate('click');
      expect(onClick).toHaveBeenCalled();
    });

    it('should have default type', () => {
      const button = wrapper.find('RoundButton');
      expect(button.props().type).toBe('default');
    });
  });

  describe('with round corners and user specified class', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <FieldButton
          className="test-class"
          onClick={onClick}
          round
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have user class', () => {
      expect(wrapper.hasClass('test-class')).toBeTruthy();
    });

    it('should have round class', () => {
      expect(wrapper.hasClass('panel__settings-field-button_round')).toBeTruthy();
    });
  });

  describe('when value has changed', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <FieldButton
          hasChanged
          onClick={onClick}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have default type', () => {
      const button = wrapper.find('RoundButton');
      expect(button.props().type).toBe('success');
    });
  });
});
