import Go, { initState } from './go-reducer';
import * as actions from './go-actions';

describe('Analysis GO table set reducer', () => {
  it('should return initial state', () => {
    const action = {};
    const expectedState = initState;
    expect(Go(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_GO_ANNOTATION action', () => {
    const action = {
      type: actions.CLEAR_GO_ANNOTATION,
    };
    const expectedState = {
      ...initState,
      annotation: '',
    };
    expect(Go(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_GO_ANNOTATION action', () => {
    const action = {
      text: 'text',
      type: actions.SET_GO_ANNOTATION,
    };
    const expectedState = {
      ...initState,
      annotation: 'text',
    };
    expect(Go(undefined, action)).toEqual(expectedState);
  });
});
