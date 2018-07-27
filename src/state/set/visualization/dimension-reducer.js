import { SET_DIMENSIONS } from './dimension-actions';

const defaultState = {
  columns: 0,
  height: 0,
  rows: 0,
  width: 0,
};

const Dimension = (state = { ...defaultState }, action) => {
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
