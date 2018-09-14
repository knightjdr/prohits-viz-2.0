import React from 'react';
import { shallow } from 'enzyme';

import Button from './heatmap-svg__status-button';

const handleClick = jest.fn();

describe('Status Button component', () => {
  describe('with default props', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Button
          onClick={handleClick}
          tooltip="button"
        >
          button
        </Button>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have default class', () => {
      expect(wrapper.hasClass('heatmap-svg__status-button')).toBeTruthy();
    });

    it('should have tooltip matchin prop', () => {
      expect(wrapper.props().tooltip).toBe('button');
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
          tooltip="button"
        >
          button
        </Button>,
      );
    });

    it('should have added class', () => {
      expect(wrapper.hasClass('test-class')).toBeTruthy();
    });
  });
});
