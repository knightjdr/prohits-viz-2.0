import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

import getTaskStatus from './task-thunk';
import * as taskActions from '../set/task-actions';

// configure mock store
const mockStore = configureMockStore([thunk]);

afterAll(() => {
  fetchMock.restore();
});

describe('Get task status', () => {
  describe('with no tasks', () => {
    let dispatcedActions;

    beforeAll(async (done) => {
      const state = {
        session: 'sessionid',
        tasks: {
          list: [],
        },
      };
      const store = mockStore(state);
      store.dispatch(getTaskStatus());
      dispatcedActions = store.getActions();
      done();
    });

    it('should not call any actions', () => {
      expect(dispatcedActions.length).toBe(0);
    });
  });

  describe('with successful response', () => {
    let dispatcedActions;

    beforeAll(async (done) => {
      const mockResponse = {
        list: ['task1', 'task2'],
        status: 'running',
      };
      fetchMock.postOnce('*', mockResponse);
      const state = {
        session: 'sessionid',
        tasks: {
          list: ['task1'],
        },
      };
      const store = mockStore(state);
      store.dispatch(getTaskStatus('task2'))
        .then(() => {
          dispatcedActions = store.getActions();
          done();
        });
    });

    it('should call sync route', () => {
      expect(fetchMock.lastUrl()).toBe('http://localhost:8004/api/task');
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
        tasks: ['task1', 'task2'],
      };
      expect(fetchMock.lastOptions().body).toBe(JSON.stringify(expectedBody));
    });

    it('should dispatch updating action', () => {
      expect(dispatcedActions).toContainEqual({
        type: taskActions.UPDATING_TASK_STATUS,
      });
    });

    it('should dispatch update status action', () => {
      expect(dispatcedActions).toContainEqual({
        list: ['task1', 'task2'],
        status: 'running',
        type: taskActions.UPDATE_STATUS,
      });
    });
  });

  describe('with successful response without arg', () => {
    beforeAll(async (done) => {
      const mockResponse = {
        list: ['task1'],
        status: 'running',
      };
      fetchMock.postOnce('*', mockResponse, { overwriteRoutes: true });
      const state = {
        session: 'sessionid',
        tasks: {
          list: ['task1'],
        },
      };
      const store = mockStore(state);
      store.dispatch(getTaskStatus())
        .then(() => {
          done();
        });
    });

    it('should call fetch with correct body', () => {
      const expectedBody = {
        tasks: ['task1'],
      };
      expect(fetchMock.lastOptions().body).toBe(JSON.stringify(expectedBody));
    });
  });

  describe('with 404 response', () => {
    let dispatcedActions;

    beforeAll(async (done) => {
      fetchMock.postOnce('*', 404, { overwriteRoutes: true });
      const state = {
        session: 'sessionid',
        tasks: {
          list: ['task1'],
        },
      };
      const store = mockStore(state);
      store.dispatch(getTaskStatus('task2'))
        .then(() => {
          dispatcedActions = store.getActions();
          done();
        });
    });

    it('should dispatch updating action', () => {
      expect(dispatcedActions).toContainEqual({
        type: taskActions.UPDATING_TASK_STATUS,
      });
    });

    it('should dispatch update error action', () => {
      expect(dispatcedActions).toContainEqual({
        type: taskActions.UPDATE_ERROR,
      });
    });
  });
});

