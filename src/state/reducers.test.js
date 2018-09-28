import { createStore } from 'redux';

// reducers
import Annotations from './set/visualization/annotation-reducer';
import Columns from './set/visualization/columns-reducer';
import Dimensions from './set/visualization/dimension-reducer';
import Display from './set/visualization/display-reducer';
import FormStep from './set/form-step-reducer';
import Genes from './set/visualization/genes-reducer';
import Header from './set/header-reducer';
import Home from './get/home-reducer';
import Map from './set/visualization/map-reducer';
import Marker from './set/visualization/marker-reducer';
import News from './get/news-reducer';
import NewsItem from './get/news-item-reducer';
import NewsPage from './set/news-page-reducer';
import Panel from './set/visualization/panel-reducer';
import Parameters from './set/visualization/params-reducer';
import Position from './set/visualization/position-reducer';
import Rows from './set/visualization/rows-reducer';
import Save from './set/visualization/save-reducer';
import Search from './set/visualization/search-reducer';
import Session from './set/session-reducer';
import Settings from './set/visualization/settings-reducer';
import Reducers from './reducers';
import Tabs from './set/visualization/tab-reducer';
import VizAnalysis from './set/analysis/viz-analysis-reducer';
import VizAnalysisForm from './set/analysis/viz-analysis-form-reducer';

const file = {
  annotations: {
    color: '#000000',
    fontSize: 12,
    list: [],
    show: false,
  },
  customize: [],
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
  minimap: { image: 'testimage', synced: true, syncImage: null },
  panel: true,
  parameters: { fillColor: 'blueBlack' },
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
  search: {
    columns: {},
    match: false,
    rows: {},
    searched: false,
    term: '',
  },
  settings: {
    current: { fillColor: 'greenBlack' },
    default: { fillColor: 'blueBlack' },
  },
  tabs: {
    available: ['main', 'go'],
    selected: 'main',
    show: false,
  },
};

