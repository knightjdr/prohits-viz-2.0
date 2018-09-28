import heatmap from './fill__heatmap';

const Fill = (name, file) => {
  switch (file.parameters.imageType) {
    case 'dotplot':
      return heatmap(name, file);
    case 'heatmap':
      return heatmap(name, file);
    default:
      return file;
  }
};
export default Fill;
