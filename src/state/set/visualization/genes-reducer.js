import deepCopy from '../../../helpers/deep-copy';
import * as actions from './genes-actions';
import * as fileActions from '../interactive-file-actions';
import * as rowActions from './rows-actions';

export const defaultState = {
  columnMap: {},
  columns: [],
  columnsSelected: [],
  rowMap: {},
  rows: [],
  rowsSelected: [],
};

const Genes = (state = defaultState, action) => {
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
    case rowActions.RESTORE_ROWS:
      return {
        ...state,
        rowMap: { ...action.rows.mapped },
        rows: [...action.rows.list],
      };
    case rowActions.UPDATE_ROWS:
      return {
        ...state,
        rowMap: { ...action.rows.mapped },
        rows: [...action.rows.list],
      };
    case actions.UPDATE_SELECTIONS:
      return {
        ...state,
        ...deepCopy(action.selections),
      };
    default:
      return state;
  }
};
export default Genes;
