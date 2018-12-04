import React from 'react';
import { shallow } from 'enzyme';

import Palette from './panel__settings-palette';

const changeSetting = jest.fn();
const updateSetting = jest.fn();

const settings = {
  edgeColor: 'blueBlack',
  fillColor: 'blueBlack',
  invertColor: false,
};

describe('Palette panel settings', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Palette
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

  it('should call changeSetting from first menu', () => {
    changeSetting.mockClear();
    wrapper.find('Menu').at(0).simulate('change');
    expect(changeSetting).toHaveBeenCalled();
  });

  it('should call updateSetting from first menu', () => {
    updateSetting.mockClear();
    wrapper.find('Menu').at(0).simulate('click');
    expect(updateSetting).toHaveBeenCalled();
  });

  it('should call changeSetting from second menu', () => {
    changeSetting.mockClear();
    wrapper.find('Menu').at(1).simulate('change');
    expect(changeSetting).toHaveBeenCalled();
  });

  it('should call updateSetting from second menu', () => {
    updateSetting.mockClear();
    wrapper.find('Menu').at(1).simulate('click');
    expect(updateSetting).toHaveBeenCalled();
  });

  it('should call changeSetting from switch', () => {
    changeSetting.mockClear();
    wrapper.find('FieldSwitch').simulate('change');
    expect(changeSetting).toHaveBeenCalled();
  });

  it('should call updateSetting from switch', () => {
    updateSetting.mockClear();
    wrapper.find('FieldSwitch').simulate('click');
    expect(updateSetting).toHaveBeenCalled();
  });
});