describe('Store', () => {
  describe('initial state of root reducers', () => {
    let store;
    beforeEach(() => {
      store = createStore(Reducers);
    });

    it('should match what annotation reducer returns with an empty action', () => {
      expect(store.getState().annotations).toEqual(Annotations(undefined, {}));
    });

    it('should match what columns reducer returns with an empty action', () => {
      expect(store.getState().columns).toEqual(Columns(undefined, {}));
    });

    it('should match what dimensions reducer returns with an empty action', () => {
      expect(store.getState().dimensions).toEqual(Dimensions(undefined, {}));
    });

    it('should match what display reducer returns with an empty action', () => {
      expect(store.getState().display).toEqual(Display(undefined, {}));
    });

    it('should match what formStep reducer returns with an empty action', () => {
      expect(store.getState().formStep).toEqual(FormStep(undefined, {}));
    });

    it('should match what genes reducer returns with an empty action', () => {
      expect(store.getState().genes).toEqual(Genes(undefined, {}));
    });

    it('should match what header reducer returns with an empty action', () => {
      expect(store.getState().header).toEqual(Header(undefined, {}));
    });

    it('should match what home reducer returns with an empty action', () => {
      expect(store.getState().home).toEqual(Home(undefined, {}));
    });

    it('should match what markers reducer returns with an empty action', () => {
      expect(store.getState().markers).toEqual(Marker(undefined, {}));
    });

    it('should match what minimap reducer returns with an empty action', () => {
      expect(store.getState().minimap).toEqual(Map(undefined, {}));
    });

    it('should match what news reducer returns with an empty action', () => {
      expect(store.getState().news).toEqual(News(undefined, {}));
    });

    it('should match what newsItem reducer returns with an empty action', () => {
      expect(store.getState().newsItem).toEqual(NewsItem(undefined, {}));
    });

    it('should match what newsPage reducer returns with an empty action', () => {
      expect(store.getState().newsPage).toEqual(NewsPage(undefined, {}));
    });

    it('should match what parameters reducer returns with an empty action', () => {
      expect(store.getState().parameters).toEqual(Parameters(undefined, {}));
    });

    it('should match what position reducer returns with an empty action', () => {
      expect(store.getState().position).toEqual(Position(undefined, {}));
    });

    it('should match what rows reducer returns with an empty action', () => {
      expect(store.getState().rows).toEqual(Rows(undefined, {}));
    });

    it('should match what save reducer returns with an empty action', () => {
      expect(store.getState().save).toEqual(Save(undefined, {}));
    });

    it('should match what search reducer returns with an empty action', () => {
      expect(store.getState().search).toEqual(Search(undefined, {}));
    });

    it('should match what sessions reducer returns with an empty action', () => {
      expect(store.getState().session).toEqual(Session(undefined, {}));
    });

    it('should match what settings reducer returns with an empty action', () => {
      expect(store.getState().settings).toEqual(Settings(undefined, {}));
    });

    it('should match what tab reducer returns with an empty action', () => {
      expect(store.getState().tabs).toEqual(Tabs(undefined, {}));
    });

    it('should match what analysis reducer returns with an empty action', () => {
      expect(store.getState().vizanalysis).toEqual(VizAnalysis(undefined, {}));
    });

    it('should match what analysis form reducer returns with an empty action', () => {
      expect(store.getState().vizanalysisform).toEqual(VizAnalysisForm(undefined, {}));
    });
  });

  describe('with annotation visualization reducer', () => {
    let store;
    beforeEach(() => {
      store = createStore(Reducers);
    });

    it('should handle ADD_ANNOTATION action', () => {
      const action = {
        text: 'test',
        type: 'ADD_ANNOTATION',
        x: 0.1,
        y: 0.2,
      };
      store.dispatch(action);
      expect(store.getState().annotations).toEqual(Annotations(undefined, action));
    });

    it('should handle CLEAR_ALL_ANNOTATIONS action', () => {
      const action = { type: 'CLEAR_ALL_ANNOTATIONS' };
      store.dispatch(action);
      expect(store.getState().annotations).toEqual(Annotations(undefined, action));
    });

    it('should handle CLEAR_LAST_ANNOTATION action', () => {
      const action = { type: 'CLEAR_LAST_ANNOTATION' };
      store.dispatch(action);
      expect(store.getState().annotations).toEqual(Annotations(undefined, action));
    });

    it('should handle SET_ANNOTATION_COLOR action', () => {
      const action = { color: '#000000', type: 'SET_ANNOTATION_COLOR' };
      store.dispatch(action);
      expect(store.getState().annotations).toEqual(Annotations(undefined, action));
    });

    it('should handle SET_ANNOTATION_SIZE action', () => {
      const action = { fontSize: 14, type: 'SET_ANNOTATION_SIZE' };
      store.dispatch(action);
      expect(store.getState().annotations).toEqual(Annotations(undefined, action));
    });

    it('should handle TOGGLE_ANNOTATIONS action', () => {
      const action = { type: 'TOGGLE_ANNOTATIONS' };
      store.dispatch(action);
      expect(store.getState().annotations).toEqual(Annotations(undefined, action));
    });

    it('should handle UPDATE_ANNOTATION action', () => {
      const action = { list: [], type: 'UPDATE_ANNOTATION' };
      store.dispatch(action);
      expect(store.getState().annotations).toEqual(Annotations(undefined, action));
    });
  });

  it('should handle columns visualization actions', () => {
    const store = createStore(Reducers);
    const action = {
      ref: 'a',
      type: 'SET_REFERENCE',
    };
    store.dispatch(action);
    expect(store.getState().columns).toEqual(Columns(undefined, action));
  });

  it('should handle dimension visualization actions', () => {
    const store = createStore(Reducers);
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

  describe('with display visualization reducer', () => {
    let store;
    beforeEach(() => {
      store = createStore(Reducers);
    });

    it('should handle CHANGE_PANEL_TAB action', () => {
      const action = {
        tab: 'map',
        type: 'CHANGE_PANEL_TAB',
      };
      store.dispatch(action);
      expect(store.getState().display).toEqual(Display(undefined, action));
    });

    it('should handle RESET_MAP_POSITION action', () => {
      const action = {
        type: 'RESET_MAP_POSITION',
      };
      store.dispatch(action);
      expect(store.getState().display).toEqual(Display(undefined, action));
    });

    it('should handle TOGGLE_SELECTION_BOX action', () => {
      const action = {
        type: 'TOGGLE_SELECTION_BOX',
      };
      store.dispatch(action);
      expect(store.getState().display).toEqual(Display(undefined, action));
    });

    it('should handle TOGGLE_TOOLTIPS action', () => {
      const action = {
        type: 'TOGGLE_TOOLTIPS',
      };
      store.dispatch(action);
      expect(store.getState().display).toEqual(Display(undefined, action));
    });

    it('should handle UPDATE_MAP_POSITION action', () => {
      const action = {
        right: 100,
        top: 200,
        type: 'UPDATE_MAP_POSITION',
      };
      store.dispatch(action);
      expect(store.getState().display).toEqual(Display(undefined, action));
    });

    it('should handle UPDATE_PLOT_POSITION action', () => {
      const action = {
        fixed: true,
        translate: 300,
        type: 'UPDATE_PLOT_POSITION',
      };
      store.dispatch(action);
      expect(store.getState().display).toEqual(Display(undefined, action));
    });
  });

  describe('with form step reducer', () => {
    let store;
    beforeEach(() => {
      store = createStore(Reducers);
    });

    it('should handle INCREMENT_FORM_STEP action', () => {
      const action = { step: 1, type: 'INCREMENT_FORM_STEP' };
      store.dispatch(action);
      expect(store.getState().formStep).toEqual(FormStep(undefined, action));
    });

    it('should handle CLEAR_FORM_STEP action', () => {
      const action = { type: 'CLEAR_FORM_STEP' };
      store.dispatch(action);
      expect(store.getState().formStep).toEqual(FormStep(undefined, action));
    });
  });

  describe('with genes visualization reducer', () => {
    let store;
    beforeEach(() => {
      store = createStore(Reducers);
    });

    it('should handle UPDATE_SELECTIONS action', () => {
      const action = {
        selections: [],
        type: 'UPDATE_SELECTIONS',
      };
      store.dispatch(action);
      expect(store.getState().genes).toEqual(Genes(undefined, action));
    });
  });

  describe('with header reducer', () => {
    let store;
    beforeEach(() => {
      store = createStore(Reducers);
    });

    it('should handle SET_FILE_HEADER action', () => {
      const action = { header: ['column1', 'column2'], type: 'SET_FILE_HEADER' };
      store.dispatch(action);
      expect(store.getState().header).toEqual(Header(undefined, action));
    });

    it('should handle CLEAR_FILE_HEADER action', () => {
      const action = { type: 'CLEAR_FILE_HEADER' };
      store.dispatch(action);
      expect(store.getState().header).toEqual(Header(undefined, action));
    });
  });

  it('with home reducer handles its action', () => {
    const store = createStore(Reducers);
    const action = { type: 'FILL_HOME' };
    store.dispatch(action);
    expect(store.getState().home).toEqual(Home(undefined, action));
  });

  describe('with map visualization reducer', () => {
    let store;
    beforeEach(() => {
      store = createStore(Reducers);
    });

    it('should handle MAP_SYNCHED action', () => {
      const action = { type: 'MAP_SYNCHED' };
      store.dispatch(action);
      expect(store.getState().header).toEqual(Header(undefined, action));
    });

    it('should handle MAP_SYNCHRONIZING action', () => {
      const action = { type: 'MAP_SYNCHRONIZING' };
      store.dispatch(action);
      expect(store.getState().header).toEqual(Header(undefined, action));
    });

    it('should handle SYNC_ERROR action', () => {
      const action = { type: 'SYNC_ERROR' };
      store.dispatch(action);
      expect(store.getState().header).toEqual(Header(undefined, action));
    });
  });

  describe('with marker visualization reducer', () => {
    let store;
    beforeEach(() => {
      store = createStore(Reducers);
    });

    it('should handle ADD_MARKER action', () => {
      const action = {
        height: 0.5,
        type: 'ADD_MARKER',
        width: 0.5,
        x: 0.1,
        y: 0.2,
      };
      store.dispatch(action);
      expect(store.getState().markers).toEqual(Marker(undefined, action));
    });

    it('should handle CLEAR_ALL_MARKERS action', () => {
      const action = { type: 'CLEAR_ALL_MARKERS' };
      store.dispatch(action);
      expect(store.getState().markers).toEqual(Marker(undefined, action));
    });

    it('should handle CLEAR_LAST_MARKER action', () => {
      const action = { type: 'CLEAR_LAST_MARKER' };
      store.dispatch(action);
      expect(store.getState().markers).toEqual(Marker(undefined, action));
    });

    it('should handle SET_MARKER_COLOR action', () => {
      const action = { color: '#0000ff', type: 'SET_MARKER_COLOR' };
      store.dispatch(action);
      expect(store.getState().markers).toEqual(Marker(undefined, action));
    });

    it('should handle TOGGLE_MARKERS action', () => {
      const action = { type: 'TOGGLE_MARKERS' };
      store.dispatch(action);
      expect(store.getState().markers).toEqual(Marker(undefined, action));
    });

    it('should handle TOGGLE_RECORD_MARKER action', () => {
      const action = { type: 'TOGGLE_RECORD_MARKER' };
      store.dispatch(action);
      expect(store.getState().markers).toEqual(Marker(undefined, action));
    });
  });

  describe('with news reducer', () => {
    let store;
    beforeEach(() => {
      store = createStore(Reducers);
    });

    it('should handle GET_NEWS action', () => {
      const action = { type: 'GET_NEWS' };
      store.dispatch(action);
      expect(store.getState().news).toEqual(News(undefined, action));
    });

    it('should handle FILL_NEWS action', () => {
      const action = { list: ['a'], type: 'FILL_NEWS' };
      store.dispatch(action);
      expect(store.getState().news).toEqual(News(undefined, action));
    });

    it('should handle NEWS_ERROR action', () => {
      const action = { type: 'NEWS_ERROR' };
      store.dispatch(action);
      expect(store.getState().news).toEqual(News(undefined, action));
    });
  });

  describe('with news item reducer', () => {
    let store;
    beforeEach(() => {
      store = createStore(Reducers);
    });

    it('should handle GET_NEWS_ITEM action', () => {
      const action = { id: 'id', type: 'GET_NEWS_ITEM' };
      store.dispatch(action);
      expect(store.getState().newsItem).toEqual(NewsItem(undefined, action));
    });

    it('should handle FILL_NEWS_ITEM action', () => {
      const action = { id: 'id', item: 'a', type: 'FILL_NEWS_ITEM' };
      store.dispatch(action);
      expect(store.getState().newsItem).toEqual(NewsItem(undefined, action));
    });

    it('should handle NEWS_ITEM_ERROR action', () => {
      const action = { id: 'id', type: 'NEWS_ITEM_ERROR' };
      store.dispatch(action);
      expect(store.getState().newsItem).toEqual(NewsItem(undefined, action));
    });
  });

  it('news page reducer handles its action', () => {
    const store = createStore(Reducers);
    const action = { page: ['a'], pageIndex: 2, type: 'SET_NEWS_PAGE' };
    store.dispatch(action);
    expect(store.getState().newsPage).toEqual(NewsPage(undefined, action));
  });

  it('with panel reducer handles its action', () => {
    const store = createStore(Reducers);
    const action = { type: 'TOGGLE_PANEL' };
    store.dispatch(action);
    expect(store.getState().panel).toEqual(Panel(undefined, action));
  });

  it('with position reducer handles its action', () => {
    const store = createStore(Reducers);
    const action = { type: 'UPDATE_POSITION', x: 0.5, y: 0.4 };
    store.dispatch(action);
    expect(store.getState().position).toEqual(Position(undefined, action));
  });

  describe('with save visualization reducer', () => {
    let store;
    beforeEach(() => {
      store = createStore(Reducers);
    });

    it('should handle SAVE_IMAGE_TYPE action', () => {
      const action = { imageType: 'png', type: 'SAVE_IMAGE_TYPE' };
      store.dispatch(action);
      expect(store.getState().save).toEqual(Save(undefined, action));
    });

    it('should handle SAVE_SESSION_NAME action', () => {
      const action = { name: 'test name', type: 'SAVE_SESSION_NAME' };
      store.dispatch(action);
      expect(store.getState().save).toEqual(Save(undefined, action));
    });
  });

  describe('search visualization reducer', () => {
    let store;
    beforeEach(() => {
      store = createStore(Reducers);
    });

    it('should handle CLEAR_SEARCH action', () => {
      const action = { type: 'CLEAR_SEARCH' };
      store.dispatch(action);
      expect(store.getState().search).toEqual(Search(undefined, action));
    });

    it('should handle SET_SEARCH_TERM action', () => {
      const action = { term: 'test', type: 'SET_SEARCH_TERM' };
      store.dispatch(action);
      expect(store.getState().search).toEqual(Search(undefined, action));
    });

    it('should handle SET_SEARCH_RESULTS action', () => {
      const action = {
        columns: {},
        match: false,
        rows: {},
        term: 'testTerm',
        type: 'SET_SEARCH_TERM',
      };
      store.dispatch(action);
      expect(store.getState().search).toEqual(Search(undefined, action));
    });
  });

  it('with session reducer handles its action', () => {
    const store = createStore(Reducers);
    const action = { id: 'abc', type: 'SET_SESSION_ID' };
    store.dispatch(action);
    expect(store.getState().session).toEqual(Session(undefined, action));
  });

  describe('settings visualization reducer', () => {
    let store;
    beforeEach(() => {
      store = createStore(Reducers);
    });

    it('should handle UPDATE_SETTING action', () => {
      const action = { setting: 'a', type: 'UPDATE_SETTING', value: 'b' };
      store.dispatch(action);
      expect(store.getState().settings).toEqual(Settings(undefined, action));
    });

    it('should handle RESET_SETTINGS action', () => {
      const action = { type: 'RESET_SETTINGS' };
      store.dispatch(action);
      expect(store.getState().settings).toEqual(Settings(undefined, action));
    });
  });

  describe('tab visualization reducer', () => {
    let store;
    beforeEach(() => {
      store = createStore(Reducers);
    });

    it('should handle ADD_TAB action', () => {
      const action = { tab: 'test', type: 'ADD_TAB' };
      store.dispatch(action);
      expect(store.getState().tabs).toEqual(Tabs(undefined, action));
    });

    it('should handle REMOVE_TAB action', () => {
      const action = { tab: 'test', type: 'REMOVE_TAB' };
      store.dispatch(action);
      expect(store.getState().tabs).toEqual(Tabs(undefined, action));
    });

    it('should handle SET_TAB action', () => {
      const action = { tab: 'test', type: 'REMOVE_TAB' };
      store.dispatch(action);
      expect(store.getState().tabs).toEqual(Tabs(undefined, action));
    });
  });

  describe('viz analysis actions', () => {
    it('should handle RUN_VIZ_ANALYSIS action', () => {
      const store = createStore(Reducers);
      const action = { anlaysisType: 'go', type: 'RUN_VIZ_ANALYSIS' };
      store.dispatch(action);
      expect(store.getState().vizanalysis).toEqual(VizAnalysis(undefined, action));
    });

    it('should handle SET_VIZ_ANALYSIS_TYPE action', () => {
      const store = createStore(Reducers);
      const action = { anlaysisType: 'go', type: 'SET_VIZ_ANALYSIS_TYPE' };
      store.dispatch(action);
      expect(store.getState().vizanalysis).toEqual(VizAnalysis(undefined, action));
    });

    it('should handle SET_VIZ_ANALYSIS_RESULTS action', () => {
      const store = createStore(Reducers);
      const action = { anlaysisType: 'go', results: {}, type: 'SET_VIZ_ANALYSIS_TYPE' };
      store.dispatch(action);
      expect(store.getState().vizanalysis).toEqual(VizAnalysis(undefined, action));
    });

    it('should handle VIZ_ANALYSIS_ERROR action', () => {
      const store = createStore(Reducers);
      const action = { anlaysisType: 'go', type: 'VIZ_ANALYSIS_ERROR' };
      store.dispatch(action);
      expect(store.getState().vizanalysis).toEqual(VizAnalysis(undefined, action));
    });
  });

  it('should handle viz analysis form actions', () => {
    const store = createStore(Reducers);
    const action = { setting: { param: 'a' }, type: 'SET_GO_PARAMETER' };
    store.dispatch(action);
    expect(store.getState().vizanalysisform).toEqual(VizAnalysisForm(undefined, action));
  });

  describe('dispatching interactive file action', () => {
    describe('CLEAR_INTERACTIVE_FILE', () => {
      const action = { type: 'CLEAR_INTERACTIVE_FILE' };
      const store = createStore(Reducers);

      beforeAll(() => {
        store.dispatch(action);
      });

      it('to annotations reducer', () => {
        expect(store.getState().annotations).toEqual(Annotations(undefined, action));
      });

      it('to columns reducer', () => {
        expect(store.getState().columns).toEqual(Columns(undefined, action));
      });

      it('to genes reducer', () => {
        expect(store.getState().genes).toEqual(Genes(undefined, action));
      });

      it('to markers reducer', () => {
        expect(store.getState().markers).toEqual(Marker(undefined, action));
      });

      it('to minimap reducer', () => {
        expect(store.getState().minimap).toEqual(Map(undefined, action));
      });

      it('to position reducer', () => {
        expect(store.getState().position).toEqual(Position(undefined, action));
      });

      it('to rows reducer', () => {
        expect(store.getState().rows).toEqual(Rows(undefined, action));
      });

      it('to save reducer', () => {
        expect(store.getState().save).toEqual(Save(undefined, action));
      });

      it('to settings reducer', () => {
        expect(store.getState().settings).toEqual(Settings(undefined, action));
      });
    });

    describe('PARSE_INTERACTIVE_FILE', () => {
      const action = { file, type: 'PARSE_INTERACTIVE_FILE' };
      const store = createStore(Reducers);

      beforeAll(() => {
        store.dispatch(action);
      });

      it('to annotations reducer', () => {
        expect(store.getState().annotations).toEqual(Annotations({}, action));
      });

      it('to columns reducer', () => {
        expect(store.getState().columns).toEqual(Columns(undefined, action));
      });

      it('to genes reducer', () => {
        expect(store.getState().genes).toEqual(Genes(undefined, action));
      });

      it('to markers reducer', () => {
        expect(store.getState().markers).toEqual(Marker(undefined, action));
      });

      it('to minimap reducer', () => {
        expect(store.getState().minimap).toEqual(Map(undefined, action));
      });

      it('to position reducer', () => {
        expect(store.getState().position).toEqual(Position(undefined, action));
      });

      it('to rows reducer', () => {
        expect(store.getState().rows).toEqual(Rows(undefined, action));
      });

      it('to save reducer', () => {
        expect(store.getState().save).toEqual(Save(undefined, action));
      });

      it('to settings reducer', () => {
        expect(store.getState().settings).toEqual(Settings(undefined, action));
      });
    });
  });

  describe('dispatching row update action', () => {
    describe('RESTORE_ROWS', () => {
      const action = {
        direction: null,
        id: 1,
        list: [],
        rows: {
          list: [],
          mapped: {},
        },
        sortBy: null,
        type: 'RESTORE_ROWS',
      };
      const store = createStore(Reducers);

      beforeAll(async (done) => {
        store.dispatch(action);
        done();
      });

      it('to genes reducer', () => {
        expect(store.getState().genes).toEqual(Genes(undefined, action));
      });

      it('to map reducer', () => {
        expect(store.getState().minimap).toEqual(Map(undefined, action));
      });

      it('to rows reducer', () => {
        expect(store.getState().rows).toEqual(Rows(undefined, action));
      });
    });

    describe('UPDATE_ROWS', () => {
      const action = {
        direction: 'desc',
        id: 1,
        list: [],
        rows: {
          list: [],
          mapped: {},
        },
        sortBy: 1,
        type: 'RESTORE_ROWS',
      };
      const store = createStore(Reducers);

      beforeAll(async (done) => {
        store.dispatch(action);
        done();
      });

      it('to genes reducer', () => {
        expect(store.getState().genes).toEqual(Genes(undefined, action));
      });

      it('to map reducer', () => {
        expect(store.getState().minimap).toEqual(Map(undefined, action));
      });

      it('to position reducer', () => {
        expect(store.getState().position).toEqual(Position(undefined, action));
      });

      it('to rows reducer', () => {
        expect(store.getState().rows).toEqual(Rows(undefined, action));
      });
    });
  });

  describe('dispatching TOGGLE_ANNOTATIONS action', () => {
    const action = { type: 'TOGGLE_ANNOTATIONS' };
    const store = createStore(Reducers);

    beforeAll(() => {
      store.dispatch(action);
    });

    it('to annotation reducer', () => {
      expect(store.getState().annotations).toEqual(Annotations(undefined, action));
    });

    it('to marker reducer', () => {
      expect(store.getState().markers).toEqual(Marker(undefined, action));
    });
  });
});
