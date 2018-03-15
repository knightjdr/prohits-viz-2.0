import React from 'react';
import { shallow } from 'enzyme';

import { NewsItemComponent } from './news-item';

const testItem = {
  error: {
    error: true,
    isLoaded: false,
    isLoading: false,
    item: {},
  },
  loaded: {
    error: false,
    isLoaded: true,
    isLoading: false,
    item: {
      date: 'test',
      details: 'test',
      headline: 'test',
    },
  },
  loading: {
    error: false,
    isLoaded: false,
    isLoading: true,
    item: {},
  },
};

describe('News item', () => {
  test('It renders when loading', () => {
    const wrapper = shallow(
      <NewsItemComponent
        newsItem={testItem.loading}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('It renders when loaded', () => {
    const wrapper = shallow(
      <NewsItemComponent
        newsItem={testItem.loaded}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('It renders with error', () => {
    const wrapper = shallow(
      <NewsItemComponent
        newsItem={testItem.error}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
