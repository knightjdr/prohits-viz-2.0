export const MAP_SYNCHED = 'MAP_SYNCHED';
export const MAP_SYNCHRONIZING = 'MAP_SYNCHRONIZING';
export const SYNC_ERROR = 'SYNC_ERROR';
export const TOGGLE_MAP_ATTACH = 'TOGGLE_MAP_ATTACH';

export const mapSynced = syncImage => ({
  syncImage,
  type: MAP_SYNCHED,
});

export const synchronizeMap = () => ({
  type: MAP_SYNCHRONIZING,
});

export const synchError = () => ({
  type: SYNC_ERROR,
});

export const toggleMapAttach = () => ({
  type: TOGGLE_MAP_ATTACH,
});
