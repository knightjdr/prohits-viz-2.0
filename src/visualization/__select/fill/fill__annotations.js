import ValidHex from '../../../helpers/valid-hex';

const Annotations = (userAnnotations = {}) => {
  const annotations = {};

  const {
    color,
    list,
    move,
  } = userAnnotations;

  annotations.color = ValidHex(color) ? color : '#f44336';
  annotations.list = Array.isArray(list) ? list : [];
  annotations.move = typeof move === 'boolean' ? move : false;

  return annotations;
};

export default Annotations;
