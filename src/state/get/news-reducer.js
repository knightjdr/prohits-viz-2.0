import {
  FILL_NEWS,
  GET_NEWS,
  NEWS_ERROR,
} from './news-actions';

const News = (state = {
  error: false,
  isLoaded: false,
  isLoading: false,
  list: [],
}, action) => {
  switch (action.type) {
    case FILL_NEWS:
      return {
        error: false,
        isLoaded: true,
        isLoading: false,
        list: action.list,
      };
    case GET_NEWS:
      return {
        error: false,
        isLoaded: false,
        isLoading: true,
        list: [],
      };
    case NEWS_ERROR:
      return {
        error: true,
        isLoaded: false,
        isLoading: false,
        list: [],
      };
    default:
      return state;
  }
};
export default News;
