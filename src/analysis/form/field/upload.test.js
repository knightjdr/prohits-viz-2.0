import React from 'react';
import { mount } from 'enzyme';

import Upload, { getFile } from './upload';
import TestForm from './__mocks__/form-wrapper';

const inputOnChange = jest.fn();
const onChange = jest.fn();
const file = new File([''], 'samplefile.txt', { type: 'text/plain' });

describe('Select', () => {
  test('Renders with inital value', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: [],
        }}
      >
        <Upload
          errorMessage="Error message"
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestFile"
          onChange={onChange}
          required
          style={{}}
        />
      </TestForm>,
    );
    expect(wrapper.instance().getFieldValue('TestFile')).toEqual([]);
  });

  test('Value can be set programmatically programmatically', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: [],
        }}
      >
        <Upload
          errorMessage="Error message"
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestFile"
          onChange={onChange}
          required
          style={{}}
        />
      </TestForm>,
    );
    wrapper.instance().setFieldsValue({
      TestFile: [file],
    });
    expect(wrapper.instance().getFieldValue('TestFile')).toEqual([file]);
  });

  test('On change called when file added', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: [],
        }}
      >
        <Upload
          errorMessage="Error message"
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestFile"
          onChange={onChange}
          required
          style={{}}
        />
      </TestForm>,
    );
    const input = wrapper.find('input');
    input.simulate('change', { target: { files: [file] } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('Can be set via input.value', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: [],
        }}
      >
        <Upload
          errorMessage="Error message"
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestFile"
          onChange={onChange}
          required
          style={{}}
        />
      </TestForm>,
    );
    wrapper.setProps({
      input: {
        onChange: inputOnChange,
        value: [file],
      },
    });
    expect(wrapper.instance().getFieldValue('TestFile')).toEqual([file]);
  });

  test('Submit called on button click and submits with no errors', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: [file],
        }}
        onSubmit={onSubmitSpy}
      >
        <Upload
          errorMessage="Error message"
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestFile"
          onChange={onChange}
          required
          style={{}}
        />
      </TestForm>,
    );
    const button = wrapper.find('button [type="submit"]');
    button.simulate('submit');
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().getFieldError('TestFile')).toBeUndefined();
  });

  test('Submit when required and value is undefined gives error', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
      >
        <Upload
          errorMessage="Error message"
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestFile"
          onChange={onChange}
          required
          style={{}}
        />
      </TestForm>,
    );
    const button = wrapper.find('button [type="submit"]');
    button.simulate('submit');
    expect(wrapper.instance().getFieldError('TestFile')).toEqual(['Error message']);
  });

  test('Submit when not required and value is undefined gives no error', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
      >
        <Upload
          errorMessage="Error message"
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestFile"
          onChange={onChange}
          required={false}
          style={{}}
        />
      </TestForm>,
    );
    const button = wrapper.find('button [type="submit"]');
    button.simulate('submit');
    expect(wrapper.instance().getFieldError('TestFile')).toBeUndefined();
  });

  test('Can add custom style', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: [],
        }}
      >
        <Upload
          errorMessage="Error message"
          getFieldDecorator={jest.fn()}
          input={{}}
          name="TestFile"
          onChange={onChange}
          required
          style={{ backgroundColor: '#000' }}
        />
      </TestForm>,
    );
    const uploadStyle = wrapper.find('Button').props().style;
    expect(uploadStyle).toHaveProperty('backgroundColor', '#000');
  });

  test('getFile returns an array when given one or a fileList if given an object', () => {
    const testArr = ['a'];
    const testObj = {
      fileList: testArr,
    };
    expect(getFile(testArr)).toEqual(testArr);
    expect(getFile(testObj)).toEqual(testArr);
  });
});
