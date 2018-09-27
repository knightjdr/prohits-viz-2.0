import { defaultState } from '../../../state/set/visualization/save-reducer';

const fillSave = (userSave = {}) => {
  const save = {};

  const {
    imageType,
    name,
  } = userSave;

  // Ensure imageType is valid.
  const acceptedTypes = ['pdf', 'png', 'svg'];
  save.imageType = imageType && acceptedTypes.includes(imageType) ?
    imageType
    : defaultState.imageType;
  save.name = typeof name === 'string' ? name : defaultState.name;

  return save;
};

export default fillSave;
