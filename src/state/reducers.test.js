import { createStore } from 'redux';

// reducers
import FormStep from './set/form-step-reducer';
import Header from './set/header-reducer';
import Home from './get/home-reducer';
import News from './get/news-reducer';
import NewsItem from './get/news-item-reducer';
import NewsPage from './set/news-page-reducer';
import Reducers from './reducers';

// create store
const store = createStore(Reducers);

describe('Store', () => {
  test(`check that initial state of the root reducer matches
    what child reducers return given an empty action`,
  () => {
    expect(store.getState().formStep).toEqual(FormStep(undefined, {}));
    expect(store.getState().header).toEqual(Header(undefined, {}));
    expect(store.getState().home).toEqual(Home(undefined, {}));
    expect(store.getState().news).toEqual(News(undefined, {}));
    expect(store.getState().newsItem).toEqual(NewsItem(undefined, {}));
    expect(store.getState().newsPage).toEqual(NewsPage(undefined, {}));
  });

  test('FormStep reducer handles its actions', () => {
    let action = { step: 1, type: 'INCREMENT_FORM_STEP' };
    store.dispatch(action);
    expect(store.getState().formStep).toEqual(FormStep(undefined, action));
    action = { type: 'CLEAR_FORM_STEP' };
    store.dispatch(action);
    expect(store.getState().formStep).toEqual(FormStep(undefined, action));
  });

  test('Header reducer handles its actions', () => {
    let action = { header: ['column1', 'column2'], type: 'SET_FILE_HEADER' };
    store.dispatch(action);
    expect(store.getState().header).toEqual(Header(undefined, action));
    action = { type: 'CLEAR_FILE_HEADER' };
    store.dispatch(action);
    expect(store.getState().header).toEqual(Header(undefined, action));
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

  test('News page reducer handles its actions', () => {
    const action = { page: ['a'], pageIndex: 2, type: 'SET_NEWS_PAGE' };
    store.dispatch(action);
    expect(store.getState().newsPage).toEqual(NewsPage(undefined, action));
  });
});
