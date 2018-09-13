import * as actions from './data-actions';
import * as columnActions from './columns-actions';
import * as fileActions from '../../interactive-file-actions';
import * as rowActions from './rows-actions';
import * as tabActions from '../../visualization/tab-actions';

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
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return [];
    case fileActions.PARSE_INTERACTIVE_FILE:
      return deepCopy(action.file.customize);
    case tabActions.REMOVE_TAB:
      if (action.tab === 'customize') {
        return [];
      }
      return state;
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
    case actions.RESET_CUSTOMIZE_STATE:
      return [
        state[0],
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
    case rowActions.SORT_CUSTOMIZE_STATE:
      /* This is identical to ADD_CUSTOMIZE_STATE but we need a
      ** distinct action when sorting to update the plot position. */
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
    case actions.UNDO_CUSTOMIZE_STATE:
      return state.slice(0, -1);
    default:
      return state;
  }
};

export default Customize;
