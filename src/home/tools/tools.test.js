import React from 'react';
import { shallow } from 'enzyme';

import Tools from './tools';

describe('Tools', () => {
  test('It renders', () => {
    const wrapper = shallow(
      <Tools />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
