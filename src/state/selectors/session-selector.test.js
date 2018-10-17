import sessionSelector from './session-selector';

const state = {
  session: 'sessionID',
};

describe('Session selector', () => {
  it('should return a session ID', () => {
    expect(sessionSelector(state)).toEqual(state.session);
  });
});
