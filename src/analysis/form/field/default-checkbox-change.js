/* takes a boolean input value and updates the redux form by passing this value
** to input.onChange */

const DefaultCheckboxChange = (checked, input) => {
  input.onChange(checked);
};
export default DefaultCheckboxChange;
