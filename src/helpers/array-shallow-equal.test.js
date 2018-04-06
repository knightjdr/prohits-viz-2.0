import ArrayShallowEqual from './array-shallow-equal';

const arr1 = ['a', 'b', 'c'];
const arr2 = ['a', 'c', 'b'];
const arr3 = ['a', 'b', 'c', 'd'];
const arr4 = ['a', 'c', 'd'];

describe('ArrayShallowEqual', () => {
  test('Identical array are equal', () => {
    expect(ArrayShallowEqual(arr1, arr1)).toBeTruthy();
  });

  test('Arrays with the same entries in different orders are equal', () => {
    expect(ArrayShallowEqual(arr1, arr2)).toBeTruthy();
  });

  test('Arrays with different lengths are not equal', () => {
    expect(ArrayShallowEqual(arr1, arr3)).toBeFalsy();
  });

  test('Arrays the same length with different values are not equal', () => {
    expect(ArrayShallowEqual(arr1, arr4)).toBeFalsy();
  });
});
