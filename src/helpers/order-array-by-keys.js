import deepCopy from './deep-copy';

/* This takes an array or objects an another, a key to use for ordering
** and another array with the key order and reorders the array */
const orderArrayByKeys = (arr, key, sortOrder) => {
  const newArr = deepCopy(arr);
  newArr.sort((a, b) => {
    const aValue = sortOrder.indexOf(a[key]);
    const bValue = sortOrder.indexOf(b[key]);
    return aValue - bValue;
  });
  return newArr;
};

export default orderArrayByKeys;
