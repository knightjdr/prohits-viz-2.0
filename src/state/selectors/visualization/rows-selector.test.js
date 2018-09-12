import rowSelector from './rows-selector';

describe('Rows selector', () => {
  it('should return a list with row data', () => {
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
    const expectedValue = [
      { data: {}, name: 'a' },
      { data: {}, name: 'b' },
      { data: {}, name: 'c' },
    ];
    expect(rowSelector(currentState)).toEqual(expectedValue);
  });
});
