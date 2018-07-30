import { SET_DIMENSIONS } from './dimension-actions';

const Dimension = (state = {
  columns: 0,
  pageX: 0,
  pageY: 0,
  rows: 0,
}, action) => {
  switch (action.type) {
    case SET_DIMENSIONS:
      return {
        columns: action.columns,
        pageX: action.pageX,
        pageY: action.pageY,
        rows: action.rows,
      };
    default:
      return state;
  }
};
export default Dimension;
