import { arrayShallowEqual } from '../../../helpers/array-shallow-equal';
import { defaultState } from '../../../state/set/visualization/rows-reducer';

const validDirections = ['asc', 'desc'];

const fillRows = (userRows) => {
  const rows = {};

  const {
    direction,
    list,
    order,
    sortBy,
  } = userRows;

  rows.list = list;

  // If there is a direction, ensure it is valid.
  rows.direction = validDirections.includes[direction] ? direction : defaultState.direction;

  // Ensure sortBy values is within range of list.
  rows.sortBy = sortBy < list.length ? sortBy : defaultState.sortBy;

  // Ensure row list contains order arr.
  const listOrder = list.map(item => item.name);
  rows.order = arrayShallowEqual(listOrder, order) ? order : listOrder;

  return rows;
};

export default fillRows;
