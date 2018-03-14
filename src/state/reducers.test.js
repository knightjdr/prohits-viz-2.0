import { createStore } from 'redux';

// reducers
import Home from './get/home-reducer';
import News from './get/news-reducer';
import NewsItem from './get/news-item-reducer';
import Reducers from './reducers';

// create store
const store = createStore(Reducers);

describe('Store', () => {
  test(`check that initial state of the root reducer matches
    what child reducers return given an empty action`,
  () => {
    expect(store.getState().home).toEqual(Home(undefined, {}));
    expect(store.getState().news).toEqual(News(undefined, {}));
  });

  test('Home reducer handles its actions', () => {
    const action = { type: 'FILL_HOME' };
    store.dispatch(action);
    expect(store.getState().home).toEqual(Home(undefined, action));
  });

  test('News reducer handles its actions', () => {
    let action = { type: 'GET_NEWS' };
    store.dispatch(action);
    expect(store.getState().news).toEqual(News(undefined, action));
    action = { list: ['a'], type: 'FILL_NEWS' };
    store.dispatch(action);
    expect(store.getState().news).toEqual(News(undefined, action));
    action = { type: 'NEWS_ERROR' };
    store.dispatch(action);
    expect(store.getState().news).toEqual(News(undefined, action));
  });

  test('News item reducer handles its actions', () => {
    let action = { id: 'id', type: 'GET_NEWS_ITEM' };
    store.dispatch(action);
    expect(store.getState().newsItem).toEqual(NewsItem(undefined, action));
    action = { id: 'id', item: 'a', type: 'FILL_NEWS_ITEM' };
    store.dispatch(action);
    expect(store.getState().newsItem).toEqual(NewsItem(undefined, action));
    action = { id: 'id', type: 'NEWS_ITEM_ERROR' };
    store.dispatch(action);
    expect(store.getState().newsItem).toEqual(NewsItem(undefined, action));
  });
});
