/* takes a string input value and updates the redux form by passing this value
** to input.onChange */

const DefaultChange = (value, input) => {
  input.onChange(value || null);
};
export default DefaultChange;
