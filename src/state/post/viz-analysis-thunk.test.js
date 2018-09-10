import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

import performVizAnalysis, { getSelected } from './viz-analysis-thunk';
import * as analysisActions from '../set/analysis/viz-analysis-actions';
import * as tabActions from '../set/visualization/tab-actions';

// configure mock store
const mockStore = configureMockStore([thunk]);

afterAll(() => {
  fetchMock.restore();
});

describe('Unique selected genes', () => {
  it('should return an array of unique genes', () => {
    const columns = ['a', 'b', 'c'];
    const rows = ['c', 'd', 'e'];
    expect(getSelected(columns, rows)).toEqual(['a', 'b', 'c', 'd', 'e']);
  });
});

describe('Viz analysis post thunk', () => {
  describe('when type is not set', () => {
    let dispatcedActions;

    beforeAll(async (done) => {
      const state = {
        genes: {},
        session: 'sessionid',
        vizanalysis: {
          type: '',
        },
        vizanalysisform: {},
      };
      const store = mockStore(state);
      store.dispatch(performVizAnalysis())
        .then(() => {
          dispatcedActions = store.getActions();
          done();
        });
    });

    it('should not dispatch an action', () => {
      expect(dispatcedActions.length).toBe(0);
    });
  });

  describe('when there are no query genes', () => {
    let dispatcedActions;

    beforeAll(async (done) => {
      const state = {
        genes: {
          columnsSelected: [],
          rowsSelected: [],
        },
        session: 'sessionid',
        vizanalysis: {
          type: 'go',
        },
        vizanalysisform: {},
      };
      const store = mockStore(state);
      store.dispatch(performVizAnalysis())
        .then(() => {
          dispatcedActions = store.getActions();
          done();
        });
    });

    it('should not dispatch an action', () => {
      expect(dispatcedActions.length).toBe(0);
    });
  });

  describe('when type and genes are set', () => {
    describe('with a successful response', () => {
      let dispatcedActions;

      beforeAll(async (done) => {
        fetchMock.postOnce('*', 200);
        const state = {
          genes: {
            columnsSelected: ['a', 'b'],
            rowsSelected: ['b', 'c'],
          },
          session: 'sessionid',
          vizanalysis: {
            type: 'go',
          },
          vizanalysisform: {
            go: { field: 'test' },
          },
        };
        const store = mockStore(state);
        store.dispatch(performVizAnalysis())
          .then(() => {
            dispatcedActions = store.getActions();
            done();
          });
      });

      it('should call analysis route', () => {
        expect(fetchMock.lastUrl()).toBe('http://localhost:8004/api/analysis/viz/go');
      });

      it('should call fetch with correct body', () => {
        const expectedBody = {
          field: 'test',
          query: 'a b c',
        };
        expect(fetchMock.lastOptions().body).toBe(JSON.stringify(expectedBody));
      });

      it('should call fetch with correct headers', () => {
        const expectedHeaders = {
          accept: 'application/json',
          'content-type': 'application/json',
          session: 'sessionid',
        };
        expect(fetchMock.lastOptions().headers.map).toEqual(expectedHeaders);
      });

      it('should dispatch an action to set the running state', () => {
        expect(dispatcedActions).toContainEqual({
          analysisType: 'go',
          type: analysisActions.RUN_VIZ_ANALYSIS,
        });
      });

      it('should dispatch an action to add the analysis tab', () => {
        expect(dispatcedActions).toContainEqual({
          tab: 'go',
          type: tabActions.ADD_TAB,
        });
      });

      it('should not dispatch synchronize error', () => {
        expect(dispatcedActions).not.toContainEqual({
          analysisType: 'go',
          type: analysisActions.VIZ_ANALYSIS_ERROR,
        });
      });
    });

    describe('with 404 response', () => {
      let dispatcedActions;

      beforeAll(async (done) => {
        fetchMock.postOnce('*', 400, { overwriteRoutes: true });

        const state = {
          genes: {
            columnsSelected: ['a', 'b'],
            rowsSelected: ['b', 'c'],
          },
          session: 'sessionid',
          vizanalysis: {
            type: 'go',
          },
          vizanalysisform: {
            go: { field: 'test' },
          },
        };
        const store = mockStore(state);
        store.dispatch(performVizAnalysis())
          .then(() => {
            dispatcedActions = store.getActions();
            done();
          });
      });

      it('should dispatch synchronize error', () => {
        expect(dispatcedActions).toContainEqual({
          analysisType: 'go',
          type: analysisActions.VIZ_ANALYSIS_ERROR,
        });
      });
    });
  });
});
