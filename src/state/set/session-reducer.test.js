import SessionReducer from './session-reducer';
import SET_SESSION_ID from './session-actions';

describe('Session set reducer', () => {
  it('should return default state', () => {
    expect(SessionReducer(undefined, {})).toBeNull();
  });

  it('should handle SET_SESSION_ID', () => {
    const action = {
      id: 'abc',
      type: SET_SESSION_ID,
    };
    expect(SessionReducer(undefined, action)).toBe('abc');
  });
});
