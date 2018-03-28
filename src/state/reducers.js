import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// reducers
import header from './set/header-reducer';
import home from './get/home-reducer';
import news from './get/news-reducer';
import newsItem from './get/news-item-reducer';
import newsPage from './set/news-page-reducer';

const Reducers = combineReducers({
  form: formReducer,
  header,
  home,
  news,
  newsItem,
  newsPage,
});
export default Reducers;