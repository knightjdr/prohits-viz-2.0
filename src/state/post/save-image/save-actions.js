export const SAVE_ERROR = 'SAVE_ERROR';
export const SAVED_IMAGE = 'SAVED_IMAGE'; // Server action
export const SAVING_IMAGE = 'SAVING_IMAGE';

export const saveError = () => ({
  type: 'SAVE_ERROR',
});

export const savingImage = () => ({
  type: 'SAVING_IMAGE',
});
