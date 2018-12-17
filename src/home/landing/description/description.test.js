import React from 'react';
import { shallow } from 'enzyme';

import Description from './description';

describe('Home description', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Description />);
    expect(wrapper).toMatchSnapshot();
  });
});
