import React from 'react';
import { mount } from 'enzyme';

import Select from './select';
import TestForm from './__mocks__/form-wrapper';

const inputOnChange = jest.fn();
const onChange = jest.fn();
const options = [
  { text: 'option1', value: 1 },
  { text: 'option2', value: 2 },
];

describe('Select', () => {
  test('Renders with no value', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
      >
        <Select
          errorMessage="Error message"
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestSelect"
          onChange={onChange}
          options={options}
          placeHolder="Select..."
          required
          style={{}}
        />
      </TestForm>,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.instance().getFieldValue('TestSelect')).toBeUndefined();
  });

  test('Value can be set programmatically programmatically', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
      >
        <Select
          errorMessage="Error message"
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestSelect"
          onChange={onChange}
          options={options}
          placeHolder="Select..."
          required
          style={{}}
        />
      </TestForm>,
    );
    wrapper.instance().setFieldsValue({
      TestSelect: 1,
    });
    expect(wrapper.instance().getFieldValue('TestSelect')).toBe(1);
  });

  test('On change called when option changes', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: 1,
        }}
      >
        <Select
          errorMessage="Error message"
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestSelect"
          onChange={onChange}
          options={options}
          placeHolder="Select..."
          required
          style={{}}
        />
      </TestForm>,
    );
    const select = wrapper.find('Select').first();
    select.props().onChange();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('Can be set via input.value', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
      >
        <Select
          errorMessage="Error message"
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestSelect"
          onChange={onChange}
          options={options}
          placeHolder="Select..."
          required
          style={{}}
        />
      </TestForm>,
    );
    wrapper.setProps({
      input: {
        onChange: inputOnChange,
        value: 1,
      },
    });
    expect(wrapper.instance().getFieldValue('TestSelect')).toBe(1);
  });

  test('Submit called on button click and submits with no errors', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: 1,
        }}
        onSubmit={onSubmitSpy}
      >
        <Select
          errorMessage="Error message"
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestSelect"
          onChange={onChange}
          options={options}
          placeHolder="Select..."
          required
          style={{}}
        />
      </TestForm>,
    );
    const button = wrapper.find('button');
    button.simulate('submit');
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().getFieldError('TestSelect')).toBeUndefined();
  });

  test('Submit when required and value is undefined gives error', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
      >
        <Select
          errorMessage="Error message"
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestSelect"
          onChange={onChange}
          options={options}
          placeHolder="Select..."
          required
          style={{}}
        />
      </TestForm>,
    );
    const button = wrapper.find('button');
    button.simulate('submit');
    expect(wrapper.instance().getFieldError('TestSelect')).toEqual(['Error message']);
  });

  test('Submit when not required and value is undefined gives no error', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
      >
        <Select
          errorMessage="Error message"
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestSelect"
          onChange={onChange}
          options={options}
          placeHolder="Select..."
          required={false}
          style={{}}
        />
      </TestForm>,
    );
    const button = wrapper.find('button');
    button.simulate('submit');
    expect(wrapper.instance().getFieldError('TestSelect')).toBeUndefined();
  });

  test('Can add custom style', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
      >
        <Select
          errorMessage="Error message"
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestSelect"
          onChange={onChange}
          options={options}
          placeHolder="Select..."
          required={false}
          style={{ backgroundColor: '#000' }}
        />
      </TestForm>,
    );
    const selectStyle = wrapper.find('Select').first().props().style;
    expect(selectStyle).toHaveProperty('backgroundColor', '#000');
  });
});
