const Validation = (values) => {
  const errors = {};
  // validate file
  if (!values.fileType) {
    errors.fileType = 'File type required';
  }
  if (
    !values.file ||
    values.file.length <= 0
  ) {
    errors.file = 'Specify a file to analyze';
  }
  // validate analysis type
  if (!values.analysisType) {
    errors.analysisType = 'Analysis type required';
  }
  // validate columns
  if (!values.abundance) {
    errors.abundance = 'Required';
  }
  if (!values.bait) {
    errors.bait = 'Required';
  }
  if (!values.prey) {
    errors.prey = 'Required';
  }
  if (!values.score) {
    errors.score = 'Required';
  }
  return errors;
};
export default Validation;
