import arrayContains from '../../../helpers/array-contains';
import { arrayShallowEqual } from '../../../helpers/array-shallow-equal';

export const mapList = list => (
  list.reduce(((obj, gene, index) => {
    const newGene = {};
    newGene[gene] = index;
    return { ...obj, ...newGene };
  }), {})
);

const fillGenes = (userColumns, userGenes = {}, userRows) => {
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
  if (Array.isArray(columns)) {
    genes.columns = columns;
    if (
      columnMap &&
      typeof columnMap === 'object' &&
      arrayShallowEqual(Object.keys(columnMap), columns)
    ) {
      genes.columnMap = columnMap;
    } else {
      genes.columnMap = mapList(columns);
    }
    if (
      columnsSelected &&
      Array.isArray(columnsSelected) &&
      arrayContains(columns, columnsSelected)
    ) {
      genes.columnsSelected = columnsSelected;
    } else {
      genes.columnsSelected = [];
    }
  } else {
    genes.columnMap = mapList(userColumns.names);
    genes.columns = userColumns.names;
    genes.columnsSelected = [];
  }

  // Ensure rows are consistent.
  if (Array.isArray(rows)) {
    genes.rows = rows;
    if (
      rowMap &&
      typeof rowMap === 'object' &&
      arrayShallowEqual(Object.keys(rowMap), rows)
    ) {
      genes.rowMap = rowMap;
    } else {
      genes.rowMap = mapList(rows);
    }
    if (
      rowsSelected &&
      Array.isArray(rowsSelected) &&
      arrayContains(rows, rowsSelected)
    ) {
      genes.rowsSelected = rowsSelected;
    } else {
      genes.rowsSelected = [];
    }
  } else {
    const rowArr = userRows.list.map(row => row.name);
    genes.rowMap = mapList(rowArr);
    genes.rows = rowArr;
    genes.rowsSelected = [];
  }
  return genes;
};

export default fillGenes;
