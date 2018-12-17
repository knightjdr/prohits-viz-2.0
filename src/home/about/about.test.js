import React from 'react';
import { shallow } from 'enzyme';

import About from './about';

describe('About', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <About />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
