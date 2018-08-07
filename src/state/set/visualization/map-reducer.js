import * as actions from './map-actions';
import * as fileActions from '../interactive-file-actions';
import * as rowActions from './rows-actions';

const defaultState = {
  attached: true,
  image: null,
  isSyncing: false,
  synced: true,
  syncError: false,
  syncImage: null,
};

const Map = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return { ...defaultState };
    case actions.MAP_SYNCHED:
      return {
        ...state,
        isSyncing: false,
        synced: true,
        syncError: false,
        syncImage: action.syncImage,
      };
    case actions.MAP_SYNCHRONIZING:
      return {
        ...state,
        isSyncing: true,
        synced: false,
        syncError: false,
      };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return {
        ...defaultState,
        image: action.file.minimap.image,
        synced: action.file.minimap.synced,
        syncImage: action.file.minimap.syncImage,
      };
    case rowActions.RESTORE_ROWS:
      return {
        ...state,
        synced: true,
        syncImage: null,
      };
    case actions.SYNC_ERROR:
      return {
        ...state,
        isSyncing: false,
        synced: false,
        syncError: true,
      };
    case actions.TOGGLE_MAP_ATTACH:
      return {
        ...state,
        attached: !state.attached,
      };
    case rowActions.UPDATE_ROWS:
      return {
        ...state,
        synced: false,
        syncImage: null,
      };
    default:
      return state;
  }
};
export default Map;
