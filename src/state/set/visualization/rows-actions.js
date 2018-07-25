import Deepcopy from '../../../helpers/deep-copy';

export const UPDATE_ROWS = 'UPDATE_ROWS';

export const updateRows = (direction, list, sortBy) => ({
  direction,
  list,
  sortBy,
  type: UPDATE_ROWS,
});

/* Sort methods for row list. Assumes each row
** item has a data object with a numeric value prop. */
export const sortMethod = (sortBy, direction, ref) => {
  if (direction === 'asc' && typeof ref === 'number') {
    return (a, b) => {
      if (a.data[ref].value === 0 && b.data[ref].value === 0) {
        return 0;
      } else if (a.data[ref].value === 0) {
        return 1;
      } else if (b.data[ref].value === 0) {
        return -1;
      }
      return (a.data[sortBy].value / a.data[ref].value) -
      (b.data[sortBy].value / b.data[ref].value);
    };
  } else if (direction === 'asc') {
    return (a, b) => a.data[sortBy].value - b.data[sortBy].value;
  } else if (direction === 'desc' && typeof ref === 'number') {
    return (a, b) => {
      if (a.data[ref].value === 0 && b.data[ref].value === 0) {
        return 0;
      } else if (b.data[ref].value === 0) {
        return 1;
      } else if (a.data[ref].value === 0) {
        return -1;
      }
      return (b.data[sortBy].value / b.data[ref].value) -
      (a.data[sortBy].value / a.data[ref].value);
    };
  }
  return (a, b) => b.data[sortBy].value - a.data[sortBy].value;
};

/* Sort the rows array based on a specific column as specified
** by requestedSortBy, and with reference to another column if ref is a number. */
export const sortRows = (requestedSortBy, requestedDirection, ref) => (
  (dispatch, getState) => {
    const { direction, list, sortBy } = getState().rows;
    let sortDirection;
    if (requestedDirection) {
      // If a sort direction is requested, use that.
      sortDirection = requestedDirection;
    } else if (
      sortBy === requestedSortBy &&
      direction
    ) {
      /* If a sort direction is not requested, but the requested
      ** sort index is the same as the last, swap sort direction */
      sortDirection = direction === 'desc' ? 'asc' : 'desc';
    } else {
      // Otherwise, sort descending.
      sortDirection = 'desc';
    }
    const sortedList = Deepcopy(list);
    sortedList.sort(sortMethod(requestedSortBy, sortDirection, ref));
    dispatch(updateRows(sortDirection, sortedList, requestedSortBy));
  }
);
