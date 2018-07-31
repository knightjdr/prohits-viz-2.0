import * as actions from './map-actions';

describe('Map set actions', () => {
  it('should dispatch an action that the map is synched', () => {
    const expectedAction = {
      syncImage: 'image',
      type: actions.MAP_SYNCHED,
    };
    expect(actions.mapSynced('image')).toEqual(expectedAction);
  });

  it('should dispatch an action that the map is synchronizing', () => {
    const expectedAction = {
      type: actions.MAP_SYNCHRONIZING,
    };
    expect(actions.synchronizeMap()).toEqual(expectedAction);
  });

  it('should dispatch an action that the synchronizing gave an error', () => {
    const expectedAction = {
      type: actions.SYNC_ERROR,
    };
    expect(actions.synchError()).toEqual(expectedAction);
  });
});
