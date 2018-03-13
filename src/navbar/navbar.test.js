import React from 'react';
import * as moduleToMock from 'react-router-dom';
import { shallow } from 'enzyme';

import Navbar from './navbar';

// mock NavLink
moduleToMock.NavLink = () => (
  <div />
);
jest.setMock('react-router-dom', moduleToMock);

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

test('Navbar shows background', () => {
  const wrapper = shallow(
    <Navbar
      background
      links={links}
      smallScreen={false}
    />,
  );
  expect(wrapper).toMatchSnapshot();
});

test('Navbar transparent background', () => {
  const wrapper = shallow(
    <Navbar
      background={false}
      links={links}
      smallScreen={false}
    />,
  );
  expect(wrapper).toMatchSnapshot();
});

test('Navbar on small screen', () => {
  const wrapper = shallow(
    <Navbar
      background
      links={links}
      smallScreen
    />,
  );
  expect(wrapper).toMatchSnapshot();
});
