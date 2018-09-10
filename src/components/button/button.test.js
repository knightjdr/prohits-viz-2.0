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
          type="warning"
        />,
      );
    });

    it('should have added class', () => {
      expect(wrapper.hasClass('test-class')).toBeTruthy();
    });

    it('should have added prop', () => {
      expect(wrapper.prop('miscProp')).toBe('something');
    });

    it('should have button type as class', () => {
      expect(wrapper.hasClass('button_warning')).toBeTruthy();
    });
  });
});
