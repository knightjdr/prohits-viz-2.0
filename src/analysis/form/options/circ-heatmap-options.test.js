import React from 'react';
import { shallow } from 'enzyme';

import CircHeatmapOptions from './circ-heatmap-options';

const form = {
  abundance: 'test',
  analysisType: 'test',
  control: 'test',
  ctrlSub: true,
  fileType: 'saint',
  knownCriterion: 'test',
  normalization: 'none',
  otherAbundance: [],
  readoutLength: 'test',
  readoutLengthNorm: false,
  score: 'test',
  scoreType: 'lte',
  tissueExpression: true,
};

describe('Circ-heatmap options', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <CircHeatmapOptions
        change={jest.fn()}
        form={form}
        header={['a', 'b']}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
