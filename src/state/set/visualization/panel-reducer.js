import { TOGGLE_PANEL } from './panel-actions';

const Panel = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_PANEL:
      return !state;
    default:
      return state;
  }
};

export default Panel;
