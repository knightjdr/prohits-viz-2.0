import { combineReducers } from 'redux';

// reducers
import temp from './set/temp-reducer';

const Reducers = combineReducers({
  temp,
});
export default Reducers;
