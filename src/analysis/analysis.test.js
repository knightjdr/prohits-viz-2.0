import React from 'react';
import { shallow } from 'enzyme';

import Analysis from './analysis';

describe('Analysis', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <Analysis />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
