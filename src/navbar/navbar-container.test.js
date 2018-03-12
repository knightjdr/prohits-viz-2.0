import React from 'react';
import { shallow } from 'enzyme';

import NavbarContainer from './navbar-container';

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

test('Resizing window changes state', () => {
  const wrapper = shallow(
    <NavbarContainer
      links={links}
    />,
  );
  global.innerWidth = 680;
  global.dispatchEvent(new Event('resize'));
  expect(wrapper.state('smallScreen')).toBeTruthy();
  global.innerWidth = 681;
  global.dispatchEvent(new Event('resize'));
  expect(wrapper.state('smallScreen')).toBeFalsy();
});
