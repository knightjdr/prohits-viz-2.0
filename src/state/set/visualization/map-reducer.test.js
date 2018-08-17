import MapReducer from './map-reducer';
import * as actions from './map-actions';
import * as fileActions from '../interactive-file-actions';
import * as rowActions from './rows-actions';

const DefaultState = {
  attached: true,
  image: null,
  isSyncing: false,
  synced: true,
  syncError: false,
  syncImage: null,
  updateOriginal: false,
};

describe('Map set reducer', () => {
  it('should return an empty initial state', () => {
    const action = {};
    const expectedState = DefaultState;
    expect(MapReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = {
      ...DefaultState,
    };
    expect(MapReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle MAP_SYNCHED action', () => {
    const action = {
      syncImage: 'image',
      type: actions.MAP_SYNCHED,
    };
    const expectedState = {
      ...DefaultState,
      isSyncing: false,
      synced: true,
      syncError: false,
      syncImage: 'image',
      updateOriginal: false,
    };
    expect(MapReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle MAP_SYNCHED action when update original is true', () => {
    const action = {
      syncImage: 'image',
      type: actions.MAP_SYNCHED,
    };
    const currentState = {
      ...DefaultState,
      updateOriginal: true,
    };
    const expectedState = {
      ...DefaultState,
      image: 'image',
      isSyncing: false,
      synced: true,
      syncError: false,
      updateOriginal: false,
    };
    expect(MapReducer(currentState, action)).toEqual(expectedState);
  });

  it('should handle MAP_SYNCHRONIZING action', () => {
    const action = {
      type: actions.MAP_SYNCHRONIZING,
      updateOriginal: true,
    };
    const expectedState = {
      ...DefaultState,
      isSyncing: true,
      synced: false,
      syncError: false,
      updateOriginal: true,
    };
    expect(MapReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE action', () => {
    const action = {
      file: {
        minimap: {
          image: 'image',
          synced: true,
          syncImage: null,
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    };
    const expectedState = {
      ...DefaultState,
      image: 'image',
    };
    expect(MapReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle RESTORE_ROWS action', () => {
    const action = {
      type: rowActions.RESTORE_ROWS,
    };
    const expectedState = {
      ...DefaultState,
      synced: true,
      syncImage: null,
    };
    expect(MapReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SYNC_ERROR action', () => {
    const action = {
      type: actions.SYNC_ERROR,
    };
    const expectedState = {
      ...DefaultState,
      isSyncing: false,
      synced: false,
      syncError: true,
      updateOriginal: false,
    };
    expect(MapReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle TOGGLE_MAP_ATTACH action', () => {
    const action = {
      type: actions.TOGGLE_MAP_ATTACH,
    };
    const expectedState = {
      ...DefaultState,
      attached: false,
    };
    expect(MapReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_ROWS action', () => {
    const action = {
      type: rowActions.UPDATE_ROWS,
    };
    const expectedState = {
      ...DefaultState,
      synced: false,
      syncImage: null,
      updateOriginal: false,
    };
    expect(MapReducer(undefined, action)).toEqual(expectedState);
  });
});
