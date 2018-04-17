import React from 'react';
import { shallow } from 'enzyme';

import PrimaryFilter from './primary-filter';

describe('PrimaryFilter', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <PrimaryFilter
        analysisType="dotplot"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
