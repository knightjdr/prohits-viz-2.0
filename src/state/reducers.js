import { combineReducers } from 'redux';

// reducers
import home from './get/home-reducer';
import news from './get/news-reducer';
import newsItem from './get/news-item-reducer';
import newsPage from './set/news-page-reducer';

const Reducers = combineReducers({
  home,
  news,
  newsItem,
  newsPage,
});
export default Reducers;
