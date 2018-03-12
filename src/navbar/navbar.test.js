import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from 'enzyme';

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

test('Navbar shows background', () => {
  const wrapper = render(
    <MemoryRouter
      initialEntries={[{ pathname: '/', key: 'testKey' }]}
    >
      <Navbar
        background
        links={links}
        smallScreen={false}
      />
    </MemoryRouter>,
  );
  expect(wrapper).toMatchSnapshot();
});

test('Navbar transparent background', () => {
  const wrapper = render(
    <MemoryRouter
      initialEntries={[{ pathname: '/', key: 'testKey' }]}
    >
      <Navbar
        background={false}
        links={links}
        smallScreen={false}
      />
    </MemoryRouter>,
  );
  expect(wrapper).toMatchSnapshot();
});

test('Navbar on small screen', () => {
  const wrapper = render(
    <MemoryRouter
      initialEntries={[{ pathname: '/', key: 'testKey' }]}
    >
      <Navbar
        background
        links={links}
        smallScreen
      />
    </MemoryRouter>,
  );
  expect(wrapper).toMatchSnapshot();
});
