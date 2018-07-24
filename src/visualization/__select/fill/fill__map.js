import ValidateUri from '../../../helpers/validate-uri';

const Map = (userMap) => {
  const minimap = {};

  const {
    image,
    showAnnotations,
  } = userMap;

  // Confirm data uri exists and is valid.
  minimap.image = image && ValidateUri(image) ?
    image
    :
    null;
  minimap.showAnnotations = typeof showAnnotations === 'boolean' ?
    showAnnotations
    :
    false;
  return minimap;
};
export default Map;
