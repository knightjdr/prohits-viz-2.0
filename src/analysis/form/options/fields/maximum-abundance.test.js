import React from 'react';
import { shallow } from 'enzyme';

import Maximumbundance from './maximum-abundance';

describe('Maximumbundance', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <Maximumbundance
        analysisType="dotplot"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
