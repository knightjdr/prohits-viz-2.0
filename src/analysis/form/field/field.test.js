import React from 'react';
import { shallow } from 'enzyme';

import CustomField, { WrappedField } from './field';

jest.mock('./auto-complete-container');
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
  field,
  otherProp: true,
};

describe('Field', () => {
  describe('auto complete', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = WrappedField({ ...options, ...{ type: 'autocomplete' } });
    });

    it('should have autocomplete class', () => {
      expect(wrapper.type().props.className).toBe('autocomplete');
    });

    it('should have input prop', () => {
      expect(Object.keys(wrapper.props).includes('input')).toBeTruthy();
    });

    it('should have meta prop', () => {
      expect(Object.keys(wrapper.props).includes('meta')).toBeTruthy();
    });

    it('should have other prop', () => {
      expect(Object.keys(wrapper.props).includes('otherProp')).toBeTruthy();
    });
  });

  describe('checkbox', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = WrappedField({ ...options, ...{ type: 'checkbox' } });
    });

    it('should have checkbox class', () => {
      expect(wrapper.type().props.className).toBe('checkbox');
    });

    it('should have input prop', () => {
      expect(Object.keys(wrapper.props).includes('input')).toBeTruthy();
    });

    it('should have other prop', () => {
      expect(Object.keys(wrapper.props).includes('otherProp')).toBeTruthy();
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

    it('should have input prop', () => {
      expect(Object.keys(wrapper.props).includes('input')).toBeTruthy();
    });

    it('should have meta prop', () => {
      expect(Object.keys(wrapper.props).includes('meta')).toBeTruthy();
    });

    it('should have other prop', () => {
      expect(Object.keys(wrapper.props).includes('otherProp')).toBeTruthy();
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

    it('should have input prop', () => {
      expect(Object.keys(wrapper.props).includes('input')).toBeTruthy();
    });

    it('should have meta prop', () => {
      expect(Object.keys(wrapper.props).includes('meta')).toBeTruthy();
    });

    it('should have other prop', () => {
      expect(Object.keys(wrapper.props).includes('otherProp')).toBeTruthy();
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

    it('should have input prop', () => {
      expect(Object.keys(wrapper.props).includes('input')).toBeTruthy();
    });

    it('should have other prop', () => {
      expect(Object.keys(wrapper.props).includes('otherProp')).toBeTruthy();
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

    it('should have input prop', () => {
      expect(Object.keys(wrapper.props).includes('input')).toBeTruthy();
    });

    it('should have meta prop', () => {
      expect(Object.keys(wrapper.props).includes('meta')).toBeTruthy();
    });

    it('should have other prop', () => {
      expect(Object.keys(wrapper.props).includes('otherProp')).toBeTruthy();
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

    it('should have input prop', () => {
      expect(Object.keys(wrapper.props).includes('input')).toBeTruthy();
    });

    it('should have meta prop', () => {
      expect(Object.keys(wrapper.props).includes('meta')).toBeTruthy();
    });

    it('should have other prop', () => {
      expect(Object.keys(wrapper.props).includes('otherProp')).toBeTruthy();
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

  it('should wrap autocomplete with field', () => {
    const wrapper = shallow(
      <CustomField
        name="TestAutoComplete"
        type="autocomplete"
      />,
    );
    expect(wrapper.props().component(field).type().props.className).toBe('autocomplete');
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
