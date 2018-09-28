import fillPosition from './fill__position';
import { defaultState } from '../../state/set/visualization/position-reducer';

describe('Fill position', () => {
  it('should return default when nothing passed to function', () => {
    expect(fillPosition()).toEqual(defaultState);
  });

  it('should return user input when valid', () => {
    const user = {
      x: 0.5,
      y: 0.5,
    };
    expect(fillPosition(user)).toEqual(user);
  });

  it('should return default when x is outside bounds', () => {
    const user = {
      x: 1.5,
      y: 0.5,
    };
    expect(fillPosition(user)).toEqual(defaultState);
  });

  it('should return default when y is outside bounds', () => {
    const user = {
      x: 0.5,
      y: 1.5,
    };
    expect(fillPosition(user)).toEqual(defaultState);
  });
});
