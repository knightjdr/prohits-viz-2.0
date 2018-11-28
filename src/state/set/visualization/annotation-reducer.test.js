import deepCopy from '../../../helpers/deep-copy';
import AnnotationReducer, { defaultState } from './annotation-reducer';
import * as actions from './annotation-actions';
import * as fileActions from '../interactive-file-actions';

jest.mock('../../../helpers/deep-copy');
deepCopy.mockReturnValue(defaultState.list);

describe('Annotation set reducer', () => {
  it('should return an empty initial state', () => {
    const action = {};
    const expectedState = defaultState;
    expect(AnnotationReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle ADD_ANNOTATION action', () => {
    const action = {
      text: 'test',
      type: actions.ADD_ANNOTATION,
      x: 0,
      y: 1,
    };
    const expectedState = {
      ...defaultState,
      list: [
        ...defaultState.list,
        {
          text: 'test',
          x: 0,
          y: 1,
        },
      ],
    };
    expect(AnnotationReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_ALL_ANNOTATIONS action', () => {
    const action = {
      type: actions.CLEAR_ALL_ANNOTATIONS,
    };
    const expectedState = {
      ...defaultState,
      list: [],
    };
    expect(AnnotationReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = {
      ...defaultState,
    };
    expect(AnnotationReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_LAST_ANNOTATION action', () => {
    const action = {
      type: actions.CLEAR_LAST_ANNOTATION,
    };
    const expectedState = {
      ...defaultState,
      list: [],
    };
    expect(AnnotationReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE action', () => {
    const list = [{ text: 'test', x: 0.1, y: 0.1 }];
    deepCopy.mockReturnValueOnce(list);
    const action = {
      file: {
        annotations: {
          color: '#000000',
          list,
          show: false,
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    };
    const expectedState = {
      ...defaultState,
      color: '#000000',
      list,
      show: false,
    };
    expect(AnnotationReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_ANNOTATION_COLOR action', () => {
    const action = {
      color: '#000000',
      type: actions.SET_ANNOTATION_COLOR,
    };
    const expectedState = {
      ...defaultState,
      color: '#000000',
    };
    expect(AnnotationReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_ANNOTATION_SIZE action', () => {
    const action = {
      fontSize: 14,
      type: actions.SET_ANNOTATION_SIZE,
    };
    const expectedState = {
      ...defaultState,
      fontSize: 14,
    };
    expect(AnnotationReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle TOGGLE_ANNOTATIONS action', () => {
    const action = {
      type: actions.TOGGLE_ANNOTATIONS,
    };
    const expectedState = {
      ...defaultState,
      show: false,
    };
    expect(AnnotationReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_ANNOTATION action', () => {
    const list = [{ text: 'test', x: 0.1, y: 0.1 }];
    deepCopy.mockReturnValueOnce(list);
    const action = {
      list,
      type: actions.UPDATE_ANNOTATION,
    };
    const expectedState = {
      ...defaultState,
      list,
    };
    expect(AnnotationReducer(undefined, action)).toEqual(expectedState);
  });
});
