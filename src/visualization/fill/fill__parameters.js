const acceptedImageTypes = ['dotplot', 'heatmap'];

const fillParameters = (userParams = {}, filename) => {
  const paramerters = {};

  const {
    imageType,
    name,
    ...other
  } = userParams;

  paramerters.imageType = imageType && acceptedImageTypes.includes(imageType) ?
    imageType : null;
  paramerters.name = typeof name === 'string' ? name : filename;

  return {
    ...paramerters,
    ...other,
  };
};

export default fillParameters;
