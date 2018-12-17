import React from 'react';
import { shallow } from 'enzyme';

import Landing from './landing';

describe('Home', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <Landing />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
