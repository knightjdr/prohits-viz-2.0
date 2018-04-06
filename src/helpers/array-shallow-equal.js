// checks if two arrays have the same elements, regardless of order
const ArrayShallowEqual = (arr1, arr2) => {
  const len = arr1.length;
  if (arr2.length !== len) {
    return false;
  }
  for (let i = 0; i < len; i += 1) {
    if (!arr2.includes(arr1[i])) {
      return false;
    }
  }
  return true;
};
export default ArrayShallowEqual;
