import download from './download';

const getFile = (path, options = {}) => (
  new Promise((resolve) => {
    const ext = options.ext || 'txt';
    const name = options.name || 'file';
    const url = `${process.env.REACT_APP_API_ROOT}/${path}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.blob();
      })
      .then((blob) => {
        const filename = `${name}.${ext}`;
        download(blob, filename);
        resolve();
      })
      .catch((err) => {
        if (
          options.err &&
          typeof options.err === 'function'
        ) {
          options.err(err);
        }
      });
  })
);

export default getFile;
