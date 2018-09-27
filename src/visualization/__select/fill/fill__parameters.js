const fillParameters = (userParams = {}) => {
  const paramerters = {};

  const {
    imageType,
    ...other
  } = userParams;

  paramerters.imageType = typeof imageType === 'string' ? imageType : 'heatmap';

  return {
    ...paramerters,
    ...other,
  };
};

export default fillParameters;
