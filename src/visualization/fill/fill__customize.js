/* Validate first element in customize array (if it exists). Assume others
** following same form/ */
const fillCustomize = (userCustomize) => {
  let customize;

  if (
    Array.isArray(userCustomize) &&
    userCustomize.length > 0 &&
    Object.prototype.toString.call(userCustomize[0]) === '[object Object]' &&
    Object.prototype.toString.call(userCustomize[0].columns) === '[object Object]' &&
    typeof userCustomize[0].id === 'number' &&
    typeof userCustomize[0].removeEmpty === 'boolean' &&
    typeof userCustomize[0].resetMaximums === 'boolean' &&
    Object.prototype.toString.call(userCustomize[0].rows) === '[object Object]'
  ) {
    customize = userCustomize;
  } else {
    customize = [];
  }

  return customize;
};

export default fillCustomize;
