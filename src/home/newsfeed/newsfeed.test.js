import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from 'enzyme';

import Newsfeed from './newsfeed';

const testNews = [
  {
    date: 'Apr 25, 2018',
    headline: 'test headline',
    _id: '5aa6b120c63eb43ab21a072e',
  },
];

test('Newsfeed with news', () => {
  const wrapper = render(
    <MemoryRouter
      initialEntries={[{ pathname: '/', key: 'testKey' }]}
    >
      <Newsfeed
        news={testNews}
      />
    </MemoryRouter>,
  );
  expect(wrapper).toMatchSnapshot();
});

test('Newsfeed without news', () => {
  const wrapper = render(
    <MemoryRouter
      initialEntries={[{ pathname: '/', key: 'testKey' }]}
    >
      <Newsfeed
        news={[]}
      />
    </MemoryRouter>,
  );
  expect(wrapper).toMatchSnapshot();
});
