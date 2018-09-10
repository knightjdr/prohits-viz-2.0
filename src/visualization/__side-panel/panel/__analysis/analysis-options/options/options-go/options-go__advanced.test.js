import React from 'react';
import { shallow } from 'enzyme';

import Advanced from './options-go__advanced';

const handleCheckbox = jest.fn();
const handleInput = jest.fn();
const handleSelect = jest.fn();

describe('Analysis GO options advanced sub panel', () => {
  let wrapper;

  beforeEach(() => {
    handleCheckbox.mockClear();
    handleInput.mockClear();
    handleSelect.mockClear();
  });

  beforeAll(() => {
    wrapper = shallow(
      <Advanced
        form={{
          domain_size_type: 'known',
          hierfiltering: '',
          max_set_size: 0,
          min_isect_size: 0,
          min_set_size: 0,
          no_iea: false,
          ordered_query: false,
          region_query: false,
          significant: true,
          sort_by_structure: true,
          threshold_algo: 'analytical',
          underrep: false,
          user_thr: 0.01,
        }}
        handleCheckbox={handleCheckbox}
        handleInput={handleInput}
        handleSelect={handleSelect}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set region_query checkbox form value', () => {
    const checkbox = wrapper.find('Checkbox').at(0);
    expect(checkbox.props().checked).toBeFalsy();
  });

  it('should call handleCheckbox for region_query', () => {
    wrapper.find('Checkbox').at(0).simulate('change');
    expect(handleCheckbox).toHaveBeenCalledWith('region_query');
  });

  it('should set sort_by_structure checkbox form value', () => {
    const checkbox = wrapper.find('Checkbox').at(1);
    expect(checkbox.props().checked).toBeTruthy();
  });

  it('should call handleCheckbox for sort_by_structure', () => {
    wrapper.find('Checkbox').at(1).simulate('change');
    expect(handleCheckbox).toHaveBeenCalledWith('sort_by_structure');
  });

  it('should set underrep checkbox form value', () => {
    const checkbox = wrapper.find('Checkbox').at(2);
    expect(checkbox.props().checked).toBeFalsy();
  });

  it('should call handleCheckbox for underrep', () => {
    wrapper.find('Checkbox').at(2).simulate('change');
    expect(handleCheckbox).toHaveBeenCalledWith('underrep');
  });

  it('should set no_iea checkbox form value', () => {
    const checkbox = wrapper.find('Checkbox').at(3);
    expect(checkbox.props().checked).toBeFalsy();
  });

  it('should call handleCheckbox for no_iea', () => {
    wrapper.find('Checkbox').at(3).simulate('change');
    expect(handleCheckbox).toHaveBeenCalledWith('no_iea');
  });

  it('should set ordered_query checkbox form value', () => {
    const checkbox = wrapper.find('Checkbox').at(4);
    expect(checkbox.props().checked).toBeFalsy();
  });

  it('should call handleCheckbox for ordered_query', () => {
    wrapper.find('Checkbox').at(4).simulate('change');
    expect(handleCheckbox).toHaveBeenCalledWith('ordered_query');
  });

  it('should set significant checkbox form value', () => {
    const checkbox = wrapper.find('Checkbox').at(5);
    expect(checkbox.props().checked).toBeTruthy();
  });

  it('should call handleCheckbox for significant', () => {
    wrapper.find('Checkbox').at(5).simulate('change');
    expect(handleCheckbox).toHaveBeenCalledWith('significant');
  });

  it('should set min_set_size select form value', () => {
    const select = wrapper.find('Select').at(0);
    expect(select.props().value).toBe(0);
  });

  it('should call handleSelect for min_set_size', () => {
    wrapper.find('Select').at(0).simulate('change', 5);
    expect(handleSelect).toHaveBeenCalledWith('min_set_size', 5);
  });

  it('should set max_set_size select form value', () => {
    const select = wrapper.find('Select').at(1);
    expect(select.props().value).toBe(0);
  });

  it('should call handleSelect for max_set_size', () => {
    wrapper.find('Select').at(1).simulate('change', 50);
    expect(handleSelect).toHaveBeenCalledWith('max_set_size', 50);
  });

  it('should set hierfiltering select form value', () => {
    const select = wrapper.find('Select').at(2);
    expect(select.props().value).toBe('');
  });

  it('should call handleSelect for hierfiltering', () => {
    wrapper.find('Select').at(2).simulate('change', 'compact_rgroups');
    expect(handleSelect).toHaveBeenCalledWith('hierfiltering', 'compact_rgroups');
  });

  it('should set min_isect_size select form value', () => {
    const select = wrapper.find('Select').at(3);
    expect(select.props().value).toBe(0);
  });

  it('should call handleSelect for min_isect_size', () => {
    wrapper.find('Select').at(3).simulate('change', 2);
    expect(handleSelect).toHaveBeenCalledWith('min_isect_size', 2);
  });

  it('should set threshold_algo select form value', () => {
    const select = wrapper.find('Select').at(4);
    expect(select.props().value).toBe('analytical');
  });

  it('should call handleSelect for threshold_algo', () => {
    wrapper.find('Select').at(4).simulate('change', 'bonferroni');
    expect(handleSelect).toHaveBeenCalledWith('threshold_algo', 'bonferroni');
  });

  it('should set domain_size_type select form value', () => {
    const select = wrapper.find('Select').at(5);
    expect(select.props().value).toBe('known');
  });

  it('should call handleSelect for domain_size_type', () => {
    wrapper.find('Select').at(5).simulate('change', 'annotated');
    expect(handleSelect).toHaveBeenCalledWith('domain_size_type', 'annotated');
  });

  it('should set user_thr input form value', () => {
    const input = wrapper.find('InputNumber');
    expect(input.props().value).toBe(0.01);
  });

  it('should call handleInput for user_thr', () => {
    wrapper.find('InputNumber').simulate('change', 0.05);
    expect(handleInput).toHaveBeenCalledWith('user_thr', 0.05);
  });
});
