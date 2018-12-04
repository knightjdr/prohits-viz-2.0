import React from 'react';
import { shallow } from 'enzyme';

import Basic, { roundInput } from './panel__settings-basic';

const changeSetting = jest.fn();
const updateSetting = jest.fn();

describe('Round input filter', () => {
  it('should round to nearest integer', () => {
    expect(roundInput(0.3)).toBe(0);
    expect(roundInput(0.5)).toBe(1);
    expect(roundInput(1)).toBe(1);
  });
});

describe('Basic heatmap panel settings', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Basic
        changeSetting={changeSetting}
        settings={{
          cellSize: 20,
          imageType: 'heatmap',
        }}
        storeSettings={{
          cellSize: 20,
          imageType: 'heatmap',
        }}
        updateSetting={updateSetting}
      />,
    );
  });


  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call changeSetting from menu', () => {
    changeSetting.mockClear();
    wrapper.find('Menu').simulate('change');
    expect(changeSetting).toHaveBeenCalled();
  });

  it('should call updateSetting from menu', () => {
    updateSetting.mockClear();
    wrapper.find('Menu').simulate('click');
    expect(updateSetting).toHaveBeenCalled();
  });

  it('should call changeSetting from input', () => {
    changeSetting.mockClear();
    wrapper.find('Input').simulate('change');
    expect(changeSetting).toHaveBeenCalled();
  });

  it('should call updateSetting from input', () => {
    updateSetting.mockClear();
    wrapper.find('Input').simulate('click');
    expect(updateSetting).toHaveBeenCalled();
  });
});
