const Download = (string, filename, mimetype) => {
  const element = document.createElement('a');
  const file = new Blob([string], { type: mimetype });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  element.click();
  URL.revokeObjectURL(file);
};

export default Download;
