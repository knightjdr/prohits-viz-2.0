import ValidateUri from '../../../helpers/validate-uri';

const Map = (userMap) => {
  const minimap = {};

  const {
    image,
    synced,
    syncImage,
  } = userMap;

  // Confirm data uri exists and is valid.
  minimap.image = image && ValidateUri(image) ?
    image
    :
    null;

  // Confirm data uri exists and is valid.
  minimap.syncImage = syncImage && ValidateUri(syncImage) ?
    syncImage
    :
    null;

  minimap.synced = typeof synced === 'boolean' ? synced : true;
  return minimap;
};
export default Map;
