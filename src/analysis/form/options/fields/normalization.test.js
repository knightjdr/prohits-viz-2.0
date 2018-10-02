import React from 'react';
import { shallow } from 'enzyme';

import Normalization from './normalization';

describe('Normalization', () => {
  test('Renders for default normalization', () => {
    const wrapper = shallow(
      <Normalization
        analysisType="dotplot"
        normalization="total"
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find({ label: 'Readout for normalization' }).length).toEqual(0);
  });

  test('Renders for readout normalization', () => {
    const wrapper = shallow(
      <Normalization
        analysisType="dotplot"
        normalization="readout"
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find({ label: 'Readout for normalization' }).length).toEqual(1);
  });
});
