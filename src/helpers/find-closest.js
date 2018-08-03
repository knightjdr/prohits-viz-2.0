/* FindClosest takes an array of names (complete) and a starting position
** and attempts to find the array item at that position in the lookup array.
** If it can't find the item specified by starting position, it will grab the
** next item and look for it. This process repeats until the end of the complete
** array has been search. If no subsequent item can be found, the last position
** in the lookup is returned. */
const FindClosest = (complete, startPosition, max, lookup) => {
  const recursive = (position) => {
    if (position >= max) {
      return lookup.length - 1;
    }
    const name = complete[position];
    if (lookup.includes(name)) {
      return lookup.indexOf(name);
    }
    return recursive(position + 1);
  };
  return recursive(startPosition);
};
export default FindClosest;
