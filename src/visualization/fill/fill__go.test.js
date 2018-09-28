import fillGo from './fill__go';
import { defaultState } from '../../state/set/analysis/go-reducer';

describe('Fill GO', () => {
  it('should return default when nothing passed to function', () => {
    expect(fillGo()).toEqual(defaultState);
  });

  it('should return user input when valid', () => {
    const user = {
      annotation: 'test',
    };
    expect(fillGo(user)).toEqual(user);
  });

  it('should return default when annotation is not a string', () => {
    const user = {
      annotation: 1,
    };
    expect(fillGo(user)).toEqual(defaultState);
  });
});
