const UndefinedIfNotSet = value => (
  value || value === 0 ? value : undefined
);
export default UndefinedIfNotSet;
