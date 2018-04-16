import React from 'react';
import { shallow } from 'enzyme';

import MinimumAbundance from './minimum-abundance';

describe('MinimumAbundance', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <MinimumAbundance
        analysisType="dotplot"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
