import React from 'react';
import { shallow } from 'enzyme';

import SelectVizType from './select-viz-type';

const handleFile = jest.fn();

describe('SelectVizType', () => {
  test('Renders with upload option when vizType is null', () => {
    const wrapper = shallow(
      <SelectVizType handleFile={handleFile} />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('HeatmapContainer').length).toBe(0);
    expect(wrapper.find('ScatterContainer').length).toBe(0);
    expect(wrapper.find('Selection').length).toBe(1);
  });

  test('Renders with HeatmapContainer', () => {
    const wrapper = shallow(
      <SelectVizType
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
      <SelectVizType
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
