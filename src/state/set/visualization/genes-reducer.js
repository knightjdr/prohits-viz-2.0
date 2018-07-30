import * as fileActions from '../interactive-file-actions';

import {
  SET_SELECTIONS,
  STORE_SELECTIONS,
} from './genes-actions';

const Genes = (state = {
  columnMap: {},
  columns: [],
  columnsSelected: [],
  rowMap: {},
  rows: [],
  rowsSelected: [],
}, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return {
        columnMap: {},
        columns: [],
        columnsSelected: [],
        rowMap: {},
        rows: [],
        rowsSelected: [],
      };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return {
        columnMap: { ...action.file.genes.columnMap },
        columns: [...action.file.genes.columns],
        columnsSelected: [...action.file.genes.columnsSelected],
        rowMap: { ...action.file.genes.rowMap },
        rows: [...action.file.genes.rows],
        rowsSelected: [...action.file.genes.rowsSelected],
      };
    case SET_SELECTIONS:
      return {
        ...state,
        columns: action.columns,
        rows: action.rows,
      };
    case STORE_SELECTIONS:
      return {
        ...state,
        columns: [...action.selections.columns],
        columnsSelected: [...action.selections.columnsSelected],
        rows: [...action.selections.rows],
        rowsSelected: [...action.selections.rowsSelected],
      };
    default:
      return state;
  }
};
export default Genes;
