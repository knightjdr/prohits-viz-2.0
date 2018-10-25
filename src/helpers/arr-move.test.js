import arrMove from './arr-move';

const arr = ['a', 'b', 'c', 'd'];

describe('Move array elements', () => {
  it('should move item forward to drop position', () => {
    const expectedArr = ['b', 'c', 'a', 'd'];
    const newArr = arrMove(0, 2, arr);
    expect(newArr).toEqual(expectedArr);
  });

  it('should move item back to drop position', () => {
    const expectedArr = ['c', 'a', 'b', 'd'];
    const newArr = arrMove(2, 0, arr);
    expect(newArr).toEqual(expectedArr);
  });

  it('should not move array item', () => {
    const expectedArr = arr;
    const newArr = arrMove(1, 1, arr);
    expect(newArr).toEqual(expectedArr);
  });
});
