import React from 'react';
import { mount } from 'enzyme';

import Select from './select';
import TestForm from './__mocks__/form-wrapper';

const inputChange = jest.fn();
const onChange = jest.fn();
const options = [
  { text: 'option1', value: 1 },
  { text: 'option2', value: 2 },
];
const optionsGroup = [
  {
    group: true,
    text: 'group1',
    children: [
      { text: 'option1', value: 1 },
    ],
  },
  { text: 'option2', value: 2 },
];

describe('Select', () => {
  test('Renders with no value', () => {
    const wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Select
          allowClear
          input={{}}
          meta={{}}
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
    const select = wrapper.find('Select').first();
    expect(select.props().value).toBeUndefined();
  });

  test('Renders with group', () => {
    const wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Select
          allowClear
          input={{}}
          meta={{}}
          name="TestSelect"
          onChange={onChange}
          options={optionsGroup}
          placeHolder="Select..."
          required
          style={{}}
        />
      </TestForm>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('On change called when option changes', () => {
    const wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Select
          allowClear
          input={{}}
          meta={{}}
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
          change: inputChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Select
          allowClear
          input={{}}
          meta={{}}
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
        change: inputChange,
        value: 1,
      },
    });
    const select = wrapper.find('Select').first();
    expect(select.props().value).toBe(1);
  });

  test('Submit called on button click', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
        onSubmit={onSubmitSpy}
      >
        <Select
          allowClear
          input={{}}
          meta={{}}
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
  });

  test('Submit error adds prop visualization queue', () => {
    const wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: undefined,
        }}
        meta={{ error: 'Error message', touched: true, warning: '' }}
      >
        <Select
          allowClear
          input={{}}
          meta={{}}
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
    const formItem = wrapper.find('FormItem');
    expect(formItem.props().help).toBe('Error message');
    expect(formItem.props().validateStatus).toBe('error');
  });

  test('Can add custom style', () => {
    const wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Select
          allowClear
          input={{}}
          meta={{}}
          name="TestSelect"
          onChange={onChange}
          options={options}
          placeHolder="Select..."
          required
          style={{ backgroundColor: '#000' }}
        />
      </TestForm>,
    );
    const selectStyle = wrapper.find('Select').first().props().style;
    expect(selectStyle).toHaveProperty('backgroundColor', '#000');
  });
});
