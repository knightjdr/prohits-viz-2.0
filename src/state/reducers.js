import { combineReducers } from 'redux';

// reducers
import home from './get/home-reducer';
import news from './get/news-reducer';
import newsItem from './get/news-item-reducer';

const Reducers = combineReducers({
  home,
  news,
  newsItem,
});
export default Reducers;
