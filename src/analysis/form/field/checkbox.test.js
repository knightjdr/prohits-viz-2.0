import React from 'react';
import { mount } from 'enzyme';

import Checkbox from './checkbox';
import TestForm from './__mocks__/form-wrapper';

const inputChange = jest.fn();
const onChange = jest.fn();

describe('Checkbox', () => {
  test('Renders with false as initial value', () => {
    const wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: undefined,
        }}
        meta={{}}
      >
        <Checkbox
          input={{}}
          name="TestCheckbox"
          onChange={onChange}
          placeHolder="Checkbox"
          style={{}}
        />
      </TestForm>,
    );
    expect(wrapper).toMatchSnapshot();
    const input = wrapper.find('input');
    expect(input.props().checked).toBeFalsy();
  });

  test('On change called on checkbox click', () => {
    const wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: undefined,
        }}
        meta={{}}
      >
        <Checkbox
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
          change: inputChange,
          value: undefined,
        }}
        meta={{}}
      >
        <Checkbox
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
        change: inputChange,
        value: true,
      },
    });
    const input = wrapper.find('input');
    expect(input.props().checked).toBeTruthy();
  });

  test('Submit called on button click and submits with no errors', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: undefined,
        }}
        meta={{}}
        onSubmit={onSubmitSpy}
      >
        <Checkbox
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
    const input = wrapper.find('input');
    expect(input.props().checked).toBeFalsy();
  });

  test('Can add custom style', () => {
    const wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: undefined,
        }}
        meta={{}}
      >
        <Checkbox
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
