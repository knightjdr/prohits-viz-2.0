import DeepCopy from '../../../helpers/deep-copy';
import AnnotationReducer from './annotation-reducer';
import * as actions from './annotation-actions';
import * as fileActions from '../interactive-file-actions';

const DefaultState = {
  color: '#f44336',
  list: [],
  move: false,
};

jest.mock('../../../helpers/deep-copy');
DeepCopy.mockReturnValue(DefaultState.list);

describe('Annotation set reducer', () => {
  it('should return an empty initial state', () => {
    const action = {};
    const expectedState = DefaultState;
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
      ...DefaultState,
      list: [
        ...DefaultState.list,
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
      ...DefaultState,
      list: [],
    };
    expect(AnnotationReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = {
      ...DefaultState,
    };
    expect(AnnotationReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_LAST_ANNOTATION action', () => {
    const action = {
      type: actions.CLEAR_LAST_ANNOTATION,
    };
    const expectedState = {
      ...DefaultState,
      list: [],
    };
    expect(AnnotationReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE action', () => {
    const list = [{ text: 'test', x: 0.1, y: 0.1 }];
    DeepCopy.mockReturnValueOnce(list);
    const action = {
      file: {
        annotations: {
          color: '#000000',
          list,
          move: true,
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    };
    const expectedState = {
      color: '#000000',
      list,
      move: true,
    };
    expect(AnnotationReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_ANNOTATION_COLOR action', () => {
    const action = {
      color: '#000000',
      type: actions.SET_ANNOTATION_COLOR,
    };
    const expectedState = {
      ...DefaultState,
      color: '#000000',
    };
    expect(AnnotationReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle TOGGLE_MOVE_ANNOTATION action', () => {
    const action = {
      type: actions.TOGGLE_MOVE_ANNOTATION,
    };
    const expectedState = {
      ...DefaultState,
      move: true,
    };
    expect(AnnotationReducer(undefined, action)).toEqual(expectedState);
  });
});
