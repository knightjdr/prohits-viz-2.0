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

  it('Should dispatch an action to get news item', () => {
    const expectedAction = {
      id: 'id',
      type: actions.GET_NEWS_ITEM,
    };
    expect(actions.getNewsItem('id')).toEqual(expectedAction);
  });

  it('Should dispatch an action to fill news item', () => {
    const expectedAction = {
      id: 'id',
      item: news,
      type: actions.FILL_NEWS_ITEM,
    };
    expect(actions.fillNewsItem('id', news)).toEqual(expectedAction);
  });

  it('Should dispatch an error action', () => {
    const expectedAction = {
      id: 'id',
      type: actions.NEWS_ITEM_ERROR,
    };
    expect(actions.newsItemError('id')).toEqual(expectedAction);
  });

  it('No actions called if item state already loaded', () => {
    const store = mockStore({ newsItem: { id: 'id' } });
    expect(store.dispatch(FetchNewsItem('id'))).toBeNull();
  });

  it('Calls get and fill actions if the fetch response was successful', () => {
    fetchMock.getOnce('*', { body: { data: { news } } });
    const store = mockStore({ news: {} });
    return store.dispatch(FetchNewsItem('id'))
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({
          id: 'id',
          type: actions.GET_NEWS_ITEM,
        });
        expect(expectedActions).toContainEqual({
          id: 'id',
          item: news,
          type: actions.FILL_NEWS_ITEM,
        });
      });
  });

  it('Error action called if fetch response was unsuccessful', () => {
    fetchMock.getOnce('*', { status: 400 }, { overwriteRoutes: true });
    const store = mockStore({ news: {} });
    return store.dispatch(FetchNewsItem('id'))
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({
          id: 'id',
          type: actions.GET_NEWS_ITEM,
        });
        expect(expectedActions).toContainEqual({
          id: 'id',
          type: actions.NEWS_ITEM_ERROR,
        });
      });
  });
});
