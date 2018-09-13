import Deepcopy from '../../../../helpers/deep-copy';

import * as dataActions from './data-actions';
import * as sortMethods from '../../visualization/rows-actions';

export const updateRows = (
  columns,
  direction,
  list,
  sortBy,
  id,
  order,
  removeEmpty,
  resetMaximums,
) => ({
  columns: columns.names,
  direction,
  id,
  ref: columns.ref,
  removeEmpty,
  resetMaximums,
  rows: {
    list,
    order,
  },
  sortBy,
  type: dataActions.ADD_CUSTOMIZE_STATE,
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
    const sortedList = Deepcopy(rows.list);
    sortedList.sort(sortMethods.sortMethod(requestedSortBy, sortDirection, ref));
    const rowOrder = sortedList.map(row => row.name);

    // Create or update ID.
    const newId = id ? id + 1 : 1;
    dispatch(updateRows(
      columns,
      sortDirection,
      sortedList,
      requestedSortBy,
      newId,
      rowOrder,
      removeEmpty,
      resetMaximums,
    ));
  }
);
