import React from 'react';
import { mount } from 'enzyme';

import InfoModal from './info-modal';
import Switch from './switch';
import TestForm from './__mocks__/form-wrapper';

jest.mock('./info-modal');

const inputChange = jest.fn();
const onChange = jest.fn();
const onSubmit = jest.fn();

describe('Switch', () => {
  describe('with help text', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <TestForm
          input={{
            change: inputChange,
            value: undefined,
          }}
          meta={{}}
          onSubmit={onSubmit}
        >
          <Switch
            formItemLayout={{
              labelCol: { span: 10 },
              wrapperCol: { span: 20 },
            }}
            helpMessage="help"
            input={{}}
            label="TestSwitch"
            onChange={onChange}
            style={{ backgroundColor: '#000' }}
          />
        </TestForm>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders with false as initial value', () => {
      const switchEl = wrapper.find('Switch').first();
      expect(switchEl.props().checked).toBeFalsy();
    });

    describe('FormItem', () => {
      let formItem;

      beforeAll(() => {
        formItem = wrapper.find('FormItem');
      });

      it('should get label dimensions', () => {
        expect(formItem.props().labelCol).toEqual({ span: 10 });
      });

      it('should get wrapper dimensions', () => {
        expect(formItem.props().wrapperCol).toEqual({ span: 20 });
      });
    });

    it('should call change called on switch', () => {
      const switchEl = wrapper.find('Switch').first();
      switchEl.simulate('click');
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should set value via input.value', () => {
      wrapper.setProps({
        input: {
          change: inputChange,
          value: true,
        },
      });
      const switchEl = wrapper.find('Switch').first();
      expect(switchEl.props().checked).toBeTruthy();
    });

    describe('on submit', () => {
      beforeAll(() => {
        onSubmit.mockClear();
        const button = wrapper.find('button');
        button.simulate('submit');
      });

      it('should call submit function', () => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });
    });

    it('should render help', () => {
      expect(wrapper.find('svg.CustomField-switch-help').length).toBe(1);
    });

    it('should add custom style', () => {
      const checkboxStyle = wrapper.find('Switch').first().props().style;
      expect(checkboxStyle).toHaveProperty('backgroundColor', '#000');
    });

    it('should open modal with label title', () => {
      InfoModal.mockClear();
      const button = wrapper.find('.CustomField-switch-help').first();
      button.simulate('click');
      expect(InfoModal).toHaveBeenCalledWith('TestSwitch', 'help');
    });
  });

  describe('without help text', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <TestForm
          input={{
            change: inputChange,
            value: undefined,
          }}
          meta={{}}
          onSubmit={onSubmit}
        >
          <Switch
            formItemLayout={{
              labelCol: { span: 10 },
              wrapperCol: { span: 20 },
            }}
            input={{}}
            label="TestSwitch"
            onChange={onChange}
            style={{}}
          />
        </TestForm>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('without label', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <TestForm
          input={{
            change: inputChange,
            value: undefined,
          }}
          meta={{}}
          onSubmit={onSubmit}
        >
          <Switch
            formItemLayout={{
              labelCol: { span: 10 },
              wrapperCol: { span: 20 },
            }}
            helpMessage="help"
            input={{}}
            onChange={onChange}
            style={{ backgroundColor: '#000' }}
          />
        </TestForm>,
      );
    });

    it('should open modal with default help title', () => {
      InfoModal.mockClear();
      wrapper.setProps({ label: null });
      const button = wrapper.find('.CustomField-switch-help').first();
      button.simulate('click');
      expect(InfoModal).toHaveBeenCalledWith('Help', 'help');
    });
  });
});
