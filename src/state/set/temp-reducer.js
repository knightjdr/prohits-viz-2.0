import { SET_TEMP } from './temp-action';

const Temp = (
  state = 0,
  action,
) => {
  switch (action.type) {
    case SET_TEMP:
      return action.index;
    default:
      return state;
  }
};
export default Temp;
