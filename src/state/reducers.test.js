import { createStore } from 'redux';

// reducers
import Annotations from './set/visualization/annotation-reducer';
import FormStep from './set/form-step-reducer';
import Header from './set/header-reducer';
import Home from './get/home-reducer';
import InteractiveFile from './set/interactive-file-reducer';
import Map from './set/visualization/map-reducer';
import Marker from './set/visualization/marker-reducer';
import News from './get/news-reducer';
import NewsItem from './get/news-item-reducer';
import NewsPage from './set/news-page-reducer';
import Parameters from './set/visualization/params-reducer';
import Position from './set/visualization/position-reducer';
import Settings from './set/visualization/settings-reducer';
import Reducers from './reducers';

// create store
const store = createStore(Reducers);

describe('Store', () => {
  test(`check that initial state of the root reducer matches
    what child reducers return given an empty action`,
  () => {
    expect(store.getState().annotations).toEqual(Annotations(undefined, {}));
    expect(store.getState().formStep).toEqual(FormStep(undefined, {}));
    expect(store.getState().header).toEqual(Header(undefined, {}));
    expect(store.getState().home).toEqual(Home(undefined, {}));
    expect(store.getState().interactiveFile).toEqual(InteractiveFile(undefined, {}));
    expect(store.getState().markers).toEqual(Marker(undefined, {}));
    expect(store.getState().minimap).toEqual(Map(undefined, {}));
    expect(store.getState().news).toEqual(News(undefined, {}));
    expect(store.getState().newsItem).toEqual(NewsItem(undefined, {}));
    expect(store.getState().newsPage).toEqual(NewsPage(undefined, {}));
    expect(store.getState().parameters).toEqual(Parameters(undefined, {}));
    expect(store.getState().position).toEqual(Position(undefined, {}));
    expect(store.getState().settings).toEqual(Settings(undefined, {}));
  });

  test('visualization annotation reducer handles its actions', () => {
    let action = {
      text: 'test',
      type: 'ADD_ANNOTATION',
      x: 0.1,
      y: 0.2,
    };
    store.dispatch(action);
    expect(store.getState().annotations).toEqual(Annotations(undefined, action));
    action = { type: 'CLEAR_ALL_ANNOTATIONS' };
    store.dispatch(action);
    expect(store.getState().annotations).toEqual(Annotations(undefined, action));
    action = { type: 'CLEAR_LAST_ANNOTATION' };
    store.dispatch(action);
    expect(store.getState().annotations).toEqual(Annotations(undefined, action));
    action = { color: '#000000', type: 'SET_ANNOTATION_COLOR' };
    store.dispatch(action);
    expect(store.getState().annotations).toEqual(Annotations(undefined, action));
  });

  test('form step reducer handles its actions', () => {
    let action = { step: 1, type: 'INCREMENT_FORM_STEP' };
    store.dispatch(action);
    expect(store.getState().formStep).toEqual(FormStep(undefined, action));
    action = { type: 'CLEAR_FORM_STEP' };
    store.dispatch(action);
    expect(store.getState().formStep).toEqual(FormStep(undefined, action));
  });

  test('header reducer handles its actions', () => {
    let action = { header: ['column1', 'column2'], type: 'SET_FILE_HEADER' };
    store.dispatch(action);
    expect(store.getState().header).toEqual(Header(undefined, action));
    action = { type: 'CLEAR_FILE_HEADER' };
    store.dispatch(action);
    expect(store.getState().header).toEqual(Header(undefined, action));
  });

  test('home reducer handles its actions', () => {
    const action = { type: 'FILL_HOME' };
    store.dispatch(action);
    expect(store.getState().home).toEqual(Home(undefined, action));
  });

  test('interactive file reducer handles its actions', () => {
    let action = { type: 'CLEAR_INTERACTIVE_FILE' };
    store.dispatch(action);
    expect(store.getState().interactiveFile).toEqual(InteractiveFile(undefined, action));
    action = { file: {}, type: 'SET_INTERACTIVE_FILE' };
    store.dispatch(action);
    expect(store.getState().interactiveFile).toEqual(InteractiveFile(undefined, action));
  });

  test('visualization marker reducer handles its actions', () => {
    let action = {
      height: 0.5,
      type: 'ADD_MARKER',
      width: 0.5,
      x: 0.1,
      y: 0.2,
    };
    store.dispatch(action);
    expect(store.getState().markers).toEqual(Marker(undefined, action));
    action = { type: 'CLEAR_ALL_MARKERS' };
    store.dispatch(action);
    expect(store.getState().markers).toEqual(Marker(undefined, action));
    action = { type: 'CLEAR_LAST_MARKER' };
    store.dispatch(action);
    expect(store.getState().markers).toEqual(Marker(undefined, action));
    action = { color: '#0000ff', type: 'SET_MARKER_COLOR' };
    store.dispatch(action);
    expect(store.getState().markers).toEqual(Marker(undefined, action));
  });

  test('news reducer handles its actions', () => {
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

  test('news item reducer handles its actions', () => {
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

  test('news page reducer handles its actions', () => {
    const action = { page: ['a'], pageIndex: 2, type: 'SET_NEWS_PAGE' };
    store.dispatch(action);
    expect(store.getState().newsPage).toEqual(NewsPage(undefined, action));
  });

  test('position reducer handles its actions', () => {
    const action = { type: 'UPDATE_POSITION', x: 0.5, y: 0.4 };
    store.dispatch(action);
    expect(store.getState().position).toEqual(Position(undefined, action));
  });

  test('visualization settings reducer handles its actions', () => {
    let action = { setting: 'a', type: 'UPDATE_SETTING', value: 'b' };
    store.dispatch(action);
    expect(store.getState().settings).toEqual(Settings(undefined, action));
    action = { type: 'RESET_SETTINGS' };
    store.dispatch(action);
    expect(store.getState().settings).toEqual(Settings(undefined, action));
  });
});
