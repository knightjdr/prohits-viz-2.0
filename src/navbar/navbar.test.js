import React from 'react';
import { shallow } from 'enzyme';

import Navbar from './navbar';

const links = [
  {
    route: '/analysis',
    text: 'analysis',
  },
  {
    route: '/help',
    text: 'help',
  },
];

describe('Navbar', () => {
  test('Shows background', () => {
    const wrapper = shallow(
      <Navbar
        background
        links={links}
        smallScreen={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Transparent background', () => {
    const wrapper = shallow(
      <Navbar
        background={false}
        links={links}
        smallScreen={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Small screen', () => {
    const wrapper = shallow(
      <Navbar
        background
        links={links}
        smallScreen
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
