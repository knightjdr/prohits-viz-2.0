import fillSearch from './fill__search';
import { defaultState } from '../../state/set/visualization/search-reducer';

describe('Fill search', () => {
  it('should return default when nothing passed to function', () => {
    expect(fillSearch()).toEqual(defaultState);
  });

  it('should return user input when valid', () => {
    const user = {
      columns: { a: 1 },
      match: true,
      rows: { a: 1, aa: 2 },
      searched: true,
      term: 'a',
    };
    expect(fillSearch(user)).toEqual(user);
  });

  it('should return default when input invalid', () => {
    const user = {
      columns: ['a'],
      match: 'true',
      rows: ['a', 'aa'],
      searched: 'true',
      term: 1,
    };
    expect(fillSearch(user)).toEqual(defaultState);
  });
});
