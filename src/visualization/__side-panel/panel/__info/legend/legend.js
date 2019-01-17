import Dotplot from './legend__dotplot';
import Heatmap from './legend__heatmap';
import CircHeatmap from './legend__circheatmap';

const Legend = ({ imageType, ...settings }, circHeatmapSettings, segments) => {
  switch (imageType) {
    case 'dotplot':
      return Dotplot({ ...settings });
    case 'heatmap':
      return Heatmap({ ...settings });
    case 'circ-heatmap':
      return CircHeatmap({ ...settings, circHeatmapSettings, segments });
    default:
      return null;
  }
};
export default Legend;
