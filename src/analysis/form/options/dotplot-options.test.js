import React from 'react';
import { shallow } from 'enzyme';

import DotplotOptions from './dotplot-options';

const form = {
  analysisType: 'test',
  baitClustering: 'baits',
  clustering: 'test',
  control: 'test',
  ctrlSub: true,
  normalization: 'none',
  preyClustering: 'preys',
  preyLength: 'test',
  preyLengthNorm: false,
  score: 'test',
  scoreType: 'lte',
};

describe('DotplotOptions', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <DotplotOptions
        change={jest.fn()}
        form={form}
        header={['a', 'b']}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
