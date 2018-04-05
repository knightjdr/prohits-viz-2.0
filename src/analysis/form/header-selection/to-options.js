import SortArrayString from '../../../helpers/sort-array-strings';

/* Merges to arrays into an array of two options object with children.
** The return value is intended to be passed to a Select component. */

const ToOptions = (suggested, other) => {
  // convert suggested and other options to objects and wrap in object group
  const options = [];
  if (suggested.length > 0) {
    const group = {
      group: true,
      text: 'Suggested',
      children: suggested.map(option => ({ text: option, value: option })),
    };
    options.push(group);
  }
  // sort descending ignoring case
  SortArrayString(other);
  if (other.length > 0) {
    const group = {
      group: true,
      text: 'Other',
      children: other.map(option => ({ text: option, value: option })),
    };
    options.push(group);
  }
  return options;
};
export default ToOptions;
