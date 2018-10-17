import React from 'react';
import { shallow } from 'enzyme';

import Logo from './navbar__logo';

describe('Navbar Logo', () => {
  it('should match snapshot when the navbar has a background', () => {
    const wrapper = shallow(<Logo background />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when the navbar has no background', () => {
    const wrapper = shallow(<Logo background={false} />);
    expect(wrapper).toMatchSnapshot();
  });
});
