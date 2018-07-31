import Deepcopy from '../../../helpers/deep-copy';

export const RESTORE_ROWS = 'RESTORE_ROWS';
export const UPDATE_ROWS = 'UPDATE_ROWS';

export const restoreRows = (direction, list, sortBy, id) => ({
  direction,
  id,
  list,
  sortBy,
  type: RESTORE_ROWS,
});

export const updateRows = (direction, list, sortBy, id) => ({
  direction,
  id,
  list,
  sortBy,
  type: UPDATE_ROWS,
});

/* Sorts rows based on the default (input) order */
export const sortDefault = () => (
  (dispatch, getState) => {
    const { id, list, order } = getState().rows;
    const currentMap = list.reduce((listMap, item, index) => {
      const newProp = {};
      newProp[item.name] = index;
      return {
        ...listMap,
        ...newProp,
      };
    }, {});
    const sortedList = order.map(item => list[currentMap[item]]);

    // Create or update ID.
    const newId = id ? id + 1 : 1;
    dispatch(restoreRows(null, sortedList, null, newId));
  }
);

// If the difference between two pairs is zero, sort by string,
export const sortPairByLocale = (value, a, b) => (
  value !== 0 ? value : a.localeCompare(b, 'en', { sensitivity: 'base' })
);

/* Sort methods for row list. Assumes each row item has a data object with
** a numeric value prop and a name prop for fallback sorting when the
** value is the same. */
export const sortMethod = (sortBy, direction, ref) => {
  if (direction === 'asc' && typeof ref === 'number') {
    return (a, b) => {
      // Set reference to a small value to avoid division by zero.
      const refA = a.data[ref].value === 0 ? 0.001 : a.data[ref].value;
      const refB = b.data[ref].value === 0 ? 0.001 : b.data[ref].value;
      const sortValue = (a.data[sortBy].value / refA) - (b.data[sortBy].value / refB);
      return sortPairByLocale(sortValue, a.name, b.name);
    };
  } else if (direction === 'asc') {
    return (a, b) => {
      const sortValue = a.data[sortBy].value - b.data[sortBy].value;
      return sortPairByLocale(sortValue, a.name, b.name);
    };
  } else if (direction === 'desc' && typeof ref === 'number') {
    return (a, b) => {
      // Set reference to a small value to avoid division by zero.
      const refA = a.data[ref].value === 0 ? 0.001 : a.data[ref].value;
      const refB = b.data[ref].value === 0 ? 0.001 : b.data[ref].value;
      const sortValue = (b.data[sortBy].value / refB) - (a.data[sortBy].value / refA);
      return sortPairByLocale(sortValue, b.name, a.name);
    };
  }
  return (a, b) => {
    const sortValue = b.data[sortBy].value - a.data[sortBy].value;
    return sortPairByLocale(sortValue, b.name, a.name);
  };
};

/* Sort the rows array based on a specific column as specified
** by requestedSortBy, and with reference to another column if ref is a number. */
export const sortRows = (requestedSortBy, requestedDirection, ref) => (
  (dispatch, getState) => {
    const {
      direction,
      id,
      list,
      sortBy,
    } = getState().rows;
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

    // Create or update ID.
    const newId = id ? id + 1 : 1;
    dispatch(updateRows(sortDirection, sortedList, requestedSortBy, newId));
  }
);
