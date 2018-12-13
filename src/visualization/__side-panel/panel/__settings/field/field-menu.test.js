import React from 'react';
import { shallow } from 'enzyme';

import FieldMenu from './field-menu';

const onChange = jest.fn();
const onClick = jest.fn();

describe('Panel settings menu field', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <FieldMenu
        field="test"
        name="Test field"
        onChange={onChange}
        onClick={onClick}
        options={[
          { text: 'a', value: '1' },
          { text: 'b', value: '2' },
          {
            optGroup: 'group',
            options: [
              { text: 'c', value: '3' },
            ],
          },
        ]}
        store={1}
        value={1}
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

  it('should have three options elements', () => {
    expect(wrapper.find('Option').length).toBe(3);
  });

  it('should have one opt group elements', () => {
    expect(wrapper.find('OptGroup').length).toBe(1);
  });

  it('should call onChange from select', () => {
    onChange.mockClear();
    wrapper.find('Select').simulate('change', 2);
    expect(onChange).toHaveBeenCalledWith('test', 2);
  });

  it('should call onClick from button', () => {
    onClick.mockClear();
    wrapper.find('FieldButton').simulate('click');
    expect(onClick).toHaveBeenCalledWith('test');
  });
});
