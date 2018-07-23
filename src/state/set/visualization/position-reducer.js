import { UPDATE_POSITION } from './position-actions';

const defaultState = {
  x: 0,
  y: 0,
};

const Position = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case 'CLEAR_INTERACTIVE_FILE':
      return { ...defaultState };
    case 'PARSE_INTERACTIVE_FILE':
      return { ...action.file.position };
    case UPDATE_POSITION:
      return Object.assign(
        {},
        state,
        {
          x: action.x,
          y: action.y,
        },
      );
    default:
      return state;
  }
};
export default Position;
