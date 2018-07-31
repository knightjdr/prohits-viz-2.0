import ValidHex from '../../../helpers/valid-hex';

const Annotations = (userAnnotations = {}) => {
  const annotations = {};

  const {
    color,
    list,
    move,
    show,
  } = userAnnotations;

  annotations.color = ValidHex(color) ? color : '#f44336';
  annotations.list = Array.isArray(list) ? list : [];
  annotations.move = typeof move === 'boolean' ? move : false;
  annotations.show = typeof show === 'boolean' ? show : false;

  return annotations;
};

export default Annotations;
