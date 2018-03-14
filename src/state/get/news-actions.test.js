import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import FetchNews, * as actions from './news-actions';

// configure mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// mock success data
const news = {
  initial: {
    error: false,
    isLoaded: false,
    isLoading: false,
    list: [],
  },
  success: ['a', 'b'],
};

describe('News actions', () => {
  afterAll(() => {
    fetchMock.restore();
  });

  it('Should dispatch an action to get news', () => {
    const expectedAction = {
      type: actions.GET_NEWS,
    };
    expect(actions.getNews()).toEqual(expectedAction);
  });

  it('Should dispatch an action to fill news state', () => {
    const expectedAction = {
      list: news.success,
      type: actions.FILL_NEWS,
    };
    expect(actions.fillNews(news.success)).toEqual(expectedAction);
  });

  it('Should dispatch an error action', () => {
    const expectedAction = {
      type: actions.NEWS_ERROR,
    };
    expect(actions.newsError()).toEqual(expectedAction);
  });

  it('No actions dispatched if state already loaded', () => {
    const store = mockStore({ news: { isLoaded: true } });
    expect(store.dispatch(FetchNews())).toBeNull();
  });

  it('Calls get and fill actions if the fetch response was successful', () => {
    fetchMock.getOnce('*', { body: { data: { news: news.success } } });
    const store = mockStore({ news: news.initial });
    return store.dispatch(FetchNews())
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({
          type: actions.GET_NEWS,
        });
        expect(expectedActions).toContainEqual({
          list: news.success,
          type: actions.FILL_NEWS,
        });
      });
  });

  it('Error action called if fetch response was unsuccessful', () => {
    fetchMock.getOnce('*', { status: 400 }, { overwriteRoutes: true });
    const store = mockStore({ news: news.initial });
    return store.dispatch(FetchNews())
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({
          type: actions.GET_NEWS,
        });
        expect(expectedActions).toContainEqual({
          type: actions.NEWS_ERROR,
        });
      });
  });
});
