import React from 'react';
import { shallow } from 'enzyme';

import CustomField, { WrappedField } from './field';

jest.mock('./checkbox');
jest.mock('./select');
jest.mock('./upload');
jest.mock('redux-form/lib/Field', () => 'field');

const field = {
  input: {
    onChange: jest.fn(),
    value: 'test',
  },
};
const options = {
  errorMessage: null,
  getFieldDecorator: jest.fn(),
  field,
  name: 'TestField',
  onChange: jest.fn(),
  options: [],
  placeHolder: 'Test...',
  required: true,
  style: {},
};

describe('Field', () => {
  test('componentElement returns checkbox', () => {
    const component = WrappedField({ ...options, ...{ type: 'checkbox' } });
    expect(component.type().props.className).toBe('checkbox');
  });

  test('componentElement returns select', () => {
    const component = WrappedField({ ...options, ...{ type: 'select' } });
    expect(component.type().props.className).toBe('select');
  });

  test('componentElement returns upload', () => {
    const component = WrappedField({ ...options, ...{ type: 'upload' } });
    expect(component.type().props.className).toBe('upload');
  });

  test('componentElement returns other', () => {
    const component = WrappedField({ ...options, ...{ type: 'other' } });
    expect(component).toBeNull();
  });

  test('Field renders', () => {
    const wrapper = shallow(
      <CustomField
        getFieldDecorator={jest.fn()}
        name="TestCheckbox"
        type="checkbox"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Field integration wraps checkbox', () => {
    const wrapper = shallow(
      <CustomField
        getFieldDecorator={jest.fn()}
        name="TestCheckbox"
        type="checkbox"
      />,
    );
    expect(wrapper.props().component(field).type().props.className).toBe('checkbox');
  });

  test('Field integration wraps select', () => {
    const wrapper = shallow(
      <CustomField
        getFieldDecorator={jest.fn()}
        name="TestSelect"
        type="select"
      />,
    );
    expect(wrapper.props().component(field).type().props.className).toBe('select');
  });

  test('Field integration wraps upload', () => {
    const wrapper = shallow(
      <CustomField
        getFieldDecorator={jest.fn()}
        name="TestUpload"
        type="upload"
      />,
    );
    expect(wrapper.props().component(field).type().props.className).toBe('upload');
  });

  test('Field integration wraps other', () => {
    const wrapper = shallow(
      <CustomField
        getFieldDecorator={jest.fn()}
        name="TestUpload"
        type="other"
      />,
    );
    expect(wrapper.props().component(field)).toBeNull();
  });
});
