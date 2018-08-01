import ValidHex from '../../../helpers/valid-hex';

const Markers = (userMarkers = {}) => {
  const markers = {};

  const {
    color,
    list,
    show,
    record,
  } = userMarkers;

  markers.color = ValidHex(color) ? color : '#000000';
  markers.list = Array.isArray(list) ? list : [];
  markers.record = typeof record === 'boolean' ? record : false;
  markers.show = typeof show === 'boolean' ? show : true;

  return markers;
};

export default Markers;
