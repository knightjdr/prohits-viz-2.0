export const FILL_NEWS = 'FILL_NEWS';
export const GET_NEWS = 'GET_NEWS';
export const NEWS_ERROR = 'NEWS_ERROR';

export const fillNews = list => ({
  list,
  type: FILL_NEWS,
});
export const getNews = () => ({
  type: GET_NEWS,
});
export const newsError = () => ({
  type: NEWS_ERROR,
});

// thunks
const fetchNews = () => (
  (dispatch, getState) => {
    // if we already have the home page news, do nothing
    if (getState().news.isLoaded) {
      return null;
    }
    dispatch(getNews());
    // set headers
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    const url = `${process.env.REACT_APP_API_ROOT}/news/`;
    // fetch and handle response
    return fetch(url, {
      cache: 'no-store',
      headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => (
        response.json()
      ))
      .then((data) => {
        dispatch(fillNews(data.news));
      })
      .catch(() => {
        dispatch(newsError());
      });
  }
);
export default fetchNews;
