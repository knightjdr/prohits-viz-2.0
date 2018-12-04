import React from 'react';
import { shallow } from 'enzyme';

import Filter from './panel__settings-filter';

const changeSetting = jest.fn();
const updateSetting = jest.fn();

const settings = {
  abundanceCap: 50,
  minAbundance: 0,
  primaryFilter: 0.01,
  secondaryFilter: 0.05,
};

describe('Filter panel settings', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Filter
        changeSetting={changeSetting}
        settings={settings}
        storeSettings={settings}
        updateSetting={updateSetting}
      />,
    );
  });


  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call changeSetting from first input', () => {
    changeSetting.mockClear();
    wrapper.find('Input').at(0).simulate('change');
    expect(changeSetting).toHaveBeenCalled();
  });

  it('should call updateSetting from first input', () => {
    updateSetting.mockClear();
    wrapper.find('Input').at(0).simulate('click');
    expect(updateSetting).toHaveBeenCalled();
  });

  it('should call changeSetting from second input', () => {
    changeSetting.mockClear();
    wrapper.find('Input').at(1).simulate('change');
    expect(changeSetting).toHaveBeenCalled();
  });

  it('should call updateSetting from second input', () => {
    updateSetting.mockClear();
    wrapper.find('Input').at(1).simulate('click');
    expect(updateSetting).toHaveBeenCalled();
  });

  it('should call changeSetting from third input', () => {
    changeSetting.mockClear();
    wrapper.find('Input').at(2).simulate('change');
    expect(changeSetting).toHaveBeenCalled();
  });

  it('should call updateSetting from third input', () => {
    updateSetting.mockClear();
    wrapper.find('Input').at(2).simulate('click');
    expect(updateSetting).toHaveBeenCalled();
  });

  it('should call changeSetting from fourth input', () => {
    changeSetting.mockClear();
    wrapper.find('Input').at(3).simulate('change');
    expect(changeSetting).toHaveBeenCalled();
  });

  it('should call updateSetting from fourth input', () => {
    updateSetting.mockClear();
    wrapper.find('Input').at(3).simulate('click');
    expect(updateSetting).toHaveBeenCalled();
  });
});
