import React from 'react';
import { shallow } from 'enzyme';

import PreyLengthNormalization from './prey-length-normalization';

describe('PreyLengthNormalization', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <PreyLengthNormalization
        analysisType="dotplot"
        options={[]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
