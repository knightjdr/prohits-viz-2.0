import React from 'react';
import { shallow } from 'enzyme';

import { NewsListComponent, NewsListItemRender } from './news-list';

const changePage = jest.fn();
const item = {
  _id: 'test',
  date: 'test',
  details: 'test',
  headline: 'test',
};
const pageLength = 5;

const testNewsList = {
  error: {
    error: true,
    isLoaded: false,
    isLoading: false,
    list: [],
  },
  init: {
    error: false,
    isLoaded: false,
    isLoading: false,
    list: [],
  },
  loaded: {
    error: false,
    isLoaded: true,
    isLoading: false,
    list: [item],
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
    page: [item],
    pageIndex: 1,
  },
};


describe('News list', () => {
  test('Renders item on render call', () => {
    const wrapper = shallow(
      <NewsListItemRender
        item={changePage}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Renders initially', () => {
    const wrapper = shallow(
      <NewsListComponent
        changePage={changePage}
        news={testNewsList.init}
        newsPage={testPage.empty}
        pageLength={pageLength}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Renders when loading', () => {
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

  test('Renders when loaded', () => {
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

  test('Renders with error', () => {
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

  test('ChangePage called on pagination element', () => {
    const wrapper = shallow(
      <NewsListComponent
        changePage={changePage}
        news={testNewsList.loaded}
        newsPage={testPage.loaded}
        pageLength={pageLength}
      />,
    );
    wrapper.find('Pagination').simulate('change', { target: 1 });
    expect(changePage).toHaveBeenCalledTimes(1);
    expect(changePage).toHaveBeenCalledWith({ target: 1 });
  });
});
