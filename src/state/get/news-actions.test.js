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

  it('should dispatch an action to get news', () => {
    const expectedAction = {
      type: actions.GET_NEWS,
    };
    expect(actions.getNews()).toEqual(expectedAction);
  });

  it('should dispatch an action to fill news state', () => {
    const action = news.success;
    const expectedAction = {
      list: news.success,
      type: actions.FILL_NEWS,
    };
    expect(actions.fillNews(action)).toEqual(expectedAction);
  });

  it('should dispatch an error action', () => {
    const expectedAction = {
      type: actions.NEWS_ERROR,
    };
    expect(actions.newsError()).toEqual(expectedAction);
  });

  it('should not dispatch an action if state already loaded', () => {
    const store = mockStore({ news: { isLoaded: true } });
    expect(store.dispatch(FetchNews())).toBeNull();
  });

  describe('on successfuly fetch response', () => {
    let expectedActions;
    let store;

    beforeAll(async (done) => {
      fetchMock.getOnce('*', { body: { news: news.success } });
      store = mockStore({ news: news.initial });
      store.dispatch(FetchNews())
        .then(() => {
          expectedActions = store.getActions();
          done();
        });
    });

    it('should dispatch two actions', () => {
      expect(expectedActions.length).toBe(2);
    });

    it('should dispatch get news action', () => {
      expect(expectedActions).toContainEqual({
        type: actions.GET_NEWS,
      });
    });

    it('should dispatch fill news action', () => {
      expect(expectedActions).toContainEqual({
        list: news.success,
        type: actions.FILL_NEWS,
      });
    });
  });

  describe('on unsuccessfuly fetch response', () => {
    let expectedActions;
    let store;

    beforeAll(async (done) => {
      fetchMock.getOnce('*', { status: 400 }, { overwriteRoutes: true });
      store = mockStore({ news: news.initial });
      store.dispatch(FetchNews())
        .then(() => {
          expectedActions = store.getActions();
          done();
        });
    });

    it('should dispatch two actions', () => {
      expect(expectedActions.length).toBe(2);
    });

    it('should dispatch get news action', () => {
      expect(expectedActions).toContainEqual({
        type: actions.GET_NEWS,
      });
    });

    it('should dispatch fill news action', () => {
      expect(expectedActions).toContainEqual({
        type: actions.NEWS_ERROR,
      });
    });
  });
});
