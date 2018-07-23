import ValidHex from '../../../helpers/valid-hex';

const Markers = (userMarkers = {}) => {
  const markers = {};

  const {
    color,
    list,
    record,
  } = userMarkers;

  markers.color = ValidHex(color) ? color : '#000000';
  markers.list = Array.isArray(list) ? list : [];
  markers.record = typeof record === 'boolean' ? record : false;

  return markers;
};

export default Markers;
