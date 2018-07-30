import RowNameSelector from './row-name-selector';

describe('Row name selector', () => {
  it('should return an array of row names', () => {
    const currentState = {
      rows: {
        direction: null,
        list: [
          { data: {}, name: 'a' },
          { data: {}, name: 'b' },
          { data: {}, name: 'c' },
        ],
        sortBy: null,
      },
    };
    const expectedValue = ['a', 'b', 'c'];
    expect(RowNameSelector(currentState)).toEqual(expectedValue);
  });
});
