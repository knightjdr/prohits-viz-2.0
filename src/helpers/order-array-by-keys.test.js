import orderArrayByKeys from './order-array-by-keys';

describe('Order array by keys', () => {
  it('should return array in order of key value', () => {
    const arr = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
    const sortOrder = ['b', 'c', 'a'];
    const expectedOrder = [{ name: 'b' }, { name: 'c' }, { name: 'a' }];
    expect(orderArrayByKeys(arr, 'name', sortOrder)).toEqual(expectedOrder);
  });
});
