import ValidHex from '../../../helpers/valid-hex';

const Annotations = (userAnnotations = {}) => {
  const annotations = {};

  const {
    color,
    fontSize,
    list,
    show,
  } = userAnnotations;

  annotations.color = ValidHex(color) ? color : '#f44336';
  annotations.fontSize = Number.isNaN(fontSize) ? 12 : fontSize;
  annotations.list = Array.isArray(list) ? list : [];
  annotations.show = typeof show === 'boolean' ? show : true;

  return annotations;
};

export default Annotations;
