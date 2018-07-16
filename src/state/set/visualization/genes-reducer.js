import {
  SET_SELECTIONS,
  STORE_SELECTIONS,
} from './genes-actions';

const DefaultState = {
  columnMap: { 'gene-a': 0, 'gene-b': 1, 'gene-c': 2 },
  columns: ['gene-a', 'gene-b', 'gene-c'],
  columnsSelected: [],
  rowMap: { 'gene-d': 0, 'gene-e': 1, 'gene-f': 2 },
  rows: ['gene-d', 'gene-e', 'gene-f'],
  rowsSelected: [],
};

/* Map list names to object with index */
export const MapList = list => (
  list.reduce(((obj, gene, index) => {
    const newGene = {};
    newGene[gene] = index;
    return { ...obj, ...newGene };
  }), {})
);

const Genes = (state = DefaultState, action) => {
  switch (action.type) {
    case SET_SELECTIONS:
      return {
        ...state,
        columnMap: MapList(action.columns),
        columns: action.columns,
        rowMap: MapList(action.rows),
        rows: action.rows,
      };
    case STORE_SELECTIONS:
      return {
        ...state,
        columns: action.selections.columns,
        columnsSelected: action.selections.columnsSelected,
        rows: action.selections.rows,
        rowsSelected: action.selections.rowsSelected,
      };
    default:
      return state;
  }
};
export default Genes;
