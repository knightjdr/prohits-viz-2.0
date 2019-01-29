import circHeatmap from './fill__circ-heatmap';
import heatmap from './fill__heatmap';

const Fill = (name, file) => {
  switch (file.parameters.imageType) {
    case 'circ-heatmap':
      return circHeatmap(name, file);
    case 'dotplot':
      return heatmap(name, file);
    case 'heatmap':
      return heatmap(name, file);
    default:
      return file;
  }
};
export default Fill;
