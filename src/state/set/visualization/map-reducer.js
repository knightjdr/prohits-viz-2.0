import Test from '../../../visualization/test-files/map';

import { TOGGLE_ANNOTATIONS } from './map-actions';

const Map = (state = {
  image: Test,
  showAnnotations: false,
}, action) => {
  switch (action.type) {
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
