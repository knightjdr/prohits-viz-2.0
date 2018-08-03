import FindClosest from './find-closest';

describe('Find closest item in an array based on a lookup', () => {
  it('should find the specific item', () => {
    const completeList = ['a', 'b', 'c', 'd'];
    const partialList = ['a', 'b', 'd'];
    expect(FindClosest(completeList, 0, completeList.length, partialList)).toBe(0);
  });

  it('should find the next closest item when specified item is not present', () => {
    const completeList = ['a', 'b', 'c', 'd', 'e'];
    const partialList = ['a', 'd', 'e'];
    expect(FindClosest(completeList, 2, completeList.length, partialList)).toBe(1);
  });

  it(`should return the last item when specified item is not present and end of
  complete has been reached`, () => {
    const completeList = ['a', 'b', 'c', 'd', 'e'];
    const partialList = ['a'];
    expect(FindClosest(completeList, 2, completeList.length, partialList)).toBe(0);
  });
});
