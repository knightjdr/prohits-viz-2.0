import download from './download';

const getFile = (path, options = {}, callback) => (
  new Promise((resolve) => {
    const ext = options.ext || 'txt';
    const name = options.name || 'file';
    const onSuccess = callback || download;
    const type = options.responseType || 'blob';
    const url = `${process.env.REACT_APP_API_ROOT}/${path}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response[type]();
      })
      .then((result) => {
        const filename = `${name}.${ext}`;
        onSuccess(result, filename);
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
