export const SAVE_IMAGE_TYPE = 'SAVE_IMAGE_TYPE';
export const SAVE_SESSION_NAME = 'SAVE_SESSION_NAME';

export const saveImageType = imageType => ({
  imageType,
  type: SAVE_IMAGE_TYPE,
});

export const saveSessionName = name => ({
  name,
  type: SAVE_SESSION_NAME,
});
