import React from 'react';
import { shallow } from 'enzyme';

import DotplotOptions from './dotplot-options';

const form = {
  analysisType: 'test',
  conditionClustering: 'conditions',
  clustering: 'test',
  control: 'test',
  ctrlSub: true,
  normalization: 'none',
  readoutClustering: 'readouts',
  readoutLength: 'test',
  readoutLengthNorm: false,
  score: 'test',
  scoreType: 'lte',
};

describe('DotplotOptions', () => {
  it('should match snapshot', () => {
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
