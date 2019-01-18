import React from 'react';
import { mount } from 'enzyme';

import AutoComplete from './auto-complete';
import InfoModal from './info-modal';
import TestForm from './__mocks__/form-wrapper';

jest.mock('./info-modal');

const inputChange = jest.fn();
const handleSearch = jest.fn();
const onChange = jest.fn();
const onSelect = jest.fn();
const onSubmit = jest.fn();

describe('Auto complete', () => {
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
          <AutoComplete
            dataSource={[]}
            handleSearch={handleSearch}
            helpMessage="help"
            input={{}}
            label="Label"
            meta={{}}
            onChange={onChange}
            onSelect={onSelect}
            placeHolder="Auto complete"
            style={{ backgroundColor: '#000' }}
            value={undefined}
          />
        </TestForm>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have no value', () => {
      const select = wrapper.find('AutoComplete').first();
      expect(select.props().value).toBeUndefined();
    });

    it('should have help', () => {
      expect(wrapper.find('svg.customfield__help').length).toBe(1);
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

    it('should call onSelect on blur', () => {
      onSelect.mockClear();
      const autoComplete = wrapper.find('AutoComplete').first();
      autoComplete.props().onBlur();
      expect(onSelect).toHaveBeenCalled();
    });

    it('should call onChange when input changes', () => {
      onChange.mockClear();
      const autoComplete = wrapper.find('AutoComplete').first();
      autoComplete.props().onChange();
      expect(onChange).toHaveBeenCalled();
    });

    it('should call onSelect when option selected', () => {
      onSelect.mockClear();
      const autoComplete = wrapper.find('AutoComplete').first();
      autoComplete.props().onSelect();
      expect(onSelect).toHaveBeenCalled();
    });

    it('should call handleSearch on search', () => {
      handleSearch.mockClear();
      const autoComplete = wrapper.find('AutoComplete').first();
      autoComplete.props().onSearch();
      expect(handleSearch).toHaveBeenCalled();
    });
  });

  describe('with no help message', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <TestForm
          input={{
            onChange: inputChange,
            value: undefined,
          }}
          meta={{ error: '', touched: false, warning: '' }}
        >
          <AutoComplete
            dataSource={[]}
            handleSearch={handleSearch}
            helpMessage=""
            input={{}}
            label="Label"
            meta={{}}
            onChange={onChange}
            onSelect={onSelect}
            placeHolder="Auto complete"
            style={{ backgroundColor: '#000' }}
            value={undefined}
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

  describe('with no label', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <TestForm
          input={{
            onChange: inputChange,
            value: undefined,
          }}
          meta={{ error: '', touched: false, warning: '' }}
        >
          <AutoComplete
            dataSource={[]}
            handleSearch={handleSearch}
            helpMessage="help"
            input={{}}
            label=""
            meta={{}}
            onChange={onChange}
            onSelect={onSelect}
            placeHolder="Auto complete"
            style={{ backgroundColor: '#000' }}
            value={undefined}
          />
        </TestForm>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should open modal without label text', () => {
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
            change: inputChange,
            value: undefined,
          }}
          meta={{ error: 'Error message', touched: true, warning: '' }}
        >
          <AutoComplete
            dataSource={[]}
            handleSearch={handleSearch}
            helpMessage="help"
            input={{}}
            label="Label"
            meta={{}}
            onChange={onChange}
            onSelect={onSelect}
            placeHolder="Auto complete"
            style={{ backgroundColor: '#000' }}
            value={undefined}
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
