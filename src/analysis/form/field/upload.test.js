import React from 'react';
import { mount } from 'enzyme';

import Upload from './upload';
import TestForm from './__mocks__/form-wrapper';

const inputChange = jest.fn();
const onChange = jest.fn();
const onSubmit = jest.fn();

const file = new File([''], 'samplefile.txt', { type: 'text/plain' });
file.uid = 'rc-upload-sampleFile';

describe('Upload', () => {
  describe('without error', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <TestForm
          input={{
            change: inputChange,
            value: undefined,
          }}
          meta={{ error: '', touched: false, warning: '' }}
          onSubmit={onSubmit}
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
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should set initial file list', () => {
      const upload = wrapper.find('Upload').first();
      expect(upload.props().fileList).toEqual([]);
    });

    it('should add custom style', () => {
      const uploadStyle = wrapper.find('Button').props().style;
      expect(uploadStyle).toHaveProperty('backgroundColor', '#000');
    });

    it('should call change when file added', () => {
      onChange.mockClear();
      const input = wrapper.find('input');
      input.simulate('change', { target: { files: [file] } });
      expect(onChange).toHaveBeenCalled();
    });

    it('should set input value via input.value prop', () => {
      wrapper.setProps({
        input: {
          change: inputChange,
          value: [file],
        },
      });
      const upload = wrapper.find('Upload').first();
      expect(upload.props().fileList).toEqual([file]);
    });

    it('should call submit on button click', () => {
      onSubmit.mockClear();
      const button = wrapper.find('button').at(1);
      button.simulate('submit');
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('submit error', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
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
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have error message', () => {
      const formItem = wrapper.find('FormItem');
      expect(formItem.props().help).toBe('Error message');
    });

    it('should set validation status', () => {
      const formItem = wrapper.find('FormItem');
      expect(formItem.props().validateStatus).toBe('error');
    });
  });
});
