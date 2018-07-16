import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// reducers
import annotations from './set/visualization/annotation-reducer';
import formStep from './set/form-step-reducer';
import genes from './set/visualization/genes-reducer';
import header from './set/header-reducer';
import home from './get/home-reducer';
import interactiveFile from './set/interactive-file-reducer';
import markers from './set/visualization/marker-reducer';
import minimap from './set/visualization/map-reducer';
import news from './get/news-reducer';
import newsItem from './get/news-item-reducer';
import newsPage from './set/news-page-reducer';
import parameters from './set/visualization/params-reducer';
import position from './set/visualization/position-reducer';
import save from './set/visualization/save-reducer';
import search from './set/visualization/search-reducer';
import settings from './set/visualization/settings-reducer';

const Reducers = combineReducers({
  annotations,
  form: formReducer,
  formStep,
  genes,
  header,
  home,
  interactiveFile,
  markers,
  minimap,
  news,
  newsItem,
  newsPage,
  parameters,
  position,
  save,
  search,
  settings,
});
export default Reducers;
