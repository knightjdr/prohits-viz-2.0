import React from 'react';
import { mount } from 'enzyme';

import Checkbox from './checkbox';
import TestForm from './__mocks__/form-wrapper';

const inputOnChange = jest.fn();
const onChange = jest.fn();

describe('Checkbox', () => {
  test('Renders with false as initial value', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: false,
        }}
      >
        <Checkbox
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestCheckbox"
          onChange={onChange}
          placeHolder="Checkbox"
          style={{}}
        />
      </TestForm>,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.instance().getFieldValue('TestCheckbox')).toBeFalsy();
  });

  test('Is true when checked programmatically', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: false,
        }}
      >
        <Checkbox
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestCheckbox"
          onChange={onChange}
          placeHolder="Checkbox"
          style={{}}
        />
      </TestForm>,
    );
    wrapper.instance().setFieldsValue({
      TestCheckbox: true,
    });
    expect(wrapper.instance().getFieldValue('TestCheckbox')).toBeTruthy();
  });

  test('On change called on checkbox click', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: false,
        }}
      >
        <Checkbox
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestCheckbox"
          onChange={onChange}
          placeHolder="Checkbox"
          style={{}}
        />
      </TestForm>,
    );
    const input = wrapper.find('input');
    input.simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('Can be set via input.value', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: false,
        }}
      >
        <Checkbox
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestCheckbox"
          onChange={onChange}
          placeHolder="Checkbox"
          style={{}}
        />
      </TestForm>,
    );
    wrapper.setProps({
      input: {
        onChange: inputOnChange,
        value: true,
      },
    });
    expect(wrapper.instance().getFieldValue('TestCheckbox')).toBeTruthy();
  });

  test('Submit called on button click and submits with no errors', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: false,
        }}
        onSubmit={onSubmitSpy}
      >
        <Checkbox
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestCheckbox"
          onChange={onChange}
          placeHolder="Checkbox"
          style={{}}
        />
      </TestForm>,
    );
    const button = wrapper.find('button');
    button.simulate('submit');
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().getFieldError('TestCheckbox')).toBeUndefined();
  });

  /* Checkbox should never be required, so these tests are inappropriate
  ** test('Submit when required and value is undefined gives error', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
      >
        <Checkbox
          errorMessage="Error message"
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestCheckbox"
          onChange={onChange}
          placeHolder="Checkbox"
          required
          style={{}}
        />
      </TestForm>,
    );
    const button = wrapper.find('button');
    button.simulate('submit');
    expect(wrapper.instance().getFieldError('TestCheckbox')).toEqual(['Error message']);
  });

  test('Submit when not required and value is undefined gives no error', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
      >
        <Checkbox
          errorMessage="Error message"
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestCheckbox"
          onChange={onChange}
          placeHolder="Checkbox"
          required={false}
          style={{}}
        />
      </TestForm>,
    );
    const button = wrapper.find('button');
    button.simulate('submit');
    expect(wrapper.instance().getFieldError('TestCheckbox')).toBeUndefined();
  }); */

  test('Can add custom style', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
      >
        <Checkbox
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestCheckbox"
          onChange={onChange}
          placeHolder="Checkbox"
          style={{ backgroundColor: '#000' }}
        />
      </TestForm>,
    );
    const checkboxStyle = wrapper.find('Checkbox').first().props().style;
    expect(checkboxStyle).toHaveProperty('backgroundColor', '#000');
  });
});
