export const CLEAR_FILE_HEADER = 'CLEAR_FILE_HEADER';
export const SET_FILE_HEADER = 'SET_FILE_HEADER';

export const clearFileHeader = () => ({
  type: 'CLEAR_FILE_HEADER',
});

export const setFileHeader = header => ({
  header,
  type: 'SET_FILE_HEADER',
});
