import * as actions from './save-actions';
import imageData from './image-data';

const saveImage = () => (
  (dispatch, getState) => {
    dispatch(actions.savingImage());
    const { save, session, settings } = getState();
    const { imageType } = settings.current;
    const data = imageData(imageType, getState);
    data.outputType = save.imageType;
    // Set headers.
    const headers = new Headers();
    headers.append('accept', 'application/json');
    headers.append('content-type', 'application/json');
    headers.append('session', session);
    const url = `${process.env.REACT_APP_API_ROOT}/export/${imageType}`;
    return fetch(url, {
      cache: 'no-store',
      body: JSON.stringify(data),
      headers,
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
      })
      .catch(() => {
        dispatch(actions.saveError());
      });
  }
);

export default saveImage;
