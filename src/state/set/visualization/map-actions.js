export const MAP_SYNCHED = 'MAP_SYNCHED';
export const MAP_SYNCHRONIZING = 'MAP_SYNCHRONIZING';
export const SYNC_ERROR = 'SYNC_ERROR';

export const mapSynced = syncImage => ({
  syncImage,
  type: MAP_SYNCHED,
});

export const synchError = () => ({
  type: SYNC_ERROR,
});

export const synchronizeMap = () => ({
  type: MAP_SYNCHRONIZING,
});

export const syncMap = () => (
  (dispatch) => {
    dispatch(synchronizeMap());
  }
);
