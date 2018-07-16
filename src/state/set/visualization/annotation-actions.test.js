import * as actions from './annotation-actions';

describe('Visualization annotation set actions', () => {
  it('should dispatch an action to add an annotation', () => {
    const expectedAction = {
      text: 'test',
      type: actions.ADD_ANNOTATION,
      x: 0,
      y: 0.2,
    };
    expect(actions.addAnnotation('test', 0, 0.2)).toEqual(expectedAction);
  });

  it('should dispatch an action to clear all annotations', () => {
    const expectedAction = { type: actions.CLEAR_ALL_ANNOTATIONS };
    expect(actions.clearAllAnnotations()).toEqual(expectedAction);
  });

  it('should dispatch an action to clear last annotation', () => {
    const expectedAction = { type: actions.CLEAR_LAST_ANNOTATION };
    expect(actions.clearLastAnnotation()).toEqual(expectedAction);
  });

  it('should dispatch an action to set annotation color', () => {
    const expectedAction = {
      color: '#000000',
      type: actions.SET_ANNOTATION_COLOR,
    };
    expect(actions.setAnnotationColor('#000000')).toEqual(expectedAction);
  });

  it('should dispatch an action to toggle moving annotations', () => {
    const expectedAction = {
      type: actions.TOGGLE_MOVE_ANNOTATION,
    };
    expect(actions.toggleMoveAnnotation()).toEqual(expectedAction);
  });
});
