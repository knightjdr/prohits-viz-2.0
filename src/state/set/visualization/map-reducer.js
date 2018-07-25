import * as fileActions from '../interactive-file-actions';

import { TOGGLE_ANNOTATIONS } from './map-actions';

const defaultState = {
  image: null,
  showAnnotations: false,
};

const Map = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return { ...defaultState };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return {
        image: action.file.minimap.image,
        showAnnotations: action.file.minimap.showAnnotations,
      };
    case TOGGLE_ANNOTATIONS:
      return {
        ...state,
        showAnnotations: !state.showAnnotations,
      };
    default:
      return state;
  }
};
export default Map;
