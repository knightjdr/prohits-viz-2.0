import React from 'react';
import { shallow } from 'enzyme';

import About from './about';

describe('About', () => {
  test('It renders', () => {
    const wrapper = shallow(
      <About />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
