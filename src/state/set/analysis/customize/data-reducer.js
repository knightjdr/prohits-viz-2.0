import * as actions from './data-actions';

import deepCopy from '../../../../helpers/deep-copy';

const Customize = (
  state = [],
  action,
) => {
  const id = state.length > 0 ? state[state.length - 1].id + 1 : 0;
  switch (action.type) {
    case actions.ADD_CUSTOMIZE_STATE:
      return [
        ...state,
        {
          columns: {
            names: Object.assign([], action.columns),
            ref: null,
          },
          id,
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
          id,
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
        id: 0,
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
