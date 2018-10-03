import arrUnique from './arr-unique';

describe('Array unique', () => {
  it('should return an empty array', () => {
    expect(arrUnique([])).toEqual([]);
  });

  it('should return an unmodified array when all items are unique', () => {
    const arr = ['a', 'b', 'c'];
    expect(arrUnique(arr)).toEqual(arr);
  });

  it('should return an array with only unqiue items', () => {
    const arr = ['a', 'b', 'c', 'c', 'b', 'c'];
    const expected = ['a', 'b', 'c'];
    expect(arrUnique(arr)).toEqual(expected);
  });
});
