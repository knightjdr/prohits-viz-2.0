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
  describe('news list item', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <NewsListItemRender
          item={changePage}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('news list', () => {
    describe('initialized', () => {
      let wrapper;

      beforeAll(() => {
        const newsList = {
          error: false,
          isLoaded: false,
          isLoading: false,
          list: [],
        };
        wrapper = shallow(
          <NewsListComponent
            changePage={changePage}
            news={newsList}
            newsPage={testPage.empty}
            pageLength={pageLength}
          />,
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should render null', () => {
        expect(wrapper.find('.news__list').text()).toBe('');
      });
    });

    describe('loaded with errors', () => {
      let wrapper;

      beforeAll(() => {
        const newsList = {
          error: true,
          isLoaded: false,
          isLoading: false,
          list: [],
        };
        wrapper = shallow(
          <NewsListComponent
            changePage={changePage}
            news={newsList}
            newsPage={testPage.empty}
            pageLength={pageLength}
          />,
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should show loading component', () => {
        expect(wrapper.find('Loading').length).toBe(1);
      });

      it('should have loading component with error', () => {
        const loading = wrapper.find('Loading');
        expect(loading.props().error).toBeTruthy();
      });
    });

    describe('loading', () => {
      let wrapper;

      beforeAll(() => {
        const newsList = {
          error: false,
          isLoaded: false,
          isLoading: true,
          list: [],
        };
        wrapper = shallow(
          <NewsListComponent
            changePage={changePage}
            news={newsList}
            newsPage={testPage.empty}
            pageLength={pageLength}
          />,
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should show loading component', () => {
        expect(wrapper.find('Loading').length).toBe(1);
      });

      it('should have loading component with no error', () => {
        const loading = wrapper.find('Loading');
        expect(loading.props().error).toBeFalsy();
      });
    });

    describe('loaded list', () => {
      let wrapper;

      beforeAll(() => {
        changePage.mockClear();
        const newsList = {
          error: false,
          isLoaded: true,
          isLoading: false,
          list: [item],
        };
        wrapper = shallow(
          <NewsListComponent
            changePage={changePage}
            news={newsList}
            newsPage={testPage.loaded}
            pageLength={pageLength}
          />,
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should render list', () => {
        expect(wrapper.find('.news__list-title').length).toBe(1);
      });

      it('should call changePageon pagination element', () => {
        wrapper.find('Pagination').simulate('change', { target: 1 });
        expect(changePage).toHaveBeenCalledWith({ target: 1 });
      });
    });
  });
});
