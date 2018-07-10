import DefaultState from '../../../visualization/test/params';
import ParamsReducer from './params-reducer';

describe('ParamsReducer set reducer', () => {
  it('should return an empty initial state', () => {
    expect(ParamsReducer(undefined, {})).toEqual(DefaultState);
  });
});
