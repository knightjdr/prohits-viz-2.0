import ArrayContains from '../../../helpers/array-contains';
import ArrayEqual from '../../../helpers/array-shallow-equal';

export const MapList = list => (
  list.reduce(((obj, gene, index) => {
    const newGene = {};
    newGene[gene] = index;
    return { ...obj, ...newGene };
  }), {})
);

const Genes = (userColumns, userGenes = {}, userRows) => {
  const genes = {};

  const {
    columnMap,
    columns,
    columnsSelected,
    rowMap,
    rows,
    rowsSelected,
  } = userGenes;

  // Ensure columns are consistent.
  if (columns && Array.isArray(columns)) {
    genes.columns = columns;
    if (
      columnMap &&
      typeof columnMap === 'object' &&
      ArrayEqual(Object.keys(columnMap), columns)
    ) {
      genes.columnMap = columnMap;
    } else {
      genes.columnMap = MapList(columns);
    }
    if (
      columnsSelected &&
      Array.isArray(columnsSelected) &&
      ArrayContains(columns, columnsSelected)
    ) {
      genes.columnsSelected = columnsSelected;
    } else {
      genes.columnsSelected = [];
    }
  } else {
    genes.columnMap = MapList(userColumns.names);
    genes.columns = userColumns.names;
    genes.columnsSelected = [];
  }

  // Ensure rows are consistent.
  if (rows && Array.isArray(rows)) {
    genes.rows = rows;
    if (
      rowMap &&
      typeof rowMap === 'object' &&
      ArrayEqual(Object.keys(rowMap), rows)
    ) {
      genes.rowMap = rowMap;
    } else {
      genes.rowMap = MapList(rows);
    }
    if (
      rowsSelected &&
      Array.isArray(rowsSelected) &&
      ArrayContains(rows, rowsSelected)
    ) {
      genes.rowsSelected = rowsSelected;
    } else {
      genes.rowsSelected = [];
    }
  } else {
    const rowArr = userRows.list.map(row => row.name);
    genes.rowMap = MapList(rowArr);
    genes.rows = rowArr;
    genes.rowsSelected = [];
  }
  return genes;
};

export default Genes;
