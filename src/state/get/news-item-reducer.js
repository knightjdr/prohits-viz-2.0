import {
  FILL_NEWS_ITEM,
  GET_NEWS_ITEM,
  NEWS_ITEM_ERROR,
} from './news-item-actions';

const News = (state = {
  error: false,
  id: null,
  isLoaded: false,
  isLoading: false,
  item: null,
}, action) => {
  switch (action.type) {
    case FILL_NEWS_ITEM:
      return {
        error: false,
        id: action.id,
        isLoaded: true,
        isLoading: false,
        item: action.item,
      };
    case GET_NEWS_ITEM:
      return {
        error: false,
        id: action.id,
        isLoaded: false,
        isLoading: true,
        item: null,
      };
    case NEWS_ITEM_ERROR:
      return {
        error: true,
        id: action.id,
        isLoaded: false,
        isLoading: false,
        item: null,
      };
    default:
      return state;
  }
};
export default News;
