const Columns = (state = {
  ref: null,
  names: [],
}, action) => {
  switch (action.type) {
    case 'CLEAR_INTERACTIVE_FILE':
      return {
        ref: null,
        names: [],
      };
    case 'PARSE_INTERACTIVE_FILE':
      return {
        ref: action.file.columns.ref,
        names: [...action.file.columns.names],
      };
    default:
      return state;
  }
};

export default Columns;
