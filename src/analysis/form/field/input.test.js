import React from 'react';
import { mount } from 'enzyme';

import InfoModal from './info-modal';
import Input from './input';
import TestForm from './__mocks__/form-wrapper';
import UndefinedIfNotSet from '../../../helpers/undefined-if-not-set';

jest.mock('./info-modal');
jest.mock('../../../helpers/undefined-if-not-set');
UndefinedIfNotSet.mockImplementation(value => (value));

const inputOnChange = jest.fn();
const onChange = jest.fn();
const onSubmit = jest.fn();

describe('Input', () => {
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
          <Input
            helpMessage="help"
            input={{}}
            label="Label"
            meta={{}}
            name="TestInput"
            onChange={onChange}
            placeHolder="Input..."
            style={{ backgroundColor: '#000' }}
          />
        </TestForm>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render with default input type', () => {
      const input = wrapper.find('Input').first();
      expect(input.props().type).toBe('text');
    });

    it('should set initial value', () => {
      const input = wrapper.find('Input').first();
      expect(input.props().defaultValue).toBeUndefined();
    });

    it('should render help', () => {
      expect(wrapper.find('svg.customfield__help').length).toBe(1);
    });

    it('should add custom style', () => {
      const inputStyle = wrapper.find('Input').first().props().style;
      expect(inputStyle).toHaveProperty('backgroundColor', '#000');
    });

    it('should call modal on button click', () => {
      InfoModal.mockClear();
      const button = wrapper.find('.customfield__help').first();
      button.simulate('click');
      expect(InfoModal).toHaveBeenCalledWith('Label', 'help');
    });

    it('should call change on enter', () => {
      onChange.mockClear();
      const expected = {
        onChange: inputOnChange,
        value: undefined,
      };
      const input = wrapper.find('Input').first();
      input.props().onPressEnter({ target: { value: 10 } });
      expect(onChange).toHaveBeenCalledWith(10, expected);
    });

    it('should not call on change on blur when input is the same', () => {
      onChange.mockClear();
      const input = wrapper.find('Input').first();
      input.props().onBlur({ target: { value: undefined } });
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should call onchange on blur when input changes', () => {
      onChange.mockClear();
      const expected = {
        onChange: inputOnChange,
        value: undefined,
      };
      const input = wrapper.find('Input').first();
      input.props().onBlur({ target: { value: 10 } });
      expect(onChange).toHaveBeenCalledWith(10, expected);
    });

    it('should set via input.value', () => {
      wrapper.setProps({
        input: {
          onChange: inputOnChange,
          value: 1,
        },
      });
      const input = wrapper.find('Input').first();
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
          <Input
            input={{}}
            label="Label"
            meta={{}}
            name="TestInput"
            onChange={onChange}
            placeHolder="Input..."
            style={{}}
          />
        </TestForm>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not render help', () => {
      expect(wrapper.find('svg.customfield__help').length).toBe(0);
    });
  });

  describe('without label', () => {
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
          <Input
            helpMessage="help"
            input={{}}
            meta={{}}
            name="TestInput"
            onChange={onChange}
            placeHolder="Input..."
            style={{}}
          />
        </TestForm>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call modal on button click without title text', () => {
      InfoModal.mockClear();
      const button = wrapper.find('.customfield__help').first();
      button.simulate('click');
      expect(InfoModal).toHaveBeenCalledWith('Help', 'help');
    });
  });

  describe('with input type', () => {
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
          <Input
            helpMessage="help"
            input={{}}
            label="Label"
            meta={{}}
            name="TestInput"
            onChange={onChange}
            placeHolder="Input..."
            style={{}}
            type="number"
          />
        </TestForm>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render with specified type', () => {
      const input = wrapper.find('Input').first();
      expect(input.props().type).toBe('number');
    });
  });

  describe('with submit error', () => {
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
          <Input
            helpMessage="help"
            input={{}}
            label="Label"
            meta={{}}
            name="TestInput"
            onChange={onChange}
            placeHolder="Input..."
            style={{}}
            type="number"
          />
        </TestForm>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should add error message', () => {
      const formItem = wrapper.find('FormItem');
      expect(formItem.props().help).toBe('Error message');
    });

    it('should add error status', () => {
      const formItem = wrapper.find('FormItem');
      expect(formItem.props().validateStatus).toBe('error');
    });
  });
});
