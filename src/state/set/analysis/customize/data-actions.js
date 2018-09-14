import * as tabActions from '../../visualization/tab-actions';
import deepCopy from '../../../../helpers/deep-copy';
import round from '../../../../helpers/round';

export const ADD_CUSTOMIZE_STATE = 'UPDATE_CUSTOMIZE_STATE';
export const REPLACE_CUSTOMIZE_STATE = 'REPLACE_CUSTOMIZE_STATE';
export const RESET_CUSTOMIZE_STATE = 'RESET_CUSTOMIZE_STATE';
export const SET_CUSTOMIZE_STATE = 'SET_CUSTOMIZE_STATE';
export const UNDO_CUSTOMIZE_STATE = 'UNDO_CUSTOMIZE_STATE';

export const addCustomizeState = (columns, rows, removeEmpty, resetMaximums) => ({
  columns,
  removeEmpty,
  resetMaximums,
  rows,
  type: ADD_CUSTOMIZE_STATE,
});

export const replaceCustomizeState = (columns, rows, removeEmpty, resetMaximums) => ({
  columns,
  removeEmpty,
  resetMaximums,
  rows,
  type: REPLACE_CUSTOMIZE_STATE,
});

export const resetCustomizeState = () => ({
  type: RESET_CUSTOMIZE_STATE,
});

export const setCustomizeState = (columns, rows, removeEmpty, resetMaximums) => ({
  columns,
  removeEmpty,
  resetMaximums,
  rows,
  type: SET_CUSTOMIZE_STATE,
});

export const undoCustomizeState = () => ({
  type: UNDO_CUSTOMIZE_STATE,
});

export const filterRows = (columns, rows, selectedColumns, selectedRows) => {
  const columnIndices = selectedColumns.map(gene => columns.indexOf(gene));
  return rows.list.reduce((accum, row) => {
    if (selectedRows.includes(row.name)) {
      return [
        ...accum,
        {
          data: row.data.filter((column, index) => columnIndices.includes(index)),
          name: row.name,
        },
      ];
    }
    return accum;
  }, []);
};

export const removeBlanks = (remove, columns, rows) => {
  if (!remove) {
    return {
      columns,
      rows,
    };
  }

  // Find all non empty rows and columns;
  const nonEmptyColumn = new Array(columns.length).fill(false);
  const nonEmptyRow = new Array(rows.list.length).fill(false);
  rows.list.forEach((row, rowIndex) => {
    row.data.forEach((column, colIndex) => {
      if (column.value) {
        nonEmptyColumn[colIndex] = true;
        nonEmptyRow[rowIndex] = true;
      }
    });
  });

  return {
    columns: columns.filter((column, colIndex) => nonEmptyColumn[colIndex]),
    didRemove: nonEmptyColumn.includes(false) || nonEmptyRow.includes(true),
    rows: {
      list: rows.list.reduce((accum, row, rowIndex) => {
        if (!nonEmptyRow[rowIndex]) {
          return accum;
        }
        return [
          ...accum,
          {
            data: row.data.filter((column, colIndex) => nonEmptyColumn[colIndex]),
            name: row.name,
          },
        ];
      }, []),
      order: rows.order.filter((row, rowIndex) => nonEmptyRow[rowIndex]),
    },
  };
};

export const recalculateRatios = (reset, rows) => {
  if (!reset) {
    return rows;
  }
  return rows.map((row) => {
    const max = row.data.reduce((accum, column) => Math.max(accum, column.ratio), 0);
    return {
      data: row.data.map(column => ({
        ...column,
        defaultRatio: column.ratio,
        ratio: round(column.ratio / max, 2),
      })),
      name: row.name,
    };
  });
};

export const restoreRatios = rows => (
  rows.map(row => ({
    data: row.data.map((column) => {
      const newColumn = { ...column };
      newColumn.ratio = newColumn.defaultRatio || newColumn.ratio;
      delete newColumn.defaultRatio;
      return newColumn;
    }),
    name: row.name,
  }))
);

/* Create initial state for customized image view. */
export const customizeImage = () => (
  (dispatch, getState) => {
    const {
      columns,
      genes,
      rows,
      vizanalysisform,
    } = getState();
    // Skip if selected genes are not present for rows and columns.
    if (
      genes.columnsSelected.length !== 0 &&
      genes.rowsSelected.length !== 0
    ) {
      dispatch(tabActions.addTab('customize'));

      // Subset global image based on selected row and column items.
      const { removeEmpty, resetMaximums } = vizanalysisform.customize;
      const customState = {
        columns: genes.columnsSelected,
        rows: {
          list: filterRows(columns.names, rows, genes.columnsSelected, genes.rowsSelected),
          order: genes.rowsSelected,
        },
        removeEmpty,
        resetMaximums,
      };

      // Remove empty rows or columns and reset circle ratios, if requested.
      const blanked = removeBlanks(removeEmpty, customState.columns, customState.rows);
      customState.columns = blanked.columns;
      customState.rows = blanked.rows;
      customState.rows.list = recalculateRatios(resetMaximums, customState.rows.list);

      dispatch(setCustomizeState(
        customState.columns,
        customState.rows,
        removeEmpty,
        resetMaximums,
      ));
    }
  }
);

/* Update a customized image if the display options have changed. If
** empty columns or rows are removed, an action will be called to add
** the image to the customized state array, otherwise it will just replace
** the current state. */
export const updateImage = (
  currentState,
  removeEmpty,
  resetMaximums,
) => (dispatch) => {
  if (
    currentState.removeEmpty !== removeEmpty ||
    currentState.resetMaximums !== resetMaximums
  ) {
    const newState = deepCopy(currentState);
    const blanked = removeBlanks(removeEmpty, newState.columns.names, newState.rows);
    newState.columns = blanked.columns;
    newState.rows = blanked.rows;
    newState.rows.list = resetMaximums ?
      recalculateRatios(resetMaximums, newState.rows.list)
      :
      restoreRatios(newState.rows.list);

    if (
      currentState.removeEmpty !== removeEmpty &&
      blanked.didRemove
    ) {
      dispatch(addCustomizeState(newState.columns, newState.rows, removeEmpty, resetMaximums));
    } else {
      dispatch(replaceCustomizeState(newState.columns, newState.rows, removeEmpty, resetMaximums));
    }
  }
};
