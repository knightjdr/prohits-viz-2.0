import mapReducer, { defaultState } from './map-reducer';
import * as actions from './map-actions';
import * as fileActions from '../interactive-file-actions';
import * as rowActions from './rows-actions';

describe('Map set reducer', () => {
  it('should return an empty initial state', () => {
    const action = {};
    const expectedState = defaultState;
    expect(mapReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = {
      ...defaultState,
    };
    expect(mapReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle MAP_SYNCHED action', () => {
    const action = {
      syncImage: 'image',
      type: actions.MAP_SYNCHED,
    };
    const expectedState = {
      ...defaultState,
      isSyncing: false,
      synced: true,
      syncError: false,
      syncImage: 'image',
      updateOriginal: false,
    };
    expect(mapReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle MAP_SYNCHED action when update original is true', () => {
    const action = {
      syncImage: 'image',
      type: actions.MAP_SYNCHED,
    };
    const currentState = {
      ...defaultState,
      updateOriginal: true,
    };
    const expectedState = {
      ...defaultState,
      image: 'image',
      isSyncing: false,
      synced: true,
      syncError: false,
      updateOriginal: false,
    };
    expect(mapReducer(currentState, action)).toEqual(expectedState);
  });

  it('should handle MAP_SYNCHRONIZING action', () => {
    const action = {
      type: actions.MAP_SYNCHRONIZING,
      updateOriginal: true,
    };
    const expectedState = {
      ...defaultState,
      isSyncing: true,
      synced: false,
      syncError: false,
      updateOriginal: true,
    };
    expect(mapReducer(undefined, action)).toEqual(expectedState);
  });

  describe('parse file', () => {
    it('should handle PARSE_INTERACTIVE_FILE action when minimap field present', () => {
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
        ...defaultState,
        image: 'image',
      };
      expect(mapReducer(undefined, action)).toEqual(expectedState);
    });

    it('should handle PARSE_INTERACTIVE_FILE action when minimap field missing', () => {
      const action = {
        file: {},
        type: fileActions.PARSE_INTERACTIVE_FILE,
      };
      const expectedState = { ...defaultState };
      expect(mapReducer(undefined, action)).toEqual(expectedState);
    });
  });

  it('should handle RESTORE_ROWS action', () => {
    const action = {
      type: rowActions.RESTORE_ROWS,
    };
    const expectedState = {
      ...defaultState,
      synced: true,
      syncImage: null,
    };
    expect(mapReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SYNC_ERROR action', () => {
    const action = {
      type: actions.SYNC_ERROR,
    };
    const expectedState = {
      ...defaultState,
      isSyncing: false,
      synced: false,
      syncError: true,
      updateOriginal: false,
    };
    expect(mapReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle TOGGLE_MAP_ATTACH action', () => {
    const action = {
      type: actions.TOGGLE_MAP_ATTACH,
    };
    const expectedState = {
      ...defaultState,
      attached: false,
    };
    expect(mapReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_ROWS action', () => {
    const action = {
      type: rowActions.UPDATE_ROWS,
    };
    const expectedState = {
      ...defaultState,
      synced: false,
      syncImage: null,
      updateOriginal: false,
    };
    expect(mapReducer(undefined, action)).toEqual(expectedState);
  });
});
