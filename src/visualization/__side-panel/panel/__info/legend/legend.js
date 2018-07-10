import Dotplot from './legend__dotplot';
import Heatmap from './legend__heatmap';

const Legend = (params) => {
  switch (params.imageType) {
    case 'dotplot':
      return Dotplot(params);
    case 'heatmap':
      return Heatmap(params);
    default:
      return null;
  }
};
export default Legend;
