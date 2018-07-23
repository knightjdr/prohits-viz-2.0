import { TOGGLE_ANNOTATIONS } from './map-actions';

const defaultState = {
  image: null,
  showAnnotations: false,
};

const Map = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case 'CLEAR_INTERACTIVE_FILE':
      return { ...defaultState };
    case 'PARSE_INTERACTIVE_FILE':
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
