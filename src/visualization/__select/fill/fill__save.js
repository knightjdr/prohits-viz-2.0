const Save = (userSave = {}) => {
  const save = {};

  const {
    imageType,
    name,
  } = userSave;

  // Ensure imageType is valid.
  const acceptedTypes = ['pdf', 'png', 'svg'];
  save.imageType = imageType && acceptedTypes.includes(imageType) ? imageType : 'svg';
  save.name = typeof name === 'string' ? name : '';

  return save;
};

export default Save;
