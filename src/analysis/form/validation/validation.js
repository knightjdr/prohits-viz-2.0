import validationDefault from './validation-default';
import validationDotplot from './validation-dotplot';

const validation = (values) => {
  let errors = {};
  errors = { ...validationDefault(values), ...errors };
  errors = { ...validationDotplot(values), ...errors };
  errors = { ...validationDotplot(values), ...errors };
  return errors;
};

export default validation;
