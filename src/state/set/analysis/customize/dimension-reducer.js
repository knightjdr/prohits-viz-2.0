import * as actions from './dimension-actions';
import * as fileActions from '../../interactive-file-actions';
import * as tabActions from '../../visualization/tab-actions';

const initState = {
  columns: 0,
  height: 0,
  pageX: 0,
  pageY: 0,
  rows: 0,
  width: 0,
};

const dimension = (state = { ...initState }, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return { ...initState };
    case tabActions.REMOVE_TAB:
      if (action.tab === 'customize') {
        return { ...initState };
      }
      return state;
    case actions.SET_CUSTOMIZE_DIMENSIONS:
      return {
        columns: action.columns,
        height: action.height,
        pageX: action.pageX,
        pageY: action.pageY,
        rows: action.rows,
        width: action.width,
      };
    default:
      return state;
  }
};
export default dimension;
