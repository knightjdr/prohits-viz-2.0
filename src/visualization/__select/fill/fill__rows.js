import ArrayShallowEqual from '../../../helpers/array-shallow-equal';

const Rows = (userRows) => {
  const rows = {};

  const {
    list,
    order,
  } = userRows;

  rows.list = list;

  // Ensure row list contains order arr.
  const listOrder = list.map(item => item.name);
  rows.order = ArrayShallowEqual(listOrder, order) ? order : listOrder;

  return rows;
};

export default Rows;
