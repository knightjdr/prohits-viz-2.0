import { SET_DIMENSIONS } from './dimension-actions';

const defaultState = {
  height: 0,
  pageX: 0,
  pageY: 0,
  width: 0,
};

const Dimension = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case SET_DIMENSIONS:
      return {
        height: action.height,
        pageX: action.pageX,
        pageY: action.pageY,
        width: action.width,
      };
    default:
      return state;
  }
};
export default Dimension;
