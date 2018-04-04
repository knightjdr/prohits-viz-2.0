/* takes a string input value and updates the redux form by passing this value
** to input.onChange */

const SelectChange = (value, input) => {
  input.onChange(value || null);
};
export default SelectChange;
