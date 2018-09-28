import fillRows from './fill__rows';
import { defaultState } from '../../state/set/visualization/rows-reducer';

describe('Fill rows', () => {
  it('should return default when nothing passed to function', () => {
    expect(fillRows()).toEqual(defaultState);
  });

  it('should return user input when valid', () => {
    const user = {
      direction: 'asc',
      id: 1,
      list: [{ name: 'a' }, { name: 'b' }, { name: 'c' }],
      order: ['a', 'b', 'c'],
      sortBy: 1,
    };
    expect(fillRows(user)).toEqual(user);
  });

  it('should return default when direction invalid', () => {
    const user = {
      direction: 'other',
      id: 1,
      list: [{ name: 'a' }, { name: 'b' }, { name: 'c' }],
      order: ['a', 'b', 'c'],
      sortBy: 1,
    };
    const expected = {
      ...user,
      direction: null,
    };
    expect(fillRows(user)).toEqual(expected);
  });

  it('should return default when id invalid', () => {
    const user = {
      direction: 'asc',
      id: 'a',
      list: [{ name: 'a' }, { name: 'b' }, { name: 'c' }],
      order: ['a', 'b', 'c'],
      sortBy: 1,
    };
    const expected = {
      ...user,
      id: null,
    };
    expect(fillRows(user)).toEqual(expected);
  });

  it('should return defaults when list invalid', () => {
    const user = {
      direction: 'asc',
      id: 1,
      list: {},
      order: ['a', 'b', 'c'],
      sortBy: 1,
    };
    const expected = {
      ...user,
      list: [],
      order: [],
      sortBy: null,
    };
    expect(fillRows(user)).toEqual(expected);
  });

  it('should map order from list when order is not an array', () => {
    const user = {
      direction: 'asc',
      id: 1,
      list: [{ name: 'a' }, { name: 'b' }, { name: 'c' }],
      order: {},
      sortBy: 1,
    };
    const expected = {
      ...user,
      order: ['a', 'b', 'c'],
    };
    expect(fillRows(user)).toEqual(expected);
  });

  it('should map order from list when order contains values not in list', () => {
    const user = {
      direction: 'asc',
      id: 1,
      list: [{ name: 'a' }, { name: 'b' }, { name: 'c' }],
      order: ['a', 'b', 'd'],
      sortBy: 1,
    };
    const expected = {
      ...user,
      order: ['a', 'b', 'c'],
    };
    expect(fillRows(user)).toEqual(expected);
  });

  it('should return default when sortby value is not within list length', () => {
    const user = {
      direction: 'asc',
      id: 1,
      list: [{ name: 'a' }, { name: 'b' }, { name: 'c' }],
      order: ['a', 'b', 'c'],
      sortBy: 3,
    };
    const expected = {
      ...user,
      sortBy: null,
    };
    expect(fillRows(user)).toEqual(expected);
  });
});
