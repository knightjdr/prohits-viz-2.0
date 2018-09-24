import heatmapData from './heatmap-data';

/* Determing type of data to send for saving. */
const imageData = (imageType, state) => {
  let data = {};
  if (
    imageType === 'dotplot' ||
    imageType === 'heatmap'
  ) {
    data = heatmapData(state);
  }
  return data;
};

export default imageData;
