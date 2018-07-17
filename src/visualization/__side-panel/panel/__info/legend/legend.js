import Dotplot from './legend__dotplot';
import Heatmap from './legend__heatmap';

const Legend = ({ imageType, ...params }) => {
  switch (imageType) {
    case 'dotplot':
      return Dotplot({ ...params });
    case 'heatmap':
      return Heatmap({ ...params });
    default:
      return null;
  }
};
export default Legend;
