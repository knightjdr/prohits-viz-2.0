import * as actions from './customize-actions';

import deepCopy from '../../../helpers/deep-copy';

const Customize = (
  state = [],
  action,
) => {
  switch (action.type) {
    case actions.ADD_CUSTOMIZE_STATE:
      return [
        ...state,
        {
          columns: {
            names: Object.assign([], action.columns),
            ref: null,
          },
          removeEmpty: action.removeEmpty,
          resetMaximums: action.resetMaximums,
          rows: {
            list: deepCopy(action.rows.list),
            order: Object.assign([], action.rows.order),
          },
        },
      ];
    case actions.REPLACE_CUSTOMIZE_STATE:
      return [
        ...state.slice(0, -1),
        {
          columns: {
            names: Object.assign([], action.columns),
            ref: null,
          },
          removeEmpty: action.removeEmpty,
          resetMaximums: action.resetMaximums,
          rows: {
            list: deepCopy(action.rows.list),
            order: Object.assign([], action.rows.order),
          },
        },
      ];
    case actions.SET_CUSTOMIZE_STATE:
      return [{
        columns: {
          names: Object.assign([], action.columns),
          ref: null,
        },
        removeEmpty: action.removeEmpty,
        resetMaximums: action.resetMaximums,
        rows: {
          list: deepCopy(action.rows.list),
          order: Object.assign([], action.rows.order),
        },
      }];
    case actions.UNDO_CUSTOMIZE_STATE:
      return state.slice(0, -1);
    default:
      return state;
  }
};

export default Customize;
