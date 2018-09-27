import validHex from '../../../helpers/valid-hex';
import { defaultState } from '../../../state/set/visualization/marker-reducer';

const fillMarkers = (userMarkers = {}) => {
  const markers = {};

  const {
    color,
    list,
    show,
    record,
  } = userMarkers;

  markers.color = validHex(color) ? color : defaultState.color;
  markers.list = Array.isArray(list) ? list : defaultState.list;
  markers.record = typeof record === 'boolean' ? record : defaultState.record;
  markers.show = typeof show === 'boolean' ? show : defaultState.show;

  return markers;
};

export default fillMarkers;
