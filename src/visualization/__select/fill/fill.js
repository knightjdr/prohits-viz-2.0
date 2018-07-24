import Heatmap from './fill__heatmap';

const Fill = (name, file) => {
  switch (file.params.imageType) {
    case 'dotplot':
      return Heatmap(name, file);
    case 'heatmap':
      return Heatmap(name, file);
    default:
      return file;
  }
};
export default Fill;
