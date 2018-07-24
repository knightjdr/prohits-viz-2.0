import React from 'react';
import { shallow } from 'enzyme';

import SelectType from './visualization__select-type';

const handleFile = jest.fn();

describe('Visualization control', () => {
  test('should render with upload option when vizType is null', () => {
    const wrapper = shallow(
      <SelectType
        handleFile={handleFile}
        loading={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('HeatmapContainer').length).toBe(0);
    expect(wrapper.find('ScatterContainer').length).toBe(0);
    expect(wrapper.find('Selection').length).toBe(1);
  });

  test('should render for dotplots', () => {
    const wrapper = shallow(
      <SelectType
        handleFile={handleFile}
        loading={false}
        vizType="dotplot"
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('HeatmapContainer').length).toBe(1);
    expect(wrapper.find('ScatterContainer').length).toBe(0);
    expect(wrapper.find('Selection').length).toBe(0);
  });

  test('should render for heatmaps', () => {
    const wrapper = shallow(
      <SelectType
        handleFile={handleFile}
        loading={false}
        vizType="heatmap"
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('HeatmapContainer').length).toBe(1);
    expect(wrapper.find('ScatterContainer').length).toBe(0);
    expect(wrapper.find('Selection').length).toBe(0);
  });

  test('should render for scatter plots', () => {
    const wrapper = shallow(
      <SelectType
        handleFile={handleFile}
        loading={false}
        vizType="scatter"
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('HeatmapContainer').length).toBe(0);
    expect(wrapper.find('ScatterContainer').length).toBe(1);
    expect(wrapper.find('Selection').length).toBe(0);
  });
});
