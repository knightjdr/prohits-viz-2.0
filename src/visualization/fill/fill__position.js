import { defaultState } from '../../state/set/visualization/position-reducer';

const Position = (userPosition = {}) => {
  const position = {};

  const {
    x,
    y,
  } = userPosition;

  // Ensure x and y are between 0 and 1.
  if (
    x >= 0 &&
    x <= 1 &&
    y >= 0 &&
    y <= 1
  ) {
    position.x = x;
    position.y = y;
  } else {
    position.x = defaultState.x;
    position.y = defaultState.y;
  }

  return position;
};

export default Position;
