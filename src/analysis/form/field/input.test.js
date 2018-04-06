import React from 'react';
import { mount } from 'enzyme';

import InfoModal from './info-modal';
import Input from './input';
import TestForm from './__mocks__/form-wrapper';

jest.mock('./info-modal');

const inputOnChange = jest.fn();
const onChange = jest.fn();

describe('Input', () => {
  test('Renders with no value, help message and type = text', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Input
          helpMessage="help"
          input={{}}
          label="Label"
          meta={{}}
          name="TestInput"
          onChange={onChange}
          placeHolder="Input..."
          required
          style={{}}
        />
      </TestForm>,
    );
    expect(wrapper).toMatchSnapshot();
    const input = wrapper.find('Input').first();
    expect(input.props().type).toBe('text');
    expect(input.props().value).toBeUndefined();
    expect(wrapper.find('svg.CustomField-help').length).toBe(1);
  });

  test('Renders with without help message', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Input
          input={{}}
          label="Label"
          meta={{}}
          name="TestInput"
          onChange={onChange}
          placeHolder="Input..."
          required
          style={{}}
        />
      </TestForm>,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('svg.CustomField-help').length).toBe(0);
  });

  test('Modal called on button click', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Input
          helpMessage="help"
          label="Label"
          input={{}}
          meta={{}}
          name="TestInput"
          onChange={onChange}
          placeHolder="Input..."
          required
          style={{}}
        />
      </TestForm>,
    );
    jest.clearAllMocks();
    const button = wrapper.find('.CustomField-help').first();
    button.simulate('click');
    expect(InfoModal).toHaveBeenCalledTimes(1);
    expect(InfoModal).toHaveBeenCalledWith('Label', 'help');
  });

  test('Modal called on button click without title text', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Input
          helpMessage="help"
          input={{}}
          meta={{}}
          name="TestInput"
          onChange={onChange}
          placeHolder="Input..."
          required
          style={{}}
        />
      </TestForm>,
    );
    jest.clearAllMocks();
    const button = wrapper.find('.CustomField-help').first();
    button.simulate('click');
    expect(InfoModal).toHaveBeenCalledTimes(1);
    expect(InfoModal).toHaveBeenCalledWith('Help', 'help');
  });

  test('Renders with specified type', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Input
          helpMessage="help"
          input={{}}
          label="Label"
          meta={{}}
          name="TestInput"
          onChange={onChange}
          placeHolder="Input..."
          required
          style={{}}
          type="number"
        />
      </TestForm>,
    );
    const input = wrapper.find('Input').first();
    expect(input.props().type).toBe('number');
  });

  test('On change called when input changes', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Input
          helpMessage="help"
          input={{}}
          label="Label"
          meta={{}}
          name="TestInput"
          onChange={onChange}
          placeHolder="Input..."
          required
          style={{}}
          type="number"
        />
      </TestForm>,
    );
    const input = wrapper.find('Input').first();
    input.simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('Can be set via input.value', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Input
          helpMessage="help"
          input={{}}
          label="Label"
          meta={{}}
          name="TestInput"
          onChange={onChange}
          placeHolder="Input..."
          required
          style={{}}
          type="number"
        />
      </TestForm>,
    );
    wrapper.setProps({
      input: {
        onChange: inputOnChange,
        value: 1,
      },
    });
    const input = wrapper.find('Input').first();
    expect(input.props().value).toBe(1);
  });

  test('Submit called on button click', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
        onSubmit={onSubmitSpy}
      >
        <Input
          helpMessage="help"
          input={{}}
          label="Label"
          meta={{}}
          name="TestInput"
          onChange={onChange}
          placeHolder="Input..."
          required
          style={{}}
          type="number"
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
          onChange: inputOnChange,
          value: undefined,
        }}
        meta={{ error: 'Error message', touched: true, warning: '' }}
      >
        <Input
          helpMessage="help"
          input={{}}
          label="Label"
          meta={{}}
          name="TestInput"
          onChange={onChange}
          placeHolder="Input..."
          required
          style={{}}
          type="number"
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
          onChange: inputOnChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Input
          helpMessage="help"
          input={{}}
          label="Label"
          meta={{}}
          name="TestInput"
          onChange={onChange}
          placeHolder="Input..."
          required
          style={{ backgroundColor: '#000' }}
          type="number"
        />
      </TestForm>,
    );
    const inputStyle = wrapper.find('Input').first().props().style;
    expect(inputStyle).toHaveProperty('backgroundColor', '#000');
  });
});
