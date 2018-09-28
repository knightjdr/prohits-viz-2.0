import validHex from '../../helpers/valid-hex';
import { defaultState } from '../../state/set/visualization/annotation-reducer';

const fillAnnotations = (userAnnotations = {}) => {
  const annotations = {};

  const {
    color,
    fontSize,
    list,
    show,
  } = userAnnotations;

  annotations.color = validHex(color) ? color : defaultState.color;
  annotations.fontSize = typeof fontSize === 'number' ? fontSize : defaultState.fontSize;
  annotations.list = Array.isArray(list) ? list : defaultState.list;
  annotations.show = typeof show === 'boolean' ? show : defaultState.show;

  return annotations;
};

export default fillAnnotations;
