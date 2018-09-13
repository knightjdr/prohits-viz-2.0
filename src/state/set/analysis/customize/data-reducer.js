import * as columnActions from './columns-actions';
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
            ref: action.ref || null,
          },
          direction: action.direction,
          id,
          removeEmpty: action.removeEmpty,
          resetMaximums: action.resetMaximums,
          rows: {
            list: deepCopy(action.rows.list),
            order: Object.assign([], action.rows.order),
          },
          sortBy: action.sortBy,
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
    case columnActions.SET_CUSTOMIZE_REFERENCE:
      return [
        ...state.slice(0, -1),
        {
          ...state[state.length - 1],
          columns: {
            names: Object.assign([], state[state.length - 1].columns.names),
            ref: action.ref,
          },
        },
      ];
    case actions.SET_CUSTOMIZE_STATE:
      return [{
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
      }];
    case actions.UNDO_CUSTOMIZE_STATE:
      return state.slice(0, -1);
    default:
      return state;
  }
};

export default Customize;
