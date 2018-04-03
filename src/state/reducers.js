import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// reducers
import formStep from './set/form-step-reducer';
import header from './set/header-reducer';
import home from './get/home-reducer';
import news from './get/news-reducer';
import newsItem from './get/news-item-reducer';
import newsPage from './set/news-page-reducer';

const Reducers = combineReducers({
  form: formReducer,
  formStep,
  header,
  home,
  news,
  newsItem,
  newsPage,
});
export default Reducers;
