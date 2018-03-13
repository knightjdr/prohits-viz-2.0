import { combineReducers } from 'redux';

// reducers
import home from './get/home-reducer';

const Reducers = combineReducers({
  home,
});
export default Reducers;
