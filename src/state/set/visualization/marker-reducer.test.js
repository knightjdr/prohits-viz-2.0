import deepCopy from '../../../helpers/deep-copy';
import MarkerReducer from './marker-reducer';
import * as actions from './marker-actions';
import * as fileActions from '../interactive-file-actions';

const DefaultState = {
  color: '#000000',
  list: [],
  record: false,
  show: true,
};

jest.mock('../../../helpers/deep-copy');
deepCopy.mockReturnValue(DefaultState.list);

describe('Marker set reducer', () => {
  it('should return an empty initial state', () => {
    const action = {};
    const expectedState = DefaultState;
    expect(MarkerReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle ADD_MARKER action', () => {
    const action = {
      height: 0.5,
      type: actions.ADD_MARKER,
      width: 0.2,
      x: 0,
      y: 1,
    };
    const expectedState = {
      ...DefaultState,
      list: [
        ...DefaultState.list,
        {
          height: 0.5,
          width: 0.2,
          x: 0,
          y: 1,
        },
      ],
    };
    expect(MarkerReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_ALL_MARKERS action', () => {
    const action = {
      type: actions.CLEAR_ALL_MARKERS,
    };
    const expectedState = {
      ...DefaultState,
      list: [],
    };
    expect(MarkerReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = {
      ...DefaultState,
    };
    expect(MarkerReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_LAST_MARKER action', () => {
    const action = {
      type: actions.CLEAR_LAST_MARKER,
    };
    const expectedState = {
      ...DefaultState,
      list: [],
    };
    expect(MarkerReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE action', () => {
    const list = [
      {
        height: 0.5,
        width: 0.5,
        x: 0.1,
        y: 0.1,
      },
    ];
    deepCopy.mockReturnValueOnce(list);
    const action = {
      file: {
        markers: {
          color: '#ff0000',
          list,
          record: true,
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    };
    const expectedState = {
      color: '#ff0000',
      list,
      record: true,
    };
    expect(MarkerReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_MARKER_COLOR action', () => {
    const action = {
      color: '#000000',
      type: actions.SET_MARKER_COLOR,
    };
    const expectedState = {
      ...DefaultState,
      color: '#000000',
    };
    expect(MarkerReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle TOGGLE_MARKERS action', () => {
    const action = {
      type: actions.TOGGLE_MARKERS,
    };
    const expectedState = {
      ...DefaultState,
      show: false,
    };
    expect(MarkerReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle TOGGLE_RECORD_MARKER action', () => {
    const action = {
      type: actions.TOGGLE_RECORD_MARKER,
    };
    const expectedState = {
      ...DefaultState,
      record: true,
    };
    expect(MarkerReducer(undefined, action)).toEqual(expectedState);
  });
});
