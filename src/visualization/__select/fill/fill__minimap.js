import validateUri from '../../../helpers/validate-uri';
import { defaultState } from '../../../state/set/visualization/map-reducer';

const fillMinimap = (userMap) => {
  const minimap = {};

  const {
    image,
    synced,
    syncImage,
  } = userMap;

  // Confirm data uri exists and is valid.
  minimap.image = image && validateUri(image) ?
    image
    :
    defaultState.image;

  // Confirm data uri exists and is valid.
  minimap.syncImage = syncImage && validateUri(syncImage) ?
    syncImage
    :
    defaultState.syncImage;

  minimap.synced = typeof synced === 'boolean' ? synced : defaultState.synced;
  return minimap;
};

export default fillMinimap;
