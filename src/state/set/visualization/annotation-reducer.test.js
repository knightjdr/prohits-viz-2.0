import DeepCopy from '../../../helpers/deep-copy';
import AnnotationReducer from './annotation-reducer';
import * as actions from './annotation-actions';
import * as fileActions from '../interactive-file-actions';

// import DefaultState from '../../../visualization/test/annotations';
const DefaultState = {
  color: '#f44336',
  list: [],
  move: false,
};

jest.mock('../../../helpers/deep-copy');
DeepCopy.mockReturnValue(DefaultState.list);

describe('Annotation set reducer', () => {
  it('should return an empty initial state', () => {
    expect(AnnotationReducer(undefined, {})).toEqual(DefaultState);
  });

  it('should handle ADD_ANNOTATION', () => {
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
    expect(AnnotationReducer(undefined, {
      text: 'test',
      type: actions.ADD_ANNOTATION,
      x: 0,
      y: 1,
    })).toEqual(expectedState);
  });

  it('should handle CLEAR_ALL_ANNOTATIONS', () => {
    const expectedState = {
      ...DefaultState,
      list: [],
    };
    expect(AnnotationReducer(undefined, {
      type: actions.CLEAR_ALL_ANNOTATIONS,
    })).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE', () => {
    const expectedState = {
      ...DefaultState,
    };
    expect(AnnotationReducer(undefined, {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    })).toEqual(expectedState);
  });

  it('should handle CLEAR_LAST_ANNOTATION', () => {
    const expectedState = {
      ...DefaultState,
      list: [],
    };
    expect(AnnotationReducer(undefined, {
      type: actions.CLEAR_LAST_ANNOTATION,
    })).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE', () => {
    const list = [{ text: 'test', x: 0.1, y: 0.1 }];
    DeepCopy.mockReturnValueOnce(list);
    const expectedState = {
      color: '#000000',
      list,
      move: true,
    };
    expect(AnnotationReducer(undefined, {
      file: {
        annotations: {
          color: '#000000',
          list,
          move: true,
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    })).toEqual(expectedState);
  });

  it('should handle SET_ANNOTATION_COLOR', () => {
    const expectedState = {
      ...DefaultState,
      color: '#000000',
    };
    expect(AnnotationReducer(undefined, {
      color: '#000000',
      type: actions.SET_ANNOTATION_COLOR,
    })).toEqual(expectedState);
  });

  it('should handle TOGGLE_MOVE_ANNOTATION', () => {
    const expectedState = {
      ...DefaultState,
      move: true,
    };
    expect(AnnotationReducer(undefined, {
      type: actions.TOGGLE_MOVE_ANNOTATION,
    })).toEqual(expectedState);
  });
});
