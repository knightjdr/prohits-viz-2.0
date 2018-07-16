import DeepCopy from '../../../helpers/deep-copy';
import MarkerReducer from './marker-reducer';
import * as actions from './marker-actions';

// import DefaultState from '../../../visualization/test/markers';

const DefaultState = {
  color: '#000000',
  list: [],
  record: false,
};

jest.mock('../../../helpers/deep-copy');
DeepCopy.mockReturnValue(DefaultState.list);

describe('Marker set reducer', () => {
  it('should return an empty initial state', () => {
    expect(MarkerReducer(undefined, {})).toEqual(DefaultState);
  });

  it('should handle ADD_MARKER', () => {
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
    expect(MarkerReducer(undefined, {
      height: 0.5,
      type: actions.ADD_MARKER,
      width: 0.2,
      x: 0,
      y: 1,
    })).toEqual(expectedState);
  });

  it('should handle CLEAR_ALL_MARKERS', () => {
    const expectedState = {
      ...DefaultState,
      list: [],
    };
    expect(MarkerReducer(undefined, {
      type: actions.CLEAR_ALL_MARKERS,
    })).toEqual(expectedState);
  });

  it('should handle CLEAR_LAST_MARKER', () => {
    const expectedState = {
      ...DefaultState,
      list: [],
    };
    expect(MarkerReducer(undefined, {
      type: actions.CLEAR_LAST_MARKER,
    })).toEqual(expectedState);
  });

  it('should handle SET_MARKER_COLOR', () => {
    const expectedState = {
      ...DefaultState,
      color: '#000000',
    };
    expect(MarkerReducer(undefined, {
      color: '#000000',
      type: actions.SET_MARKER_COLOR,
    })).toEqual(expectedState);
  });

  it('should handle TOGGLE_RECORD_MARKER', () => {
    const expectedState = {
      ...DefaultState,
      record: true,
    };
    expect(MarkerReducer(undefined, {
      type: actions.TOGGLE_RECORD_MARKER,
    })).toEqual(expectedState);
  });
});
