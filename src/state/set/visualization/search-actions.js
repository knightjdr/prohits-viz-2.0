import Round from '../../../helpers/round';

export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});

export const setSearchResults = (term, main, customize) => ({
  columns: main.columns,
  columnsCustomize: customize.columns,
  match: main.match,
  matchCustomize: customize.match,
  position: main.position,
  positionCustomize: customize.position,
  rows: main.rows,
  rowsCustomize: customize.rows,
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

export const formatSearch = (term, columns, rows, dimensions, position) => {
  const searchedColumns = queryArray(columns.names, term);
  const searchedRows = queryArray(rows.list.map(item => item.name), term);
  const match = searchMatch(searchedColumns.matches, searchedRows.matches);
  const updatedPosition = newPosition(searchedRows.first, searchedRows.first, dimensions, position);
  return {
    columns: searchedColumns.matches,
    match,
    position: updatedPosition,
    rows: searchedRows.matches,
  };
};

/* Search columns and rows for matches to the search term. */
export const searchGenes = () => (
  (dispatch, getState) => {
    const {
      columns,
      customize,
      dimensions,
      dimensionsCustomize,
      position,
      positionCustomize,
      rows,
      search,
      tabs,
    } = getState();
    const { term } = search;
    if (term) {
      const mainImage = formatSearch(term, columns, rows, dimensions, position);

      // Check customize image.
      let customizeImage = {
        columns: {},
        match: false,
        position: positionCustomize,
        rows: {},
      };
      if (
        tabs.available.includes('customize')
        && customize.length > 0
      ) {
        const lastImage = customize[customize.length - 1];
        customizeImage = formatSearch(
          term,
          lastImage.columns,
          lastImage.rows,
          dimensionsCustomize,
          positionCustomize,
        );
      }
      dispatch(setSearchResults(term, mainImage, customizeImage));
    }
  }
);
