import PanelReducer from './panel-reducer';
import * as actions from './panel-actions';

describe('Panel reducer set reducer', () => {
  it('should return default initial state', () => {
    const action = {};
    const expectedState = true;
    expect(PanelReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle TOGGLE_PANEL action', () => {
    const action = {
      type: actions.TOGGLE_PANEL,
    };
    const expectedState = false;
    expect(PanelReducer(undefined, action)).toEqual(expectedState);
  });
});
