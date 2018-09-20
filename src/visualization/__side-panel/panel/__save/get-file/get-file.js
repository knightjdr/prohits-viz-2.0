import download from '../../../../../helpers/download';

const getFile = (options, errorFunc) => {
  const { imageType, task } = options;
  const url = `${process.env.REACT_APP_API_ROOT}/file/${task}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.blob();
    })
    .then((blob) => {
      const filename = `image.${imageType}`;
      download(blob, filename);
    })
    .catch(() => {
      errorFunc();
    });
};

export default getFile;
