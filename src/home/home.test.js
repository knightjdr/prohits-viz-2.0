import React from 'react';
import { shallow } from 'enzyme';

import Home from './home';

describe('Home', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <Home />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
