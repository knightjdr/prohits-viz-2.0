import React from 'react';
import { shallow } from 'enzyme';

import FillColor from './fill-color';

describe('FillColor', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <FillColor
        analysisType="dotplot"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
