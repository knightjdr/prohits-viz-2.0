export const FILL_NEWS_ITEM = 'FILL_NEWS_ITEM';
export const GET_NEWS_ITEM = 'GET_NEWS_ITEM';
export const NEWS_ITEM_ERROR = 'NEWS_ITEM_ERROR';

export const fillNewsItem = (id, item) => ({
  id,
  item,
  type: FILL_NEWS_ITEM,
});

export const getNewsItem = id => ({
  id,
  type: GET_NEWS_ITEM,
});

export const newsItemError = id => ({
  id,
  type: NEWS_ITEM_ERROR,
});

// Thunks.
const fetchNewsItem = newsId => (
  (dispatch, getState) => {
    // If item is already in state, do nothing.
    if (
      getState().newsItem &&
      getState().newsItem.id === newsId
    ) {
      return null;
    }
    dispatch(getNewsItem(newsId));

    // Set headers.
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    const url = `${process.env.REACT_APP_API_ROOT}/news/${newsId}`;

    // Fetch and handle response.
    return fetch(url, {
      cache: 'default',
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
        if (data.news) {
          dispatch(fillNewsItem(newsId, data.news));
        } else {
          dispatch(newsItemError(newsId));
        }
      })
      .catch(() => {
        dispatch(newsItemError(newsId));
      });
  }
);
export default fetchNewsItem;
