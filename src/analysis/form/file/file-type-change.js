/* takes a string input value and updates the redux form by passing this value
** to input.onChange */

const FileTypeChange = (value, input) => {
  input.onChange(value);
};
export default FileTypeChange;
