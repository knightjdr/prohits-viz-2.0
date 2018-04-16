import React from 'react';
import { mount } from 'enzyme';

import Switch from './switch';
import TestForm from './__mocks__/form-wrapper';

const inputChange = jest.fn();
const onChange = jest.fn();

describe('Switch', () => {
  test('Renders with false as initial value', () => {
    const wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: undefined,
        }}
        meta={{}}
      >
        <Switch
          input={{}}
          label="TestSwitch"
          onChange={onChange}
          style={{}}
        />
      </TestForm>,
    );
    expect(wrapper).toMatchSnapshot();
    const switchEl = wrapper.find('Switch').first();
    expect(switchEl.props().checked).toBeFalsy();
  });

  test('FormItem gets layout props', () => {
    const wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: undefined,
        }}
        meta={{}}
      >
        <Switch
          formItemLayout={{
            labelCol: { span: 10 },
            wrapperCol: { span: 20 },
          }}
          input={{}}
          label="TestSwitch"
          onChange={onChange}
          style={{}}
        />
      </TestForm>,
    );
    const FormItem = wrapper.find('FormItem');
    expect(FormItem.props().labelCol).toEqual({ span: 10 });
    expect(FormItem.props().wrapperCol).toEqual({ span: 20 });
  });

  test('On change called on switch', () => {
    const wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: undefined,
        }}
        meta={{}}
      >
        <Switch
          input={{}}
          label="TestSwitch"
          onChange={onChange}
          placeHolder="Switch"
          style={{}}
        />
      </TestForm>,
    );
    const switchEl = wrapper.find('Switch').first();
    switchEl.simulate('click');
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
        <Switch
          input={{}}
          label="TestSwitch"
          onChange={onChange}
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
    const switchEl = wrapper.find('Switch').first();
    expect(switchEl.props().checked).toBeTruthy();
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
        <Switch
          input={{}}
          label="TestSwitch"
          onChange={onChange}
          style={{}}
        />
      </TestForm>,
    );
    const button = wrapper.find('button');
    button.simulate('submit');
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    const switchEl = wrapper.find('Switch').first();
    expect(switchEl.props().checked).toBeFalsy();
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
        <Switch
          input={{}}
          label="TestSwitch"
          onChange={onChange}
          style={{ backgroundColor: '#000' }}
        />
      </TestForm>,
    );
    const checkboxStyle = wrapper.find('Switch').first().props().style;
    expect(checkboxStyle).toHaveProperty('backgroundColor', '#000');
  });
});
