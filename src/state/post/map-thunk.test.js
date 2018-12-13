import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

import syncMap from './map-thunk';
import * as mapActions from '../set/visualization/map-actions';

// configure mock store
const mockStore = configureMockStore([thunk]);

afterAll(() => {
  fetchMock.restore();
});

describe('Map fetch thunk', () => {
  describe('when fetching heatmap', () => {
    describe('with successful response', () => {
      let dispatcedActions;

      beforeAll(async (done) => {
        fetchMock.postOnce('*', 200);

        const state = {
          parameters: {
            scoreType: 'lte',
          },
          rows: {
            list: [{ data: [], name: 'name' }],
          },
          session: 'sessionid',
          settings: {
            current: {
              abundanceCap: 50,
              fillColor: 'blueBlack',
              imageType: 'heatmap',
              invertColor: false,
              minAbundance: 5,
            },
          },
        };
        const store = mockStore(state);
        store.dispatch(syncMap())
          .then(() => {
            dispatcedActions = store.getActions();
            done();
          });
      });

      it('should call sync route', () => {
        expect(fetchMock.lastUrl()).toBe('http://localhost:8004/api/sync/');
      });

      it('should call fetch with correct headers', () => {
        const expectedHeaders = {
          accept: 'application/json',
          'content-type': 'application/json',
          session: 'sessionid',
        };
        expect(fetchMock.lastOptions().headers.map).toEqual(expectedHeaders);
      });

      it('should call fetch with correct body', () => {
        const expectedBody = {
          abundanceCap: 50,
          fillColor: 'blueBlack',
          invertColor: false,
          minAbundance: 5,
          rows: [{ data: [], name: 'name' }],
          scoreType: 'lte',
          imageType: 'heatmap',
        };
        expect(fetchMock.lastOptions().body).toBe(JSON.stringify(expectedBody));
      });

      it('should dispatch synchronizing action', () => {
        expect(dispatcedActions).toContainEqual({
          type: mapActions.MAP_SYNCHRONIZING,
          updateOriginal: false,
        });
      });

      it('should not dispatch synchronize error', () => {
        expect(dispatcedActions).not.toContainEqual({
          type: mapActions.SYNC_ERROR,
        });
      });
    });

    describe('with 404 response', () => {
      let dispatcedActions;

      beforeAll(async (done) => {
        fetchMock.postOnce('*', 404, { overwriteRoutes: true });

        const state = {
          parameters: {
            scoreType: 'lte',
          },
          rows: {
            list: [{ data: [], name: 'name' }],
          },
          session: 'sessionid',
          settings: {
            current: {
              abundanceCap: 50,
              fillColor: 'blueBlack',
              imageType: 'heatmap',
              invertColor: false,
              minAbundance: 5,
            },
          },
        };
        const store = mockStore(state);
        store.dispatch(syncMap())
          .then(() => {
            dispatcedActions = store.getActions();
            done();
          });
      });

      it('should dispatch synchronize error', () => {
        expect(dispatcedActions).toContainEqual({
          type: mapActions.SYNC_ERROR,
        });
      });
    });
  });

  describe('when fetching dotplot', () => {
    let dispatcedActions;

    beforeAll(async (done) => {
      fetchMock.postOnce('*', 200, { overwriteRoutes: true });

      const state = {
        parameters: {
          scoreType: 'lte',
        },
        rows: {
          list: [{ data: [], name: 'name' }],
        },
        session: 'sessionid',
        settings: {
          current: {
            abundanceCap: 50,
            edgeColor: 'blueBlack',
            fillColor: 'blueBlack',
            imageType: 'dotplot',
            invertColor: false,
            minAbundance: 5,
            primaryFilter: 0.01,
            secondaryFilter: 0.05,
          },
        },
      };
      const store = mockStore(state);
      store.dispatch(syncMap(true))
        .then(() => {
          dispatcedActions = store.getActions();
          done();
        });
    });

    it('should call sync route', () => {
      expect(fetchMock.lastUrl()).toBe('http://localhost:8004/api/sync/');
    });

    it('should call fetch with correct body', () => {
      const expectedBody = {
        abundanceCap: 50,
        fillColor: 'blueBlack',
        invertColor: false,
        minAbundance: 5,
        rows: [{ data: [], name: 'name' }],
        scoreType: 'lte',
        imageType: 'dotplot',
        edgeColor: 'blueBlack',
        primaryFilter: 0.01,
        secondaryFilter: 0.05,
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

    it('should dispatch synchronizing action', () => {
      expect(dispatcedActions).toContainEqual({
        type: mapActions.MAP_SYNCHRONIZING,
        updateOriginal: true,
      });
    });

    it('should not dispatch synchronize error', () => {
      expect(dispatcedActions).not.toContainEqual({
        type: mapActions.SYNC_ERROR,
      });
    });
  });
});
