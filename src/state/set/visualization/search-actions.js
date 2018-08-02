import Round from '../../../helpers/round';

export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});

export const setSearchResults = (term, columns, rows, match, position) => ({
  columns,
  match,
  position,
  rows,
  term,
  type: SET_SEARCH_RESULTS,
});

export const setSearchTerm = term => ({
  term,
  type: SET_SEARCH_TERM,
});

/* Converts an array to an object whose keys contain a query term, and returns
** the first match. */
export const queryArray = (arr, query) => {
  // Convert to lowercase.
  const lcQuery = query.toLowerCase();
  const lcArray = arr.map(item => item.toLowerCase());

  // First match.
  const first = lcArray.findIndex(str => str.indexOf(lcQuery) >= 0);

  /* All matches mapped to object. For value, use array element's
  ** relative position. */
  const arrLen = lcArray.length;
  const matchedObject = lcArray.reduce((matches, str, index) => {
    if (str.indexOf(lcQuery) > -1) {
      const newMatch = {};
      newMatch[arr[index]] = Round((index + 0.5) / arrLen, 2);
      return {
        ...matches,
        ...newMatch,
      };
    }
    return matches;
  }, {});
  return {
    first: first >= 0 ? first : null,
    matches: matchedObject,
  };
};

/* Get the new position corresponding to the first search matches, but limit
** by page size, i.e. if a new position is too close to the image boundaries,
** set the position to the accepted limits. */
export const newPosition = (firstCellX, firstCellY, dimensions, position) => {
  let newX;
  if (typeof firstCellX === 'number') {
    // Ensure position is within page limits.
    const limitX = dimensions.columns - dimensions.pageX;
    newX = firstCellX <= limitX ? firstCellX : limitX;
  } else {
    newX = position.x;
  }

  let newY;
  if (typeof firstCellY === 'number') {
    // Ensure position is within page limits.
    const limitY = dimensions.rows - dimensions.pageY;
    newY = firstCellY <= limitY ? firstCellY : limitY;
  } else {
    newY = position.y;
  }

  return {
    x: newX,
    y: newY,
  };
};

/* Is there a matching search result in either object. */
export const searchMatch = (obj1, obj2) => (
  Object.keys(obj1).length > 0 || Object.keys(obj2).length > 0
);

/* Search columns and rows for matches to the search term. */
export const searchGenes = () => (
  (dispatch, getState) => {
    const {
      columns,
      dimensions,
      position,
      rows,
      search,
    } = getState();
    const { term } = search;
    if (term) {
      const { names } = columns;
      const { list } = rows;
      const rowNames = list.map(item => item.name);

      // Check rows and columns for matches.
      const columnResults = queryArray(names, term);
      const rowResults = queryArray(rowNames, term);

      // Is there a match?
      dispatch(
        setSearchResults(
          term,
          columnResults.matches,
          rowResults.matches,
          searchMatch(columnResults.matches, rowResults.matches),
          newPosition(columnResults.first, rowResults.first, dimensions, position),
        ),
      );
    }
  }
);
