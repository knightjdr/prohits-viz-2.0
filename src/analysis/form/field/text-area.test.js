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
const onSubmit = jest.fn();

describe('TextArea', () => {
  describe('with help message', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <TestForm
          input={{
            onChange: inputOnChange,
            value: undefined,
          }}
          meta={{ error: '', touched: false, warning: '' }}
          onSubmit={onSubmit}
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
            rows={5}
          />
        </TestForm>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render with no value', () => {
      const input = wrapper.find('textarea');
      expect(input.props().defaultValue).toBeUndefined();
    });

    it('should render 5 rows', () => {
      const input = wrapper.find('textarea');
      expect(input.props().rows).toBe(5);
    });

    it('should render help', () => {
      expect(wrapper.find('svg.customfield__help').length).toBe(1);
    });

    it('should add custom style', () => {
      const inputStyle = wrapper.find('textarea').first().props().style;
      expect(inputStyle).toHaveProperty('backgroundColor', '#000');
    });

    it('should open modal on click', () => {
      InfoModal.mockClear();
      const button = wrapper.find('.customfield__help').first();
      button.simulate('click');
      expect(InfoModal).toHaveBeenCalledWith('Label', 'help');
    });

    it('should not call change on blur when input does not', () => {
      onChange.mockClear();
      const input = wrapper.find('textarea');
      input.props().onBlur(undefined);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should call change on blur when input changes', () => {
      onChange.mockClear();
      const expected = {
        onChange: inputOnChange,
        value: undefined,
      };
      const input = wrapper.find('textarea');
      input.props().onBlur(10);
      expect(onChange).toHaveBeenCalledWith(10, expected);
    });

    it('should set inpute value via input.value prop', () => {
      wrapper.setProps({
        input: {
          onChange: inputOnChange,
          value: 1,
        },
      });
      const input = wrapper.find('textarea');
      expect(input.props().defaultValue).toBe(1);
    });

    it('should call submit on button click', () => {
      onSubmit.mockClear();
      const button = wrapper.find('button');
      button.simulate('submit');
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('without help message', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
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
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not have help message', () => {
      expect(wrapper.find('svg.customfield__help').length).toBe(0);
    });
  });

  describe('no label', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
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
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should open modal on click', () => {
      InfoModal.mockClear();
      const button = wrapper.find('.customfield__help').first();
      button.simulate('click');
      expect(InfoModal).toHaveBeenCalledWith('Help', 'help');
    });
  });

  describe('submit error', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
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
