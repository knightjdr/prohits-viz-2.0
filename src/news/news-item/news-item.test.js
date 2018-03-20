import React from 'react';
import { shallow } from 'enzyme';

import TextToHtml from '../../helpers/text-to-html';
import { NewsItemComponent } from './news-item';

// mock TextToHtml
jest.mock('../../helpers/text-to-html');
TextToHtml.mockReturnValue('test');

const testItem = {
  error: {
    error: true,
    isLoaded: false,
    isLoading: false,
    item: {},
  },
  init: {
    error: false,
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
  test('It renders initially', () => {
    const wrapper = shallow(
      <NewsItemComponent
        newsItem={testItem.init}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

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
