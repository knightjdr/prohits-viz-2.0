import fillMarkers from './fill__markers';
import { defaultState } from '../../state/set/visualization/marker-reducer';

describe('Fill markers', () => {
  it('should return default when nothing passed to function', () => {
    expect(fillMarkers()).toEqual(defaultState);
  });

  it('should return user input when valid', () => {
    const user = {
      color: '#888',
      list: [],
      show: true,
      record: true,
    };
    expect(fillMarkers(user)).toEqual(user);
  });

  it('should return default when inputs invalid', () => {
    const user = {
      color: 'rgb(0, 0, 0)',
      list: {},
      show: 'a',
      record: 'a',
    };
    expect(fillMarkers(user)).toEqual(defaultState);
  });
});
