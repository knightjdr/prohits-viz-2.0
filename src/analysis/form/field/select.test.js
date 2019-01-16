import React from 'react';
import { mount } from 'enzyme';

import InfoModal from './info-modal';
import Select from './select';
import TestForm from './__mocks__/form-wrapper';

jest.mock('./info-modal');

const inputOnChange = jest.fn();
const onChange = jest.fn();
const onSubmit = jest.fn();

const options = [
  { text: 'option1', value: 1 },
  { text: 'option2', value: 2 },
];
const optionsGroup = [
  {
    group: true,
    text: 'group1',
    children: [
      { text: 'option1', value: 1 },
    ],
  },
  { text: 'option2', value: 2 },
];

describe('Select', () => {
  describe('with no value but with help message', () => {
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
          <Select
            allowClear
            helpMessage="help"
            input={{}}
            label="Label"
            meta={{}}
            name="TestSelect"
            onChange={onChange}
            options={options}
            placeHolder="Select..."
            required
            style={{ backgroundColor: '#000' }}
          />
        </TestForm>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have no value', () => {
      const select = wrapper.find('Select').first();
      expect(select.props().value).toBeUndefined();
    });

    it('should have help', () => {
      expect(wrapper.find('svg.customfield__help').length).toBe(1);
    });

    it('should have default mode', () => {
      const select = wrapper.find('Select').first();
      expect(select.props().mode).toBe('default');
    });

    it('should have custom style', () => {
      const selectStyle = wrapper.find('Select').first().props().style;
      expect(selectStyle).toHaveProperty('backgroundColor', '#000');
    });

    it('should open modal', () => {
      InfoModal.mockClear();
      const button = wrapper.find('.customfield__help').first();
      button.simulate('click');
      expect(InfoModal).toHaveBeenCalledWith('Label', 'help');
    });

    it('should call onChange when option changes', () => {
      onChange.mockClear();
      const select = wrapper.find('Select').first();
      select.props().onChange();
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should call submit on button click', () => {
      onSubmit.mockClear();
      const button = wrapper.find('button');
      button.simulate('submit');
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('with multiple option', () => {
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
          <Select
            allowClear
            helpMessage="help"
            input={{}}
            label="Label"
            meta={{}}
            multiple
            name="TestSelect"
            onChange={onChange}
            options={options}
            placeHolder="Select..."
            required
            style={{ backgroundColor: '#000' }}
          />
        </TestForm>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have multiple mode', () => {
      const select = wrapper.find('Select').first();
      expect(select.props().mode).toBe('multiple');
    });
  });

  describe('with no help message', () => {
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
          <Select
            allowClear
            input={{}}
            label="Label"
            meta={{}}
            name="TestSelect"
            onChange={onChange}
            options={options}
            placeHolder="Select..."
            required
            style={{}}
          />
        </TestForm>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not have help', () => {
      expect(wrapper.find('svg.customfield__help').length).toBe(0);
    });
  });

  it('should open modal without label text', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Select
          allowClear
          helpMessage="help"
          input={{}}
          meta={{}}
          name="TestSelect"
          onChange={onChange}
          options={options}
          placeHolder="Select..."
          required
          style={{}}
        />
      </TestForm>,
    );
    InfoModal.mockClear();
    const button = wrapper.find('.customfield__help').first();
    button.simulate('click');
    expect(InfoModal).toHaveBeenCalledWith('Help', 'help');
  });

  it('should renders with an option group', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Select
          allowClear
          input={{}}
          meta={{}}
          name="TestSelect"
          onChange={onChange}
          options={optionsGroup}
          placeHolder="Select..."
          required
          style={{}}
        />
      </TestForm>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should set input value via input prop', () => {
    const wrapper = mount(
      <TestForm
        input={{
          onChange: inputOnChange,
          value: undefined,
        }}
        meta={{ error: '', touched: false, warning: '' }}
      >
        <Select
          allowClear
          input={{}}
          meta={{}}
          name="TestSelect"
          onChange={onChange}
          options={options}
          placeHolder="Select..."
          required
          style={{}}
        />
      </TestForm>,
    );
    wrapper.setProps({
      input: {
        onChange: inputOnChange,
        value: 1,
      },
    });
    const select = wrapper.find('Select').first();
    expect(select.props().value).toBe(1);
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
          <Select
            allowClear
            input={{}}
            meta={{}}
            name="TestSelect"
            onChange={onChange}
            options={options}
            placeHolder="Select..."
            required
            style={{}}
          />
        </TestForm>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should set error message', () => {
      const formItem = wrapper.find('FormItem');
      expect(formItem.props().help).toBe('Error message');
    });

    it('should set error status', () => {
      const formItem = wrapper.find('FormItem');
      expect(formItem.props().validateStatus).toBe('error');
    });
  });
});
