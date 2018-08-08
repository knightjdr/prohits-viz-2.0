import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// reducers
import annotations from './set/visualization/annotation-reducer';
import columns from './set/visualization/columns-reducer';
import dimensions from './set/visualization/dimension-reducer';
import display from './set/visualization/display-reducer';
import formStep from './set/form-step-reducer';
import genes from './set/visualization/genes-reducer';
import header from './set/header-reducer';
import home from './get/home-reducer';
import markers from './set/visualization/marker-reducer';
import minimap from './set/visualization/map-reducer';
import news from './get/news-reducer';
import newsItem from './get/news-item-reducer';
import newsPage from './set/news-page-reducer';
import panel from './set/visualization/panel-reducer';
import parameters from './set/visualization/params-reducer';
import position from './set/visualization/position-reducer';
import rows from './set/visualization/rows-reducer';
import save from './set/visualization/save-reducer';
import search from './set/visualization/search-reducer';
import settings from './set/visualization/settings-reducer';

const Reducers = combineReducers({
  annotations,
  columns,
  dimensions,
  display,
  form: formReducer,
  formStep,
  genes,
  header,
  home,
  markers,
  minimap,
  news,
  newsItem,
  newsPage,
  panel,
  parameters,
  position,
  rows,
  save,
  search,
  settings,
});
export default Reducers;
