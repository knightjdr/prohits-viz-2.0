import { arrayShallowEqual } from '../../helpers/array-shallow-equal';
import { defaultState } from '../../state/set/visualization/rows-reducer';

const validDirections = ['asc', 'desc'];

const fillRows = (userRows = {}) => {
  const rows = {};

  const {
    direction,
    id,
    list,
    order,
    sortBy,
  } = userRows;

  rows.list = Array.isArray(list) ? list : defaultState.list;
  rows.direction = validDirections.includes(direction) ? direction : defaultState.direction;
  rows.id = typeof id === 'number' ? id : defaultState.id;

  // Ensure sortBy values is within range of list.
  rows.sortBy = sortBy < rows.list.length ? sortBy : defaultState.sortBy;

  // Ensure row list contains order arr.
  const listOrder = rows.list.map(item => item.name);
  rows.order = Array.isArray(order) && arrayShallowEqual(listOrder, order) ?
    order : listOrder;

  return rows;
};

export default fillRows;
