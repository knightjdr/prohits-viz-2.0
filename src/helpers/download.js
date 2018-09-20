const download = (content, filename) => {
  const element = document.createElement('a');
  const file = new Blob([content]);
  element.href = URL.createObjectURL(file);
  element.download = filename;
  element.click();
  URL.revokeObjectURL(file);
};

export default download;
