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
  describe('checkbox', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = WrappedField({ ...options, ...{ type: 'checkbox' } });
    });

    it('should have checkbox class', () => {
      expect(wrapper.type().props.className).toBe('checkbox');
    });

    it('should have formItemLayout', () => {
      expect(Object.keys(wrapper.props).includes('formItemLayout')).toBeTruthy();
    });

    it('should have input', () => {
      expect(Object.keys(wrapper.props).includes('input')).toBeTruthy();
    });

    it('should have label', () => {
      expect(Object.keys(wrapper.props).includes('label')).toBeTruthy();
    });

    it('should have onChange', () => {
      expect(Object.keys(wrapper.props).includes('onChange')).toBeTruthy();
    });

    it('should have style', () => {
      expect(Object.keys(wrapper.props).includes('style')).toBeTruthy();
    });
  });

  describe('input', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = WrappedField({ ...options, ...{ type: 'input' } });
    });

    it('should have input class', () => {
      expect(wrapper.type().props.className).toBe('input');
    });

    it('should have helpMessage', () => {
      expect(Object.keys(wrapper.props).includes('helpMessage')).toBeTruthy();
    });

    it('should have input', () => {
      expect(Object.keys(wrapper.props).includes('input')).toBeTruthy();
    });

    it('should have label', () => {
      expect(Object.keys(wrapper.props).includes('label')).toBeTruthy();
    });

    it('should have meta', () => {
      expect(Object.keys(wrapper.props).includes('meta')).toBeTruthy();
    });

    it('should have onChange', () => {
      expect(Object.keys(wrapper.props).includes('onChange')).toBeTruthy();
    });

    it('should have placeHolder', () => {
      expect(Object.keys(wrapper.props).includes('placeHolder')).toBeTruthy();
    });

    it('should have style', () => {
      expect(Object.keys(wrapper.props).includes('style')).toBeTruthy();
    });

    it('should have type', () => {
      expect(Object.keys(wrapper.props).includes('type')).toBeTruthy();
    });
  });

  describe('select', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = WrappedField({ ...options, ...{ type: 'select' } });
    });

    it('should have select class', () => {
      expect(wrapper.type().props.className).toBe('select');
    });

    it('should have allowClear', () => {
      expect(Object.keys(wrapper.props).includes('allowClear')).toBeTruthy();
    });

    it('should have helpMessage', () => {
      expect(Object.keys(wrapper.props).includes('helpMessage')).toBeTruthy();
    });

    it('should have input', () => {
      expect(Object.keys(wrapper.props).includes('input')).toBeTruthy();
    });

    it('should have label', () => {
      expect(Object.keys(wrapper.props).includes('label')).toBeTruthy();
    });

    it('should have meta', () => {
      expect(Object.keys(wrapper.props).includes('meta')).toBeTruthy();
    });

    it('should have multiple', () => {
      expect(Object.keys(wrapper.props).includes('multiple')).toBeTruthy();
    });

    it('should have onChange', () => {
      expect(Object.keys(wrapper.props).includes('onChange')).toBeTruthy();
    });

    it('should have options', () => {
      expect(Object.keys(wrapper.props).includes('options')).toBeTruthy();
    });

    it('should have placeHolder', () => {
      expect(Object.keys(wrapper.props).includes('placeHolder')).toBeTruthy();
    });

    it('should have style', () => {
      expect(Object.keys(wrapper.props).includes('style')).toBeTruthy();
    });
  });

  describe('switch', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = WrappedField({ ...options, ...{ type: 'switch' } });
    });

    it('should have switch class', () => {
      expect(wrapper.type().props.className).toBe('switch');
    });

    it('should have formItemLayout', () => {
      expect(Object.keys(wrapper.props).includes('formItemLayout')).toBeTruthy();
    });

    it('should have helpMessage', () => {
      expect(Object.keys(wrapper.props).includes('helpMessage')).toBeTruthy();
    });

    it('should have input', () => {
      expect(Object.keys(wrapper.props).includes('input')).toBeTruthy();
    });

    it('should have label', () => {
      expect(Object.keys(wrapper.props).includes('label')).toBeTruthy();
    });

    it('should have onChange', () => {
      expect(Object.keys(wrapper.props).includes('onChange')).toBeTruthy();
    });

    it('should have style', () => {
      expect(Object.keys(wrapper.props).includes('style')).toBeTruthy();
    });
  });

  describe('text-area', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = WrappedField({ ...options, ...{ type: 'textArea' } });
    });

    it('should have text-area class', () => {
      expect(wrapper.type().props.className).toBe('text-area');
    });

    it('should have helpMessage', () => {
      expect(Object.keys(wrapper.props).includes('helpMessage')).toBeTruthy();
    });

    it('should have input', () => {
      expect(Object.keys(wrapper.props).includes('input')).toBeTruthy();
    });

    it('should have label', () => {
      expect(Object.keys(wrapper.props).includes('label')).toBeTruthy();
    });

    it('should have meta', () => {
      expect(Object.keys(wrapper.props).includes('meta')).toBeTruthy();
    });

    it('should have onChange', () => {
      expect(Object.keys(wrapper.props).includes('onChange')).toBeTruthy();
    });

    it('should have placeHolder', () => {
      expect(Object.keys(wrapper.props).includes('placeHolder')).toBeTruthy();
    });

    it('should have rows', () => {
      expect(Object.keys(wrapper.props).includes('rows')).toBeTruthy();
    });

    it('should have style', () => {
      expect(Object.keys(wrapper.props).includes('style')).toBeTruthy();
    });
  });

  describe('upload', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = WrappedField({ ...options, ...{ type: 'upload' } });
    });

    it('should have upload class', () => {
      expect(wrapper.type().props.className).toBe('upload');
    });

    it('should have input', () => {
      expect(Object.keys(wrapper.props).includes('input')).toBeTruthy();
    });

    it('should have label', () => {
      expect(Object.keys(wrapper.props).includes('label')).toBeTruthy();
    });

    it('should have meta', () => {
      expect(Object.keys(wrapper.props).includes('meta')).toBeTruthy();
    });

    it('should have onChange', () => {
      expect(Object.keys(wrapper.props).includes('onChange')).toBeTruthy();
    });

    it('should have style', () => {
      expect(Object.keys(wrapper.props).includes('style')).toBeTruthy();
    });
  });

  it('should return null for other component type', () => {
    const wrapper = WrappedField({ ...options, ...{ type: 'other' } });
    expect(wrapper).toBeNull();
  });

  it('should render field', () => {
    const wrapper = shallow(
      <CustomField
        name="TestCheckbox"
        type="checkbox"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should wrap checkbox with field', () => {
    const wrapper = shallow(
      <CustomField
        name="TestCheckbox"
        type="checkbox"
      />,
    );
    expect(wrapper.props().component(field).type().props.className).toBe('checkbox');
  });

  it('should wrap input with field', () => {
    const wrapper = shallow(
      <CustomField
        name="TestInput"
        type="input"
      />,
    );
    expect(wrapper.props().component(field).type().props.className).toBe('input');
  });

  it('should wrap select with field', () => {
    const wrapper = shallow(
      <CustomField
        name="TestSelect"
        type="select"
      />,
    );
    expect(wrapper.props().component(field).type().props.className).toBe('select');
  });

  it('should wrap switch with field', () => {
    const wrapper = shallow(
      <CustomField
        name="TestSwitch"
        type="switch"
      />,
    );
    expect(wrapper.props().component(field).type().props.className).toBe('switch');
  });

  it('should wrap text-area with field', () => {
    const wrapper = shallow(
      <CustomField
        name="TestTextArea"
        type="textArea"
      />,
    );
    expect(wrapper.props().component(field).type().props.className).toBe('text-area');
  });

  it('should wrap upload with field', () => {
    const wrapper = shallow(
      <CustomField
        name="TestUpload"
        type="upload"
      />,
    );
    expect(wrapper.props().component(field).type().props.className).toBe('upload');
  });

  it('should wrap other with field', () => {
    const wrapper = shallow(
      <CustomField
        name="TestUpload"
        type="other"
      />,
    );
    expect(wrapper.props().component(field)).toBeNull();
  });
});
