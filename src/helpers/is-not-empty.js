// determines if a value is null, undefined, etc, or it is an empty array of object
const IsNotEmpty = (value) => {
  if (
    Array.isArray(value) &&
    value.length > 0
  ) {
    return true;
  } else if (
    typeof value === 'object' &&
    Object.keys(value).length > 0
  ) {
    return true;
  } else if (
    !Array.isArray(value) &&
    typeof value !== 'object' &&
    value
  ) {
    return true;
  }
  return false;
};
export default IsNotEmpty;
