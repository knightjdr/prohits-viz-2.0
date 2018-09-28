import fillCustomize from './fill__customize';

describe('Fill customize', () => {
  it('should return user input when valid', () => {
    const user = [
      {
        columns: {},
        id: 1,
        removeEmpty: true,
        resetMaximums: true,
        rows: {},
      },
    ];
    expect(fillCustomize(user)).toEqual(user);
  });

  it('should return empty array when user input is not an array', () => {
    const user = {};
    expect(fillCustomize(user)).toEqual([]);
  });

  it('should return empty array when user input array is empty', () => {
    const user = [];
    expect(fillCustomize(user)).toEqual([]);
  });

  it('should return empty array when user input array does not contain objects', () => {
    const user = ['a'];
    expect(fillCustomize(user)).toEqual([]);
  });

  it('should return empty array when column value is not an object', () => {
    const user = [
      {
        columns: [],
        id: 1,
        removeEmpty: true,
        resetMaximums: true,
        rows: {},
      },
    ];
    expect(fillCustomize(user)).toEqual([]);
  });

  it('should return empty array when id is not a number', () => {
    const user = [
      {
        columns: {},
        id: 'a',
        removeEmpty: true,
        resetMaximums: true,
        rows: {},
      },
    ];
    expect(fillCustomize(user)).toEqual([]);
  });

  it('should return empty array when removeEmpty is not a boolean', () => {
    const user = [
      {
        columns: {},
        id: 1,
        removeEmpty: 'true',
        resetMaximums: true,
        rows: {},
      },
    ];
    expect(fillCustomize(user)).toEqual([]);
  });

  it('should return empty array when resetMaximums is not a boolean', () => {
    const user = [
      {
        columns: {},
        id: 1,
        removeEmpty: true,
        resetMaximums: 'true',
        rows: {},
      },
    ];
    expect(fillCustomize(user)).toEqual([]);
  });

  it('should return empty array when row value is not an object', () => {
    const user = [
      {
        columns: {},
        id: 1,
        removeEmpty: true,
        resetMaximums: true,
        rows: [],
      },
    ];
    expect(fillCustomize(user)).toEqual([]);
  });
});
