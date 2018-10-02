import React from 'react';
import { shallow } from 'enzyme';

import ClusteringDotplot from './clustering-dotplot';

describe('ClusteringDotplot', () => {
  test('Renders for biclustering', () => {
    const wrapper = shallow(
      <ClusteringDotplot
        analysisType="dotplot"
        conditionClustering={undefined}
        clustering="biclustering"
        readoutClustering={undefined}
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
        conditionClustering={undefined}
        clustering="hierarchical"
        readoutClustering={undefined}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.Clustering-biclustering-checkbox').length).toBe(0);
    expect(wrapper.find('.Clustering-hierarchical-container').length).toBe(1);
    expect(wrapper.find('.Clustering-none-container').length).toBe(0);
  });

  test('Renders for "none" clustering when requiring conditions and readouts', () => {
    const wrapper = shallow(
      <ClusteringDotplot
        analysisType="dotplot"
        conditionClustering="none"
        clustering="none"
        readoutClustering="none"
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.Clustering-biclustering-checkbox').length).toBe(0);
    expect(wrapper.find('.Clustering-hierarchical-container').length).toBe(0);
    expect(wrapper.find('.Clustering-none-container').length).toBe(1);
    expect(wrapper.find({ label: 'Conditions' }).length).toEqual(1);
    expect(wrapper.find({ label: 'Readouts' }).length).toEqual(1);
  });

  test('Renders for "none" clustering when requiring only conditions', () => {
    const wrapper = shallow(
      <ClusteringDotplot
        analysisType="dotplot"
        conditionClustering="none"
        clustering="none"
        readoutClustering="readouts"
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find({ label: 'Conditions' }).length).toEqual(1);
    expect(wrapper.find({ label: 'Readouts' }).length).toEqual(0);
  });

  test('Renders for "none" clustering when requiring only readouts', () => {
    const wrapper = shallow(
      <ClusteringDotplot
        analysisType="dotplot"
        conditionClustering="conditions"
        clustering="none"
        readoutClustering="none"
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find({ label: 'Conditions' }).length).toEqual(0);
    expect(wrapper.find({ label: 'Readouts' }).length).toEqual(1);
  });
});
