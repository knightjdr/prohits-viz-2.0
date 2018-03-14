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

  it('should create an action to fill home state', () => {
    const expectedAction = {
      data: data.success,
      type: actions.FILL_HOME,
    };
    expect(actions.fillHome(data.success)).toEqual(expectedAction);
  });

  it('no actions called if state already loaded', () => {
    const store = mockStore({ home: { isLoaded: true } });
    expect(store.dispatch(FetchHome())).toBeNull();
  });

  it('calls fill action if the fetch response was successful', () => {
    fetchMock.getOnce('*', { data: data.success });
    const store = mockStore({ home: data.initial });
    return store.dispatch(FetchHome())
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(1);
        expect(expectedActions).toContainEqual({
          data: data.success,
          type: actions.FILL_HOME,
        });
      });
  });

  it('no actions called if fetch response was unsuccessful', () => {
    fetchMock.getOnce('*', { status: 400 }, { overwriteRoutes: true });
    const store = mockStore({ home: data.initial });
    return store.dispatch(FetchHome())
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(0);
      });
  });
});
