import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import FetchHome, * as actions from './home-actions';

// configure mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// mock success data
const data = {
  initial: { isLoaded: false, news: [], spotlight: [] },
  success: { news: ['a', 'b'], spotlight: ['a', 'b'] },
};

describe('Home actions', () => {
  afterAll(() => {
    fetchMock.restore();
  });

  it('should dispatch an action to fill home state', () => {
    const action = data.success;
    const expectedAction = {
      data: data.success,
      type: actions.FILL_HOME,
    };
    expect(actions.fillHome(action)).toEqual(expectedAction);
  });

  it('should not dispatch an action if state already loaded', () => {
    const store = mockStore({ home: { isLoaded: true } });
    expect(store.dispatch(FetchHome())).toBeNull();
  });

  describe('on successful fetch response', () => {
    let expectedActions;
    let store;
    beforeAll(async (done) => {
      fetchMock.getOnce('*', { body: data.success });
      store = mockStore({ home: data.initial });
      store.dispatch(FetchHome())
        .then(() => {
          expectedActions = store.getActions();
          done();
        });
    });

    it('should dispatch a single action', () => {
      expect(expectedActions.length).toBe(1);
    });

    it('should dispatch fill action', () => {
      expect(expectedActions).toContainEqual({
        data: data.success,
        type: actions.FILL_HOME,
      });
    });
  });

  it('should not dispatch an action if fetch response was unsuccessful', () => {
    fetchMock.getOnce('*', { status: 400 }, { overwriteRoutes: true });
    const store = mockStore({ home: data.initial });
    return store.dispatch(FetchHome())
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(0);
      });
  });
});
