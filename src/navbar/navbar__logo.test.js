import React from 'react';
import { shallow } from 'enzyme';

import Logo from './navbar__logo';

describe('Navbar Logo', () => {
  it('should match snapshot when the navbar has a dark background', () => {
    const wrapper = shallow(<Logo background="dark" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when the navbar has a semi transparent background', () => {
    const wrapper = shallow(<Logo background="semi" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when the navbar has a transparent background', () => {
    const wrapper = shallow(<Logo background="transparent" />);
    expect(wrapper).toMatchSnapshot();
  });
});
