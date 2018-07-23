import Dotplot from './fill__dotplot';

const Fill = (name, file) => {
  switch (file.params.imageType) {
    case 'dotplot':
      return Dotplot(name, file);
    default:
      return file;
  }
};
export default Fill;
