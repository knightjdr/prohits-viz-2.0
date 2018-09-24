import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

import imageData from './image-data';
import saveImage from './save-thunk';
import * as actions from './save-actions';

jest.mock('./image-data');
imageData.mockReturnValue({});

// configure mock store
const mockStore = configureMockStore([thunk]);
const state = {
  save: { imageType: 'svg' },
  session: 'sessionid',
  settings: {
    current: { imageType: 'dotplot' },
  },
};
const store = mockStore(state);

afterAll(() => {
  fetchMock.restore();
});

describe('Save image thunk', () => {
  describe('with successful response', () => {
    let dispatcedActions;

    beforeAll(async (done) => {
      fetchMock.postOnce('*', 200);
      store.dispatch(saveImage())
        .then(() => {
          dispatcedActions = store.getActions();
          done();
        });
    });

    it('should call sync route', () => {
      expect(fetchMock.lastUrl()).toBe('http://localhost:8004/api/export/dotplot');
    });

    it('should call fetch with body object', () => {
      expect(fetchMock.lastOptions().body).not.toBeNull();
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
        type: actions.SAVING_IMAGE,
      });
    });

    it('should not dispatch synchronize error', () => {
      expect(dispatcedActions).not.toContainEqual({
        type: actions.SAVE_ERROR,
      });
    });
  });

  describe('with 404 response', () => {
    let dispatcedActions;

    beforeAll(async (done) => {
      fetchMock.postOnce('*', 400, { overwriteRoutes: true });
      store.dispatch(saveImage())
        .then(() => {
          dispatcedActions = store.getActions();
          done();
        });
    });

    it('should dispatch synchronize error', () => {
      expect(dispatcedActions).toContainEqual({
        type: actions.SAVE_ERROR,
      });
    });
  });
});
