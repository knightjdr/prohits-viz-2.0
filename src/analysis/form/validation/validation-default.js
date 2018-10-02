const ValidationDefault = (values) => {
  const errors = {};
  // validate file type
  const validFileTypes = ['crapome', 'generic', 'saint'];
  if (!values.fileType) {
    errors.fileType = 'Specify the file type';
  } else if (!validFileTypes.includes(values.fileType)) {
    errors.fileType = 'Invalid file type';
  }
  /* validate file has been specified. Detailed file validation will occur
  ** server side */
  if (
    !values.file ||
    values.file.length <= 0
  ) {
    errors.file = 'Specify the file to analyze';
  }
  // validate analysis types
  const validAnalysisTypes = ['conditioncondition', 'correlation', 'dotplot', 'specificity'];
  if (!values.analysisType) {
    errors.analysisType = 'Specify the analysis type';
  } else if (!validAnalysisTypes.includes(values.analysisType)) {
    errors.analysisType = 'Invalid analysis type';
  }
  /* validate columns. The presence and validity for use of these columns
  ** will be done server side */
  if (!values.abundance) {
    errors.abundance = 'Specify the abundance column';
  }
  if (!values.condition) {
    errors.condition = 'Specify the condition column';
  }
  if (!values.readout) {
    errors.readout = 'Specify the readout column';
  }
  if (!values.score) {
    errors.score = 'Specify the score column';
  }
  return errors;
};
export default ValidationDefault;
