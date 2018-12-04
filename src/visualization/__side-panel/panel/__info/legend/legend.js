import Dotplot from './legend__dotplot';
import Heatmap from './legend__heatmap';
import SegCircle from './legend__segcircle';

const Legend = ({ imageType, ...settings }, segcircleSettings, segments) => {
  switch (imageType) {
    case 'dotplot':
      return Dotplot({ ...settings });
    case 'heatmap':
      return Heatmap({ ...settings });
    case 'segcircle':
      return SegCircle({ ...settings, segcircleSettings, segments });
    default:
      return null;
  }
};
export default Legend;
