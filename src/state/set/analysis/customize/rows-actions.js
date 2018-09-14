import deepCopy from '../../../../helpers/deep-copy';

import * as sortMethods from '../../visualization/rows-actions';

export const SORT_CUSTOMIZE_STATE = 'SORT_CUSTOMIZE_STATE';

export const updateRows = (
  columns,
  direction,
  list,
  sortBy,
  ref,
  id,
  order,
  removeEmpty,
  resetMaximums,
) => ({
  columns,
  direction,
  id,
  ref,
  removeEmpty,
  resetMaximums,
  rows: {
    list,
    order,
  },
  sortBy,
  type: SORT_CUSTOMIZE_STATE,
});

/* Sort the rows array based on a specific column as specified
** by requestedSortBy, and with reference to another column if ref is a number. */
export const sortRows = (requestedSortBy, requestedDirection, ref) => (
  (dispatch, getState) => {
    const { customize } = getState();
    /* "customize" is an array of states for the customize heatmap,
    ** so grab the values from the last used state. */
    const {
      columns,
      direction,
      id,
      removeEmpty,
      resetMaximums,
      rows,
      sortBy,
    } = customize[customize.length - 1];
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
    const sortedList = deepCopy(rows.list);
    sortedList.sort(sortMethods.sortMethod(requestedSortBy, sortDirection, ref));
    const rowOrder = sortedList.map(row => row.name);

    // Create or update ID.
    const newId = id + 1;
    dispatch(updateRows(
      columns.names,
      sortDirection,
      sortedList,
      requestedSortBy,
      ref,
      newId,
      rowOrder,
      removeEmpty,
      resetMaximums,
    ));
  }
);
