import React from 'react';
import { mount } from 'enzyme';

import Upload from './upload';
import TestForm from './__mocks__/form-wrapper';

const inputChange = jest.fn();
const onChange = jest.fn();
const file = new File([''], 'samplefile.txt', { type: 'text/plain' });
file.uid = 'rc-upload-sampleFile';

describe('Select', () => {
  test('Renders with inital value', () => {
    const wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Upload
          input={{}}
          meta={{}}
          name="TestFile"
          onChange={onChange}
          required
          style={{}}
        />
      </TestForm>,
    );
    const upload = wrapper.find('Upload').first();
    expect(upload.props().fileList).toEqual([]);
  });

  test('On change called when file added', () => {
    const wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: [],
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Upload
          input={{}}
          meta={{}}
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
          change: inputChange,
          value: [],
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Upload
          input={{}}
          meta={{}}
          name="TestFile"
          onChange={onChange}
          required
          style={{}}
        />
      </TestForm>,
    );
    wrapper.setProps({
      input: {
        change: inputChange,
        value: [file],
      },
    });
    const upload = wrapper.find('Upload').first();
    expect(upload.props().fileList).toEqual([file]);
  });

  test('Submit called on button click', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: [file],
        }}
        meta={{ error: '', touched: false, warning: '' }}
        onSubmit={onSubmitSpy}
      >
        <Upload
          input={{}}
          meta={{}}
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
  });

  test('Submit error adds prop visualization queue', () => {
    const wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: [],
        }}
        meta={{ error: 'Error message', touched: true, warning: '' }}
      >
        <Upload
          input={{}}
          meta={{}}
          name="TestFile"
          onChange={onChange}
          required
          style={{}}
        />
      </TestForm>,
    );
    const formItem = wrapper.find('FormItem');
    expect(formItem.props().help).toBe('Error message');
    expect(formItem.props().validateStatus).toBe('error');
  });

  test('Can add custom style', () => {
    const wrapper = mount(
      <TestForm
        input={{
          change: inputChange,
          value: [],
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Upload
          input={{}}
          meta={{}}
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
});
