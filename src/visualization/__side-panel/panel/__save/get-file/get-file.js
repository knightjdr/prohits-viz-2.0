const getFile = (task) => {
  const url = `${process.env.REACT_APP_API_ROOT}/file/${task}`;
  fetch(url);
};

export default getFile;
