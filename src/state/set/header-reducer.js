import {
  CLEAR_FILE_HEADER,
  SET_FILE_HEADER,
} from './header-actions';

const Header = (state = [], action) => {
  switch (action.type) {
    case CLEAR_FILE_HEADER:
      return [];
    case SET_FILE_HEADER:
      return [...action.header];
    default:
      return state;
  }
};
export default Header;
