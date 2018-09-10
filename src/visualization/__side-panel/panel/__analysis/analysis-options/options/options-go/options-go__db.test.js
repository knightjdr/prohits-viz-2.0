import React from 'react';
import { shallow } from 'enzyme';

import DB from './options-go__db';

const handleCheckbox = jest.fn();
const handleGoCheckbox = jest.fn();

describe('Analysis GO options database sub panel', () => {
  let wrapper;

  beforeEach(() => {
    handleCheckbox.mockClear();
    handleGoCheckbox.mockClear();
  });

  beforeAll(() => {
    wrapper = shallow(
      <DB
        form={{
          sf_CORUM: true,
          sf_GO: true,
          sf_HP: true,
          sf_KEGG: true,
          sf_MI: true,
          sf_REAC: true,
          sf_TF: true,
          'sf_GO:BP': true,
          'sf_GO:CC': true,
          'sf_GO:MF': true,
        }}
        handleCheckbox={handleCheckbox}
        handleGoCheckbox={handleGoCheckbox}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set sf_CORUM checkbox form value', () => {
    const checkbox = wrapper.find('Checkbox').at(0);
    expect(checkbox.props().checked).toBeTruthy();
  });

  it('should call handleCheckbox for sf_CORUM', () => {
    wrapper.find('Checkbox').at(0).simulate('change');
    expect(handleCheckbox).toHaveBeenCalledWith('sf_CORUM');
  });

  it('should set sf_GO checkbox form value', () => {
    const checkbox = wrapper.find('Checkbox').at(1);
    expect(checkbox.props().checked).toBeTruthy();
  });

  it('should call handleCheckbox for sf_GO', () => {
    wrapper.find('Checkbox').at(1).simulate('change');
    expect(handleGoCheckbox).toHaveBeenCalled();
  });

  it('should set sf_GO:BP checkbox form value', () => {
    const checkbox = wrapper.find('Checkbox').at(2);
    expect(checkbox.props().checked).toBeTruthy();
  });

  it('should call handleCheckbox for sf_GO:BP', () => {
    wrapper.find('Checkbox').at(2).simulate('change');
    expect(handleCheckbox).toHaveBeenCalledWith('sf_GO:BP');
  });

  it('should set sf_GO:CC checkbox form value', () => {
    const checkbox = wrapper.find('Checkbox').at(3);
    expect(checkbox.props().checked).toBeTruthy();
  });

  it('should call handleCheckbox for sf_GO:CC', () => {
    wrapper.find('Checkbox').at(3).simulate('change');
    expect(handleCheckbox).toHaveBeenCalledWith('sf_GO:CC');
  });

  it('should set sf_GO:MF checkbox form value', () => {
    const checkbox = wrapper.find('Checkbox').at(4);
    expect(checkbox.props().checked).toBeTruthy();
  });

  it('should call handleCheckbox for sf_GO:MF', () => {
    wrapper.find('Checkbox').at(4).simulate('change');
    expect(handleCheckbox).toHaveBeenCalledWith('sf_GO:MF');
  });

  it('should set sf_HP checkbox form value', () => {
    const checkbox = wrapper.find('Checkbox').at(5);
    expect(checkbox.props().checked).toBeTruthy();
  });

  it('should call handleCheckbox for sf_HP', () => {
    wrapper.find('Checkbox').at(5).simulate('change');
    expect(handleCheckbox).toHaveBeenCalledWith('sf_HP');
  });

  it('should set sf_KEGG checkbox form value', () => {
    const checkbox = wrapper.find('Checkbox').at(6);
    expect(checkbox.props().checked).toBeTruthy();
  });

  it('should call handleCheckbox for sf_KEGG', () => {
    wrapper.find('Checkbox').at(6).simulate('change');
    expect(handleCheckbox).toHaveBeenCalledWith('sf_KEGG');
  });

  it('should set sf_MI checkbox form value', () => {
    const checkbox = wrapper.find('Checkbox').at(7);
    expect(checkbox.props().checked).toBeTruthy();
  });

  it('should call handleCheckbox for sf_MI', () => {
    wrapper.find('Checkbox').at(7).simulate('change');
    expect(handleCheckbox).toHaveBeenCalledWith('sf_MI');
  });

  it('should set sf_REAC checkbox form value', () => {
    const checkbox = wrapper.find('Checkbox').at(8);
    expect(checkbox.props().checked).toBeTruthy();
  });

  it('should call handleCheckbox for sf_REAC', () => {
    wrapper.find('Checkbox').at(8).simulate('change');
    expect(handleCheckbox).toHaveBeenCalledWith('sf_REAC');
  });

  it('should set sf_TF checkbox form value', () => {
    const checkbox = wrapper.find('Checkbox').at(9);
    expect(checkbox.props().checked).toBeTruthy();
  });

  it('should call handleCheckbox for sf_TF', () => {
    wrapper.find('Checkbox').at(9).simulate('change');
    expect(handleCheckbox).toHaveBeenCalledWith('sf_TF');
  });
});
