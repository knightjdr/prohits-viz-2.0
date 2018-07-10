import { UPDATE_POSITION } from './position-actions';

const Position = (state = {
  x: 0,
  y: 0,
}, action) => {
  switch (action.type) {
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
