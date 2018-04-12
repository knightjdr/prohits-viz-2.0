import ValidationDefault from './validation-default';
import ValidationDotplot from './validation-dotplot';

const Validation = (values) => {
  let errors = {};
  errors = { ...ValidationDefault(values), ...errors };
  errors = { ...ValidationDotplot(values), ...errors };
  return errors;
};
export default Validation;
