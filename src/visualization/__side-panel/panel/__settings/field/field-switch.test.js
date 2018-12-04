import React from 'react';
import { shallow } from 'enzyme';

import FieldSwitch from './field-switch';

const onChange = jest.fn();
const onClick = jest.fn();

describe('Panel settings switch field', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <FieldSwitch
        checked
        field="test"
        name="Test field"
        onChange={onChange}
        onClick={onClick}
        store
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have div with name prop', () => {
    const div = wrapper.find('div').first();
    expect(div.text()).toBe('Test field');
  });

  it('should call onChange from switch', () => {
    onChange.mockClear();
    wrapper.find('Switch').simulate('change', false);
    expect(onChange).toHaveBeenCalledWith('test', false);
  });

  it('should call onClick from button', () => {
    onClick.mockClear();
    wrapper.find('FieldButton').simulate('click');
    expect(onClick).toHaveBeenCalledWith('test');
  });
});
