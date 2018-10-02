import React from 'react';
import { shallow } from 'enzyme';

import CustomField, { WrappedField } from './field';

jest.mock('./checkbox');
jest.mock('./input');
jest.mock('./select');
jest.mock('./switch');
jest.mock('./text-area');
jest.mock('./upload');
jest.mock('redux-form/lib/Field', () => 'field');

const field = {
  input: {
    change: jest.fn(),
    value: 'test',
  },
};
const options = {
  allowClear: false,
  field,
  formItemLayout: {},
  helpMessage: 'test help',
  inputType: 'number',
  label: 'TestField',
  name: 'TestField',
  onChange: jest.fn(),
  options: [],
  placeHolder: 'Test...',
  required: false,
  rows: 5,
  style: {},
};

describe('Field', () => {
  test('componentElement returns checkbox', () => {
    const component = WrappedField({ ...options, ...{ type: 'checkbox' } });
    expect(component.type().props.className).toBe('checkbox');
    expect(Object.keys(component.props).includes('formItemLayout')).toBeTruthy();
    expect(Object.keys(component.props).includes('input')).toBeTruthy();
    expect(Object.keys(component.props).includes('label')).toBeTruthy();
    expect(Object.keys(component.props).includes('onChange')).toBeTruthy();
    expect(Object.keys(component.props).includes('style')).toBeTruthy();
  });

  test('componentElement returns input', () => {
    const component = WrappedField({ ...options, ...{ type: 'input' } });
    expect(component.type().props.className).toBe('input');
    expect(Object.keys(component.props).includes('helpMessage')).toBeTruthy();
    expect(Object.keys(component.props).includes('input')).toBeTruthy();
    expect(Object.keys(component.props).includes('label')).toBeTruthy();
    expect(Object.keys(component.props).includes('meta')).toBeTruthy();
    expect(Object.keys(component.props).includes('onChange')).toBeTruthy();
    expect(Object.keys(component.props).includes('placeHolder')).toBeTruthy();
    expect(Object.keys(component.props).includes('style')).toBeTruthy();
    expect(Object.keys(component.props).includes('type')).toBeTruthy();
  });

  test('componentElement returns select', () => {
    const component = WrappedField({ ...options, ...{ type: 'select' } });
    expect(component.type().props.className).toBe('select');
    expect(Object.keys(component.props).includes('allowClear')).toBeTruthy();
    expect(Object.keys(component.props).includes('helpMessage')).toBeTruthy();
    expect(Object.keys(component.props).includes('input')).toBeTruthy();
    expect(Object.keys(component.props).includes('label')).toBeTruthy();
    expect(Object.keys(component.props).includes('meta')).toBeTruthy();
    expect(Object.keys(component.props).includes('onChange')).toBeTruthy();
    expect(Object.keys(component.props).includes('options')).toBeTruthy();
    expect(Object.keys(component.props).includes('placeHolder')).toBeTruthy();
    expect(Object.keys(component.props).includes('style')).toBeTruthy();
  });

  test('componentElement returns switch', () => {
    const component = WrappedField({ ...options, ...{ type: 'switch' } });
    expect(component.type().props.className).toBe('switch');
    expect(Object.keys(component.props).includes('helpMessage')).toBeTruthy();
    expect(Object.keys(component.props).includes('formItemLayout')).toBeTruthy();
    expect(Object.keys(component.props).includes('input')).toBeTruthy();
    expect(Object.keys(component.props).includes('label')).toBeTruthy();
    expect(Object.keys(component.props).includes('onChange')).toBeTruthy();
    expect(Object.keys(component.props).includes('style')).toBeTruthy();
  });

  test('componentElement returns text-area', () => {
    const component = WrappedField({ ...options, ...{ type: 'textArea' } });
    expect(component.type().props.className).toBe('text-area');
    expect(Object.keys(component.props).includes('helpMessage')).toBeTruthy();
    expect(Object.keys(component.props).includes('input')).toBeTruthy();
    expect(Object.keys(component.props).includes('label')).toBeTruthy();
    expect(Object.keys(component.props).includes('meta')).toBeTruthy();
    expect(Object.keys(component.props).includes('onChange')).toBeTruthy();
    expect(Object.keys(component.props).includes('placeHolder')).toBeTruthy();
    expect(Object.keys(component.props).includes('rows')).toBeTruthy();
    expect(Object.keys(component.props).includes('style')).toBeTruthy();
  });

  test('componentElement returns upload', () => {
    const component = WrappedField({ ...options, ...{ type: 'upload' } });
    expect(component.type().props.className).toBe('upload');
    expect(Object.keys(component.props).includes('input')).toBeTruthy();
    expect(Object.keys(component.props).includes('label')).toBeTruthy();
    expect(Object.keys(component.props).includes('meta')).toBeTruthy();
    expect(Object.keys(component.props).includes('onChange')).toBeTruthy();
    expect(Object.keys(component.props).includes('style')).toBeTruthy();
  });

  test('componentElement returns other', () => {
    const component = WrappedField({ ...options, ...{ type: 'other' } });
    expect(component).toBeNull();
  });

  test('Field renders', () => {
    const wrapper = shallow(
      <CustomField
        name="TestCheckbox"
        type="checkbox"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Field integration wraps checkbox', () => {
    const wrapper = shallow(
      <CustomField
        name="TestCheckbox"
        type="checkbox"
      />,
    );
    expect(wrapper.props().component(field).type().props.className).toBe('checkbox');
  });

  test('Field integration wraps input', () => {
    const wrapper = shallow(
      <CustomField
        name="TestInput"
        type="input"
      />,
    );
    expect(wrapper.props().component(field).type().props.className).toBe('input');
  });

  test('Field integration wraps select', () => {
    const wrapper = shallow(
      <CustomField
        name="TestSelect"
        type="select"
      />,
    );
    expect(wrapper.props().component(field).type().props.className).toBe('select');
  });

  test('Field integration wraps switch', () => {
    const wrapper = shallow(
      <CustomField
        name="TestSwitch"
        type="switch"
      />,
    );
    expect(wrapper.props().component(field).type().props.className).toBe('switch');
  });

  test('Field integration wraps text-area', () => {
    const wrapper = shallow(
      <CustomField
        name="TestTextArea"
        type="textArea"
      />,
    );
    expect(wrapper.props().component(field).type().props.className).toBe('text-area');
  });

  test('Field integration wraps upload', () => {
    const wrapper = shallow(
      <CustomField
        name="TestUpload"
        type="upload"
      />,
    );
    expect(wrapper.props().component(field).type().props.className).toBe('upload');
  });

  test('Field integration wraps other', () => {
    const wrapper = shallow(
      <CustomField
        name="TestUpload"
        type="other"
      />,
    );
    expect(wrapper.props().component(field)).toBeNull();
  });
});
