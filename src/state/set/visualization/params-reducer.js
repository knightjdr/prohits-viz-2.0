const Parameters = (state = {}, action) => {
  switch (action.type) {
    case 'CLEAR_INTERACTIVE_FILE':
      return {};
    case 'PARSE_INTERACTIVE_FILE':
      return { ...action.file.params };
    default:
      return state;
  }
};
export default Parameters;
