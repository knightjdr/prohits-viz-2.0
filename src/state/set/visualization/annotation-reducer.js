import DeepCopy from '../../../helpers/deep-copy';

import {
  ADD_ANNOTATION,
  CLEAR_ALL_ANNOTATIONS,
  CLEAR_LAST_ANNOTATION,
  SET_ANNOTATION_COLOR,
} from './annotation-actions';

// import Default from '../../../visualization/test/annotations';

const Annotations = (state = {
  color: '#f44336',
  list: [],
}, action) => {
  let newList;
  switch (action.type) {
    case ADD_ANNOTATION:
      return {
        ...state,
        list: [
          ...DeepCopy(state.list),
          {
            text: action.text,
            x: action.x,
            y: action.y,
          },
        ],
      };
    case CLEAR_ALL_ANNOTATIONS:
      return {
        ...state,
        list: [],
      };
    case CLEAR_LAST_ANNOTATION:
      newList = DeepCopy(state.list);
      newList.pop();
      return {
        ...state,
        list: newList,
      };
    case SET_ANNOTATION_COLOR:
      return {
        ...state,
        ...{
          color: action.color,
        },
      };
    default:
      return state;
  }
};
export default Annotations;
