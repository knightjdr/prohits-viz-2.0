import React from 'react';
import { shallow } from 'enzyme';

import FieldInput from './field-input';

const onChange = jest.fn();
const onClick = jest.fn();

describe('Panel settings input field', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <FieldInput
        field="test"
        min={0}
        name="Test field"
        onChange={onChange}
        onClick={onClick}
        store={1}
        value={1}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have div with name prop', () => {
    const div = wrapper.find('div').first();
    expect(div.text()).toBe('Test field');
  });

  it('should call onChange from input', () => {
    onChange.mockClear();
    wrapper.find('InputNumber').simulate('change', 10);
    expect(onChange).toHaveBeenCalledWith('test', 10);
  });

  it('should call onClick from button', () => {
    onClick.mockClear();
    wrapper.find('FieldButton').simulate('click');
    expect(onClick).toHaveBeenCalledWith('test');
  });
});
