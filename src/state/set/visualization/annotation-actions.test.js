import configureMockStore from 'redux-mock-store';
import deepFreeze from 'deep-freeze';
import thunk from 'redux-thunk';

import * as actions from './annotation-actions';

// configure mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Annotation placement', () => {
  let expectedActions;

  beforeAll(() => {
    const state = {
      dimensions: {
        columns: 20,
        pageX: 10,
        pageY: 10,
        rows: 20,
      },
      position: {
        x: 0,
        y: 0,
      },
    };
    const store = mockStore(state);
    deepFreeze(store);
    store.dispatch(actions.placeAnnotation('text'));
    expectedActions = store.getActions();
  });

  afterAll(() => {
    actions.placeAnnotation.mockRestore();
  });

  it('should dispatch a single action', () => {
    expect(expectedActions.length).toBe(1);
  });

  it('should update the annotation at the given index', () => {
    expect(expectedActions).toContainEqual({
      text: 'text',
      type: actions.ADD_ANNOTATION,
      x: 0.25,
      y: 0.25,
    });
  });
});

describe('Annotation update', () => {
  let expectedActions;

  beforeAll(() => {
    const annotations = {
      color: '#000000',
      fontSize: 12,
      list: [
        { text: 'a', x: 0, y: 0 },
        { text: 'b', x: 0, y: 0 },
        { text: 'c', x: 0, y: 0 },
      ],
      show: true,
    };
    const store = mockStore({ annotations });
    deepFreeze(store);
    store.dispatch(actions.updateList(1, 0.5, 0.5));
    expectedActions = store.getActions();
  });

  afterAll(() => {
    actions.updateAnnotation.mockRestore();
  });

  it('should dispatch a single action', () => {
    expect(expectedActions.length).toBe(1);
  });

  it('should update the annotation at the given index', () => {
    const updatedAnnoations = [
      { text: 'a', x: 0, y: 0 },
      { text: 'b', x: 0.5, y: 0.5 },
      { text: 'c', x: 0, y: 0 },
    ];
    expect(expectedActions).toContainEqual({
      list: updatedAnnoations,
      type: actions.UPDATE_ANNOTATION,
    });
  });
});

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

  it('should dispatch an action to set annotation font size', () => {
    const expectedAction = {
      fontSize: 14,
      type: actions.SET_ANNOTATION_SIZE,
    };
    expect(actions.setAnnotationSize(14)).toEqual(expectedAction);
  });

  it('should dispatch an action to toggle annotations', () => {
    const expectedAction = {
      type: actions.TOGGLE_ANNOTATIONS,
    };
    expect(actions.toggleAnnotations()).toEqual(expectedAction);
  });

  it('should dispatch an action to update annotations', () => {
    const expectedAction = {
      list: [],
      type: actions.UPDATE_ANNOTATION,
    };
    expect(actions.updateAnnotation([])).toEqual(expectedAction);
  });
});
