import React from 'react';
import { shallow } from 'enzyme';

import SecondaryFilter from './secondary-filter';

describe('SecondaryFilter', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <SecondaryFilter
        analysisType="dotplot"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
