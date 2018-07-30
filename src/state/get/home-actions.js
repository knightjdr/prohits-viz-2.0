export const FILL_HOME = 'FILL_HOME';

export const fillHome = data => ({
  data,
  type: FILL_HOME,
});

// thunks
const fetchHome = () => (
  (dispatch, getState) => {
    // If we already have the home page news, do nothing.
    if (getState().home.isLoaded) {
      return null;
    }
    // Set headers.
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    const url = `${process.env.REACT_APP_API_ROOT}/home/`;
    /* Fetch and handle response. Since this is just loading optional
    ** home page info, do nothing on error. */
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
        dispatch(fillHome(data));
      })
      .catch(() => {
      });
  }
);
export default fetchHome;
