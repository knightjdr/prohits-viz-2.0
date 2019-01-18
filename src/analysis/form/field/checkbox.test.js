import React from 'react';
import { mount } from 'enzyme';

import Checkbox from './checkbox';
import TestForm from './__mocks__/form-wrapper';

const inputChange = jest.fn();
const onChange = jest.fn();
const onSubmit = jest.fn();

describe('Checkbox', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: undefined,
        }}
        meta={{}}
        onSubmit={onSubmit}
      >
        <Checkbox
          formItemLayout={{
            labelCol: { span: 10 },
            wrapperCol: { span: 20 },
          }}
          input={{}}
          label="TestCheckbox"
          onChange={onChange}
          style={{ backgroundColor: '#000' }}
        />
      </TestForm>,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set checked status', () => {
    const input = wrapper.find('input');
    expect(input.props().checked).toBeFalsy();
  });

  it('should set label column layout', () => {
    const FormItem = wrapper.find('FormItem');
    expect(FormItem.props().labelCol).toEqual({ span: 10 });
  });

  it('should set wrapper column layout', () => {
    const FormItem = wrapper.find('FormItem');
    expect(FormItem.props().wrapperCol).toEqual({ span: 20 });
  });

  it('should call on change on checkbox click', () => {
    const input = wrapper.find('input');
    input.simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should set input value via input.value prop', () => {
    wrapper.setProps({
      input: {
        change: inputChange,
        value: true,
      },
    });
    const input = wrapper.find('input');
    expect(input.props().checked).toBeTruthy();
  });

  it('should call submit on button click', () => {
    onSubmit.mockClear();
    const button = wrapper.find('button');
    button.simulate('submit');
    expect(onSubmit).toHaveBeenCalled();
  });

  it('should add custom style', () => {
    const checkboxStyle = wrapper.find('Checkbox').first().props().style;
    expect(checkboxStyle).toHaveProperty('backgroundColor', '#000');
  });
});
