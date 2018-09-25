import React from 'react';
import { shallow } from 'enzyme';

import Running from './running';

describe('Visualization running component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Running />);
    expect(wrapper).toMatchSnapshot();
  });
});
