import React from 'react';
import { shallow } from 'enzyme';

import SelectType from './visualization__select-type';

const handleFile = jest.fn();

describe('SelectType', () => {
  test('Renders with upload option when vizType is null', () => {
    const wrapper = shallow(
      <SelectType handleFile={handleFile} />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('HeatmapContainer').length).toBe(0);
    expect(wrapper.find('ScatterContainer').length).toBe(0);
    expect(wrapper.find('Selection').length).toBe(1);
  });

  test('Renders with HeatmapContainer', () => {
    const wrapper = shallow(
      <SelectType
        handleFile={handleFile}
        vizType="heatmap"
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('HeatmapContainer').length).toBe(1);
    expect(wrapper.find('ScatterContainer').length).toBe(0);
    expect(wrapper.find('Selection').length).toBe(0);
  });

  test('Renders with ScatterContainer', () => {
    const wrapper = shallow(
      <SelectType
        handleFile={handleFile}
        vizType="scatter"
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('HeatmapContainer').length).toBe(0);
    expect(wrapper.find('ScatterContainer').length).toBe(1);
    expect(wrapper.find('Selection').length).toBe(0);
  });
});
