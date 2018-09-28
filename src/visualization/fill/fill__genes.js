import arrayContains from '../../helpers/array-contains';
import mapArr from '../../helpers/map-array';
import { arrayShallowEqual } from '../../helpers/array-shallow-equal';

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

  // Ensure gene column elements are consistent with columns.
  if (Array.isArray(columns)) {
    genes.columns = columns;
    if (
      typeof columnMap === 'object' &&
      arrayShallowEqual(Object.keys(columnMap), columns)
    ) {
      genes.columnMap = columnMap;
    } else {
      genes.columnMap = mapArr(columns);
    }
    if (
      Array.isArray(columnsSelected) &&
      arrayContains(columns, columnsSelected)
    ) {
      genes.columnsSelected = columnsSelected;
    } else {
      genes.columnsSelected = [];
    }
  } else {
    genes.columnMap = mapArr(userColumns.names);
    genes.columns = userColumns.names;
    genes.columnsSelected = [];
  }

  // Ensure gene row elements are consistent with rows.
  if (Array.isArray(rows)) {
    genes.rows = rows;
    if (
      typeof rowMap === 'object' &&
      arrayShallowEqual(Object.keys(rowMap), rows)
    ) {
      genes.rowMap = rowMap;
    } else {
      genes.rowMap = mapArr(rows);
    }
    if (
      Array.isArray(rowsSelected) &&
      arrayContains(rows, rowsSelected)
    ) {
      genes.rowsSelected = rowsSelected;
    } else {
      genes.rowsSelected = [];
    }
  } else {
    const rowArr = userRows.list.map(row => row.name);
    genes.rowMap = mapArr(rowArr);
    genes.rows = rowArr;
    genes.rowsSelected = [];
  }
  return genes;
};

export default fillGenes;
