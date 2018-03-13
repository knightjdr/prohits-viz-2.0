import { createStore } from 'redux';

// reducers
import Home from './get/home-reducer';
import Reducers from './reducers';

// create store
const store = createStore(Reducers);

describe('Store', () => {
  test(`check that initial state of the root reducer matches
    what child reducers return given an empty action`,
  () => {
    expect(store.getState().home).toEqual(Home(undefined, {}));
  });

  test('child Home reducer handles fill action', () => {
    const action = { type: 'FILL_HOME' };
    store.dispatch(action);
    expect(store.getState().home).toEqual(Home(undefined, action));
  });
});
