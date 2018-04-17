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
    expect(wrapper.find({ label: 'Prey for normalization' }).length).toEqual(0);
  });

  test('Renders for prey normalization', () => {
    const wrapper = shallow(
      <Normalization
        analysisType="dotplot"
        normalization="prey"
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find({ label: 'Prey for normalization' }).length).toEqual(1);
  });
});
