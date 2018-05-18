import React from 'react';
import { shallow } from 'enzyme';

import ClusteringDotplot from './clustering-dotplot';

describe('ClusteringDotplot', () => {
  test('Renders for biclustering', () => {
    const wrapper = shallow(
      <ClusteringDotplot
        analysisType="dotplot"
        baitClustering={undefined}
        clustering="biclustering"
        preyClustering={undefined}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.Clustering-biclustering-checkbox').length).toBe(1);
    expect(wrapper.find('.Clustering-hierarchical-container').length).toBe(0);
    expect(wrapper.find('.Clustering-none-container').length).toBe(0);
  });

  test('Renders for hierarchical', () => {
    const wrapper = shallow(
      <ClusteringDotplot
        analysisType="dotplot"
        baitClustering={undefined}
        clustering="hierarchical"
        preyClustering={undefined}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.Clustering-biclustering-checkbox').length).toBe(0);
    expect(wrapper.find('.Clustering-hierarchical-container').length).toBe(1);
    expect(wrapper.find('.Clustering-none-container').length).toBe(0);
  });

  test('Renders for "none" clustering when requiring baits and preys', () => {
    const wrapper = shallow(
      <ClusteringDotplot
        analysisType="dotplot"
        baitClustering="none"
        clustering="none"
        preyClustering="none"
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.Clustering-biclustering-checkbox').length).toBe(0);
    expect(wrapper.find('.Clustering-hierarchical-container').length).toBe(0);
    expect(wrapper.find('.Clustering-none-container').length).toBe(1);
    expect(wrapper.find({ label: 'Baits' }).length).toEqual(1);
    expect(wrapper.find({ label: 'Preys' }).length).toEqual(1);
  });

  test('Renders for "none" clustering when requiring only baits', () => {
    const wrapper = shallow(
      <ClusteringDotplot
        analysisType="dotplot"
        baitClustering="none"
        clustering="none"
        preyClustering="preys"
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find({ label: 'Baits' }).length).toEqual(1);
    expect(wrapper.find({ label: 'Preys' }).length).toEqual(0);
  });

  test('Renders for "none" clustering when requiring only preys', () => {
    const wrapper = shallow(
      <ClusteringDotplot
        analysisType="dotplot"
        baitClustering="baits"
        clustering="none"
        preyClustering="none"
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find({ label: 'Baits' }).length).toEqual(0);
    expect(wrapper.find({ label: 'Preys' }).length).toEqual(1);
  });
});
