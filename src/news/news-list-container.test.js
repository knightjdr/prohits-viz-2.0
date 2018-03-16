import React from 'react';
import { shallow } from 'enzyme';

import FetchNews from '../state/get/news-actions';
import { NewsListContainer } from './news-list-container';
import { setNewsPage } from '../state/set/news-page-actions';

// mock FetchNews
jest.mock('../state/get/news-actions');
FetchNews.mockReturnValue();

// mock setNewsPage
jest.mock('../state/set/news-page-actions');
setNewsPage.mockReturnValue();

const news = {
  empty: {
    list: [],
  },
  filled: {
    list: [
      {
        _id: 'test',
        date: 'test',
        details: 'test',
        headline: 'test',
      },
      {
        _id: 'test2',
        date: 'test2',
        details: 'test2',
        headline: 'test2',
      },
    ],
  },
};

describe('NewsListContainer', () => {
  test('Fetch news is called on mount', () => {
    shallow(
      <NewsListContainer
        fetchNews={FetchNews}
        news={news.empty}
        setNewsPage={setNewsPage}
      />,
    );
    expect(FetchNews).toHaveBeenCalledTimes(1);
  });

  test('Call setNewsPage when change page called without news arg', () => {
    const wrapper = shallow(
      <NewsListContainer
        fetchNews={FetchNews}
        news={news.filled}
        setNewsPage={setNewsPage}
      />,
    );
    wrapper.instance().changePage(1);
    expect(setNewsPage).toHaveBeenCalledWith(news.filled.list, 1);
  });

  test('Call setNewsPage when change page called news arg', () => {
    const wrapper = shallow(
      <NewsListContainer
        fetchNews={FetchNews}
        news={news.filled}
        setNewsPage={setNewsPage}
      />,
    );
    wrapper.instance().changePage(1, news.filled.list);
    expect(setNewsPage).toHaveBeenCalledWith(news.filled.list, 1);
  });

  test('Call change page when news arrives as props and current news is empty', () => {
    const wrapper = shallow(
      <NewsListContainer
        fetchNews={FetchNews}
        news={news.empty}
        setNewsPage={setNewsPage}
      />,
    );
    const spyFn = jest.spyOn(wrapper.instance(), 'changePage');
    wrapper.setProps({ news: news.filled });
    expect(spyFn).toHaveBeenCalledWith(1, news.filled.list);
  });

  test('Does not call change page when news arrives as props and news already filled', () => {
    const wrapper = shallow(
      <NewsListContainer
        fetchNews={FetchNews}
        news={news.filled}
        setNewsPage={setNewsPage}
      />,
    );
    const spyFn = jest.spyOn(wrapper.instance(), 'changePage');
    wrapper.setProps({ news: news.filled });
    expect(spyFn).not.toHaveBeenCalled();
  });
});
