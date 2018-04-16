import React from 'react';
import { shallow } from 'enzyme';

import EdgeColor from './edge-color';

describe('EdgeColor', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <EdgeColor
        analysisType="dotplot"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
