import * as actions from './go-actions';

export const initState = {
  annotation: '',
};

const Go = (
  state = initState,
  action,
) => {
  switch (action.type) {
    case actions.CLEAR_GO_ANNOTATION: {
      return {
        annotation: '',
      };
    }
    case actions.SET_GO_ANNOTATION:
      return {
        annotation: action.text,
      };
    default:
      return state;
  }
};

export default Go;
