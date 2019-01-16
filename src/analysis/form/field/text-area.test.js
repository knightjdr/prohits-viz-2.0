import React from 'react';
import { mount } from 'enzyme';

import InfoModal from './info-modal';
import TextArea from './text-area';
import TestForm from './__mocks__/form-wrapper';
import UndefinedIfNotSet from '../../../helpers/undefined-if-not-set';

jest.mock('./info-modal');
jest.mock('../../../helpers/undefined-if-not-set');
UndefinedIfNotSet.mockImplementation(value => (value));

const inputOnChange = jest.fn();
const onChange = jest.fn();

describe('TextArea', () => {
  test('Renders with no value, help message and type = text', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <TextArea
          helpMessage="help"
          input={{}}
          label="Label"
          meta={{}}
          name="TestTextArea"
          onChange={onChange}
          placeHolder="TextArea..."
          style={{}}
          rows={5}
        />
      </TestForm>,
    );
    expect(wrapper).toMatchSnapshot();
    const input = wrapper.find('textarea');
    expect(input.props().defaultValue).toBeUndefined();
    expect(input.props().rows).toBe(5);
    expect(wrapper.find('svg.customfield__help').length).toBe(1);
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
        <TextArea
          input={{}}
          label="Label"
          meta={{}}
          name="TestTextArea"
          onChange={onChange}
          placeHolder="TextArea..."
          style={{}}
        />
      </TestForm>,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('svg.customfield__help').length).toBe(0);
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
        <TextArea
          helpMessage="help"
          label="Label"
          input={{}}
          meta={{}}
          name="TestTextArea"
          onChange={onChange}
          placeHolder="TextArea..."
          style={{}}
        />
      </TestForm>,
    );
    jest.clearAllMocks();
    const button = wrapper.find('.customfield__help').first();
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
        <TextArea
          helpMessage="help"
          input={{}}
          meta={{}}
          name="TestTextArea"
          onChange={onChange}
          placeHolder="TextArea..."
          style={{}}
        />
      </TestForm>,
    );
    jest.clearAllMocks();
    const button = wrapper.find('.customfield__help').first();
    button.simulate('click');
    expect(InfoModal).toHaveBeenCalledTimes(1);
    expect(InfoModal).toHaveBeenCalledWith('Help', 'help');
  });

  test('On change called on blur when input changes', () => {
    const formTextArea = {
      onChange: inputOnChange,
      value: undefined,
    };
    const wrapper = mount(
      <TestForm
        input={formTextArea}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <TextArea
          helpMessage="help"
          input={{}}
          label="Label"
          meta={{}}
          name="TestTextArea"
          onChange={onChange}
          placeHolder="TextArea..."
          style={{}}
          type="number"
        />
      </TestForm>,
    );
    jest.clearAllMocks();
    const input = wrapper.find('textarea');
    input.props().onMouseLeave(10);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(10, formTextArea);
  });

  test('On change not called on blur when input is the same', () => {
    const formTextArea = {
      onChange: inputOnChange,
      value: undefined,
    };
    const wrapper = mount(
      <TestForm
        input={formTextArea}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <TextArea
          helpMessage="help"
          input={{}}
          label="Label"
          meta={{}}
          name="TestTextArea"
          onChange={onChange}
          placeHolder="TextArea..."
          style={{}}
          type="number"
        />
      </TestForm>,
    );
    jest.clearAllMocks();
    const input = wrapper.find('textarea');
    input.props().onMouseLeave(undefined);
    expect(onChange).toHaveBeenCalledTimes(0);
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
        <TextArea
          helpMessage="help"
          input={{}}
          label="Label"
          meta={{}}
          name="TestTextArea"
          onChange={onChange}
          placeHolder="TextArea..."
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
    const input = wrapper.find('textarea');
    expect(input.props().defaultValue).toBe(1);
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
        <TextArea
          helpMessage="help"
          input={{}}
          label="Label"
          meta={{}}
          name="TestTextArea"
          onChange={onChange}
          placeHolder="TextArea..."
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
        <TextArea
          helpMessage="help"
          input={{}}
          label="Label"
          meta={{}}
          name="TestTextArea"
          onChange={onChange}
          placeHolder="TextArea..."
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
        <TextArea
          helpMessage="help"
          input={{}}
          label="Label"
          meta={{}}
          name="TestTextArea"
          onChange={onChange}
          placeHolder="TextArea..."
          style={{ backgroundColor: '#000' }}
          type="number"
        />
      </TestForm>,
    );
    const inputStyle = wrapper.find('textarea').first().props().style;
    expect(inputStyle).toHaveProperty('backgroundColor', '#000');
  });
});
