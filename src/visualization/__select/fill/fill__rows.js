import ArrayShallowEqual from '../../../helpers/array-shallow-equal';

const Rows = (userRows) => {
  const rows = {};

  const {
    direction,
    list,
    order,
    sortBy,
  } = userRows;

  rows.list = list;

  // If there is a direction, ensure it is valid.
  const validDirections = ['asc', 'desc'];
  rows.direction = validDirections.includes[direction] ? direction : null;

  // Ensure sortBy values is within range of list.
  rows.sortBy = sortBy < list.length ? sortBy : null;

  // Ensure row list contains order arr.
  const listOrder = list.map(item => item.name);
  rows.order = ArrayShallowEqual(listOrder, order) ? order : listOrder;

  return rows;
};

export default Rows;