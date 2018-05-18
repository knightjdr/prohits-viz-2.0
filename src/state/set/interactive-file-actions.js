export const CLEAR_INTERACTIVE_FILE = 'CLEAR_INTERACTIVE_FILE';
export const SET_INTERACTIVE_FILE = 'SET_INTERACTIVE_FILE';

export const clearIntFile = () => ({
  type: 'CLEAR_INTERACTIVE_FILE',
});

export const setIntFile = file => ({
  file,
  type: 'SET_INTERACTIVE_FILE',
});
