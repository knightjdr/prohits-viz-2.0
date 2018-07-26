import { createStore } from 'redux';

// reducers
import Annotations from './set/visualization/annotation-reducer';
import Columns from './set/visualization/columns-reducer';
import Dimensions from './set/visualization/dimension-reducer';
import FormStep from './set/form-step-reducer';
import Genes from './set/visualization/genes-reducer';
import Header from './set/header-reducer';
import Home from './get/home-reducer';
import Map from './set/visualization/map-reducer';
import Marker from './set/visualization/marker-reducer';
import News from './get/news-reducer';
import NewsItem from './get/news-item-reducer';
import NewsPage from './set/news-page-reducer';
import Parameters from './set/visualization/params-reducer';
import Position from './set/visualization/position-reducer';
import Rows from './set/visualization/rows-reducer';
import Save from './set/visualization/save-reducer';
import Search from './set/visualization/search-reducer';
import Settings from './set/visualization/settings-reducer';
import Reducers from './reducers';

// create store
let store;

const file = {
  annotations: { color: '#000000', list: [], move: true },
  columns: { ref: 'a', names: ['a', 'b', 'c'] },
  genes: {
    columnMap: { a: 0, b: 1, c: 2 },
    columns: ['a', 'b', 'c'],
    columnsSelected: ['b'],
    rowMap: { d: 0, e: 1, f: 2 },
    rows: ['d', 'e', 'f'],
    rowsSelected: ['d', 'e'],
  },
  markers: { color: '#ff0000', list: [], record: true },
  minimap: { image: 'testimage', showAnnotations: true },
  params: { fillColor: 'blueBlack' },
  position: { x: 0, y: 0 },
  rows: {
    direction: 'asc',
    list: [
      { data: {}, name: 'a' },
      { data: {}, name: 'b' },
      { data: {}, name: 'c' },
    ],
    order: ['a', 'b', 'c'],
    sortBy: 1,
  },
  save: { imageType: 'png', name: 'test' },
  settings: {
    current: { fillColor: 'greenBlack' },
    default: { fillColor: 'blueBlack' },
  },
};

