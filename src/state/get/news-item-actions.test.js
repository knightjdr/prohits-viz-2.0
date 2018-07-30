import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import FetchNewsItem, * as actions from './news-item-actions';

// configure mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// mock success data
const news = 'a';

describe('News item actions', () => {
  afterAll(() => {
    fetchMock.restore();
  });

  it('should dispatch an action to get news item', () => {
    const expectedAction = {
      id: 'id',
      type: actions.GET_NEWS_ITEM,
    };
    expect(actions.getNewsItem('id')).toEqual(expectedAction);
  });

  it('should dispatch an action to fill news item', () => {
    const expectedAction = {
      id: 'id',
      item: news,
      type: actions.FILL_NEWS_ITEM,
    };
    expect(actions.fillNewsItem('id', news)).toEqual(expectedAction);
  });

  it('should dispatch an error action', () => {
    const expectedAction = {
      id: 'id',
      type: actions.NEWS_ITEM_ERROR,
    };
    expect(actions.newsItemError('id')).toEqual(expectedAction);
  });

  it('should not dispatch an action news item already in store', () => {
    const store = mockStore({ newsItem: { id: 'id' } });
    expect(store.dispatch(FetchNewsItem('id'))).toBeNull();
  });

  describe('on successfuly fetch response', () => {
    let expectedActions;
    let store;

    beforeAll(async (done) => {
      fetchMock.getOnce('*', { body: { news } });
      store = mockStore({ news: {} });
      store.dispatch(FetchNewsItem('id'))
        .then(() => {
          expectedActions = store.getActions();
          done();
        });
    });

    it('should dispatch two actions', () => {
      expect(expectedActions.length).toBe(2);
    });

    it('should dispatch get news item action', () => {
      expect(expectedActions).toContainEqual({
        id: 'id',
        type: actions.GET_NEWS_ITEM,
      });
    });

    it('should dispatch fill news item action', () => {
      expect(expectedActions).toContainEqual({
        id: 'id',
        item: news,
        type: actions.FILL_NEWS_ITEM,
      });
    });
  });

  describe('on unsuccessfuly fetch response', () => {
    let expectedActions;
    let store;

    beforeAll(async (done) => {
      fetchMock.getOnce('*', { status: 400 }, { overwriteRoutes: true });
      store = mockStore({ news: {} });
      store.dispatch(FetchNewsItem('id'))
        .then(() => {
          expectedActions = store.getActions();
          done();
        });
    });

    it('should dispatch two actions', () => {
      expect(expectedActions.length).toBe(2);
    });

    it('should dispatch get news item action', () => {
      expect(expectedActions).toContainEqual({
        id: 'id',
        type: actions.GET_NEWS_ITEM,
      });
    });

    it('should dispatch error action', () => {
      expect(expectedActions).toContainEqual({
        id: 'id',
        type: actions.NEWS_ITEM_ERROR,
      });
    });
  });

  describe('on successfuly fetch response of unfound news item', () => {
    let expectedActions;
    let store;

    beforeAll(async (done) => {
      fetchMock.getOnce('*', { body: { news: null } }, { overwriteRoutes: true });
      store = mockStore({ news: {} });
      store.dispatch(FetchNewsItem('id'))
        .then(() => {
          expectedActions = store.getActions();
          done();
        });
    });

    it('should dispatch two actions', () => {
      expect(expectedActions.length).toBe(2);
    });

    it('should dispatch get news item action', () => {
      expect(expectedActions).toContainEqual({
        id: 'id',
        type: actions.GET_NEWS_ITEM,
      });
    });

    it('should dispatch error action', () => {
      expect(expectedActions).toContainEqual({
        id: 'id',
        type: actions.NEWS_ITEM_ERROR,
      });
    });
  });
});
