import fillPanel from './fill__panel';
import { defaultState } from '../../state/set/visualization/panel-reducer';

describe('Fill panel', () => {
  it('should return user input when valid', () => {
    expect(fillPanel(true)).toEqual(true);
  });

  it('should return default when input invalid', () => {
    expect(fillPanel('true')).toEqual(defaultState);
  });
});
