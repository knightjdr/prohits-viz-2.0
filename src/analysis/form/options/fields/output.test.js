import React from 'react';
import { shallow } from 'enzyme';

import Output from './output';

describe('Output', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <Output
        analysisType="dotplot"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
