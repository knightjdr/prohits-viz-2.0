import React from 'react';
import { shallow } from 'enzyme';

import Annotation from './annotation';

const clearAnnotation = jest.fn();
const handleChange = jest.fn();
const handleClick = jest.fn();

describe('Annotation', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Annotation
        annotation="test"
        clearAnnotation={clearAnnotation}
        handleChange={handleChange}
        handleClick={handleClick}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle input change', () => {
    handleChange.mockClear();
    wrapper.find('Input').simulate('change');
    expect(handleChange).toHaveBeenCalled();
  });

  it('should set input value to prop', () => {
    const input = wrapper.find('Input');
    expect(input.props().value).toBe('test');
  });

  it('should handle annotation click', () => {
    handleClick.mockClear();
    wrapper.find('Button').first().simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });

  it('should handle clear click', () => {
    clearAnnotation.mockClear();
    wrapper.find('Button').at(1).simulate('click');
    expect(clearAnnotation).toHaveBeenCalled();
  });
});
