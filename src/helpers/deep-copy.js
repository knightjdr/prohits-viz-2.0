// Deep copy an object.
const DeepCopy = obj => (
  obj ? JSON.parse(JSON.stringify(obj)) : null
);

export default DeepCopy;
