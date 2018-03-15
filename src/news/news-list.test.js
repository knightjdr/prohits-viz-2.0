import React from 'react';
import { shallow } from 'enzyme';

import { NewsListComponent } from './news-list';

const changePage = jest.fn();
const pageLength = 5;

const testNewsList = {
  error: {
    error: true,
    isLoaded: false,
    isLoading: false,
    list: [],
  },
  loaded: {
    error: false,
    isLoaded: true,
    isLoading: false,
    list: [
      {
        _id: 'test',
        date: 'test',
        details: 'test',
        headline: 'test',
      },
    ],
  },
  loading: {
    error: false,
    isLoaded: false,
    isLoading: true,
    list: [],
  },
};

const testPage = {
  empty: {
    page: [],
    pageIndex: 1,
  },
  loaded: {
    page: [
      {
        _id: 'test',
        date: 'test',
        details: 'test',
        headline: 'test',
      },
    ],
    pageIndex: 1,
  },
};


describe('News list', () => {
  test('It renders when loading', () => {
    const wrapper = shallow(
      <NewsListComponent
        changePage={changePage}
        news={testNewsList.loading}
        newsPage={testPage.empty}
        pageLength={pageLength}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('It renders when loaded', () => {
    const wrapper = shallow(
      <NewsListComponent
        changePage={changePage}
        news={testNewsList.loaded}
        newsPage={testPage.loaded}
        pageLength={pageLength}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('It renders with error', () => {
    const wrapper = shallow(
      <NewsListComponent
        changePage={changePage}
        news={testNewsList.error}
        newsPage={testPage.empty}
        pageLength={pageLength}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
