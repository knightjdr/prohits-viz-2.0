import fillAnnotations from './fill__annotations';
import { defaultState } from '../../state/set/visualization/annotation-reducer';

describe('Fill annotations', () => {
  it('should return user values when valid', () => {
    const user = {
      color: '#888',
      fontSize: 20,
      list: [],
      show: false,
    };
    expect(fillAnnotations(user)).toEqual(user);
  });

  it('should return default values when inputs are invalid', () => {
    const user = {
      color: 'rgb(0, 0, 0)',
      fontSize: 'a',
      list: {},
      show: 'a',
    };
    expect(fillAnnotations(user)).toEqual(defaultState);
  });

  it('should return default values when nothing passed to function', () => {
    expect(fillAnnotations()).toEqual(defaultState);
  });
});
