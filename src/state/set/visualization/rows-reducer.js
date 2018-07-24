import DeepCopy from '../../../helpers/deep-copy';

const Rows = (state = {
  list: [],
  order: [],
}, action) => {
  switch (action.type) {
    case 'CLEAR_INTERACTIVE_FILE':
      return {
        list: [],
        order: [],
      };
    case 'PARSE_INTERACTIVE_FILE':
      return {
        list: DeepCopy(action.file.rows.list),
        order: [...action.file.rows.order],
      };
    default:
      return state;
  }
};

export default Rows;