describe('Store', () => {
  beforeEach(() => {
    store = createStore(Reducers);
  });

  test(`check that initial state of the root reducer matches
    what child reducers return given an empty action`,
  () => {
    expect(store.getState().annotations).toEqual(Annotations(undefined, {}));
    expect(store.getState().columns).toEqual(Columns(undefined, {}));
    expect(store.getState().dimensions).toEqual(Dimensions(undefined, {}));
    expect(store.getState().formStep).toEqual(FormStep(undefined, {}));
    expect(store.getState().genes).toEqual(Genes(undefined, {}));
    expect(store.getState().header).toEqual(Header(undefined, {}));
    expect(store.getState().home).toEqual(Home(undefined, {}));
    expect(store.getState().markers).toEqual(Marker(undefined, {}));
    expect(store.getState().minimap).toEqual(Map(undefined, {}));
    expect(store.getState().news).toEqual(News(undefined, {}));
    expect(store.getState().newsItem).toEqual(NewsItem(undefined, {}));
    expect(store.getState().newsPage).toEqual(NewsPage(undefined, {}));
    expect(store.getState().parameters).toEqual(Parameters(undefined, {}));
    expect(store.getState().position).toEqual(Position(undefined, {}));
    expect(store.getState().rows).toEqual(Rows(undefined, {}));
    expect(store.getState().save).toEqual(Save(undefined, {}));
    expect(store.getState().search).toEqual(Search(undefined, {}));
    expect(store.getState().settings).toEqual(Settings(undefined, {}));
  });

  test('annotation visualization reducer handles its actions', () => {
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
    action = { type: 'TOGGLE_MOVE_ANNOTATION' };
    store.dispatch(action);
    expect(store.getState().annotations).toEqual(Annotations({ color: '#000000', list: [] }, action));
  });

  test('columns reducer handles its actions', () => {
    const action = {
      ref: 'a',
      type: 'SET_REFERENCE',
    };
    store.dispatch(action);
    expect(store.getState().columns).toEqual(Columns(undefined, action));
  });

  test('dimension reducer handles its actions', () => {
    const action = {
      height: 0.5,
      pageX: 25,
      pageY: 30,
      type: 'SET_DIMENSIONS',
      width: 0.3,
    };
    store.dispatch(action);
    expect(store.getState().dimensions).toEqual(Dimensions(undefined, action));
  });

  test('form step reducer handles its actions', () => {
    let action = { step: 1, type: 'INCREMENT_FORM_STEP' };
    store.dispatch(action);
    expect(store.getState().formStep).toEqual(FormStep(undefined, action));
    action = { type: 'CLEAR_FORM_STEP' };
    store.dispatch(action);
    expect(store.getState().formStep).toEqual(FormStep(undefined, action));
  });

  test('genes visualization reducer handles its actions', () => {
    let action = {
      columnMap: {},
      columns: [],
      rowMap: {},
      rows: [],
      type: 'SET_SELECTIONS',
    };
    store.dispatch(action);
    expect(store.getState().genes).toEqual(Genes(undefined, action));
    action = {
      selections: {
        columns: [],
        columnsSelected: [],
        rows: [],
        rowsSelected: [],
      },
      type: 'STORE_SELECTIONS',
    };
    store.dispatch(action);
    expect(store.getState().genes).toEqual(Genes(undefined, action));
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

  test('marker visualization reducer handles its actions', () => {
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
    action = { type: 'TOGGLE_RECORD_MARKER' };
    store.dispatch(action);
    expect(store.getState().markers).toEqual(Marker({ color: '#0000ff', list: [] }, action));
  });

  test('minimap visualization reducer handles its actions', () => {
    const action = { type: 'TOGGLE_ANNOTATIONS' };
    store.dispatch(action);
    expect(store.getState().minimap).toEqual(Map(undefined, action));
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

  test('save visualization reducer handles its actions', () => {
    let action = { imageType: 'png', type: 'SAVE_IMAGE_TYPE' };
    store.dispatch(action);
    expect(store.getState().save).toEqual(Save(undefined, action));
    action = { name: 'test name', type: 'SAVE_SESSION_NAME' };
    store.dispatch(action);
    expect(store.getState().save).toEqual(Save({ imageType: 'png' }, action));
  });

  test('search visualization reducer handles its actions', () => {
    let action = { type: 'CLEAR_SEARCH' };
    store.dispatch(action);
    expect(store.getState().search).toEqual(Search(undefined, action));
    action = { term: 'testTerm', type: 'SET_SEARCH_TERM' };
    store.dispatch(action);
    expect(store.getState().search).toEqual(Search(undefined, action));
  });

  test('settings visualization reducer handles its actions', () => {
    let action = { setting: 'a', type: 'UPDATE_SETTING', value: 'b' };
    store.dispatch(action);
    expect(store.getState().settings).toEqual(Settings(undefined, action));
    action = { type: 'RESET_SETTINGS' };
    store.dispatch(action);
    expect(store.getState().settings).toEqual(Settings(undefined, action));
  });

  test('reducers handle interactive file actions', () => {
    let action = { type: 'CLEAR_INTERACTIVE_FILE' };
    store.dispatch(action);
    expect(store.getState().annotations).toEqual(Annotations(undefined, action));
    expect(store.getState().columns).toEqual(Columns(undefined, action));
    expect(store.getState().genes).toEqual(Genes(undefined, action));
    expect(store.getState().markers).toEqual(Marker(undefined, action));
    expect(store.getState().minimap).toEqual(Map(undefined, action));
    expect(store.getState().position).toEqual(Position(undefined, action));
    expect(store.getState().rows).toEqual(Rows(undefined, action));
    expect(store.getState().save).toEqual(Save(undefined, action));
    expect(store.getState().settings).toEqual(Settings(undefined, action));
    action = { file, type: 'PARSE_INTERACTIVE_FILE' };
    store.dispatch(action);
    expect(store.getState().annotations).toEqual(Annotations(undefined, action));
    expect(store.getState().columns).toEqual(Columns(undefined, action));
    expect(store.getState().genes).toEqual(Genes(undefined, action));
    expect(store.getState().markers).toEqual(Marker(undefined, action));
    expect(store.getState().minimap).toEqual(Map(undefined, action));
    expect(store.getState().position).toEqual(Position(undefined, action));
    expect(store.getState().rows).toEqual(Rows(undefined, action));
    expect(store.getState().save).toEqual(Save(undefined, action));
    expect(store.getState().settings).toEqual(Settings(undefined, action));
  });

  test('reducers handle row update actions', () => {
    const action = {
      direction: 'desc',
      id: 1,
      sortBy: 2,
      type: 'UPDATE_ROWS',
    };
    store.dispatch(action);
    expect(store.getState().position).toEqual(Position(undefined, action));
    expect(store.getState().rows).toEqual(Rows(undefined, action));
  });
});
