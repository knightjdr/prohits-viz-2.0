import React from 'react';
import { shallow } from 'enzyme';

import ReadoutLengthNormalization from './readout-length-normalization';

describe('ReadoutLengthNormalization', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <ReadoutLengthNormalization
        analysisType="dotplot"
        options={[]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
