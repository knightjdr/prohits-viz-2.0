import * as actions from './marker-actions';

describe('Visualization marker set actions', () => {
  it('should dispatch an action to add an annotation', () => {
    const expectedAction = {
      height: 0.5,
      type: actions.ADD_MARKER,
      width: 0.2,
      x: 0,
      y: 0.2,
    };
    expect(actions.addMarker(0.5, 0.2, 0, 0.2)).toEqual(expectedAction);
  });

  it('should dispatch an action to clear all annotations', () => {
    const expectedAction = { type: actions.CLEAR_ALL_MARKERS };
    expect(actions.clearAllMarkers()).toEqual(expectedAction);
  });

  it('should dispatch an action to clear last annotation', () => {
    const expectedAction = { type: actions.CLEAR_LAST_MARKER };
    expect(actions.clearLastMarker()).toEqual(expectedAction);
  });

  it('should dispatch an action to set annotation color', () => {
    const expectedAction = {
      color: '#000000',
      type: actions.SET_MARKER_COLOR,
    };
    expect(actions.setMarkerColor('#000000')).toEqual(expectedAction);
  });

  it('should dispatch an action to toggle recording selection markers', () => {
    const expectedAction = {
      type: actions.TOGGLE_RECORD_MARKER,
    };
    expect(actions.toggleRecordMarker()).toEqual(expectedAction);
  });
});
