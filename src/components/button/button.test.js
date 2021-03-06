import React from 'react';
import { shallow } from 'enzyme';

import Button from './button';

const handleClick = jest.fn();

describe('Button component', () => {
  describe('with default props', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Button
          onClick={handleClick}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have default class', () => {
      expect(wrapper.hasClass('button_default')).toBeTruthy();
    });

    it('should call click function', () => {
      wrapper.simulate('click');
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('with user props', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Button
          className="test-class"
          onClick={handleClick}
          miscProp="something"
          theme="warning"
        />,
      );
    });

    it('should have added class', () => {
      expect(wrapper.hasClass('test-class')).toBeTruthy();
    });

    it('should have added prop', () => {
      expect(wrapper.prop('miscProp')).toBe('something');
    });

    it('should have button theme as class', () => {
      expect(wrapper.hasClass('button_warning')).toBeTruthy();
    });
  });

  describe('with disabled prop', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Button
          disabled
          onClick={handleClick}
        />,
      );
    });

    it('should have disabled class', () => {
      expect(wrapper.hasClass('button_disabled')).toBeTruthy();
    });

    it('should not have button theme as class', () => {
      expect(wrapper.hasClass('button_default')).toBeFalsy();
    });
  });
});
