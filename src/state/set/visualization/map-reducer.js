import * as actions from './map-actions';
import * as fileActions from '../interactive-file-actions';
import * as rowActions from './rows-actions';

export const defaultState = {
  attached: true,
  image: null,
  isSyncing: false,
  synced: true,
  syncError: false,
  syncImage: null,
  updateOriginal: false,
};

const Map = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return { ...defaultState };
    case actions.MAP_SYNCHED:
      return {
        ...state,
        image: state.updateOriginal ? action.syncImage : state.image,
        isSyncing: false,
        synced: true,
        syncError: false,
        syncImage: !state.updateOriginal ? action.syncImage : null,
        updateOriginal: false,
      };
    case actions.MAP_SYNCHRONIZING:
      return {
        ...state,
        isSyncing: true,
        synced: false,
        syncError: false,
        updateOriginal: action.updateOriginal,
      };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return action.file.minimap
        ? {
          ...defaultState,
          image: action.file.minimap.image,
          synced: action.file.minimap.synced,
          syncImage: action.file.minimap.syncImage,
        }
        : { ...defaultState };
    case rowActions.RESTORE_ROWS:
      return {
        ...state,
        synced: true,
        syncImage: null,
        updateOriginal: false,
      };
    case actions.SYNC_ERROR:
      return {
        ...state,
        isSyncing: false,
        synced: false,
        syncError: true,
        updateOriginal: false,
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
        updateOriginal: false,
      };
    default:
      return state;
  }
};
export default Map;
