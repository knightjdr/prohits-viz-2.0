import falsyButNotZero from '../../../helpers/falsy-but-not-zero';

const validationDefault = (values) => {
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
  const validAnalysisTypes = ['circ-heatmap', 'condition-condition', 'correlation', 'dotplot', 'specificity'];
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

  // validate score type
  const validScoreTypes = ['gte', 'lte'];
  if (!values.scoreType) {
    errors.scoreType = 'Specify the score type';
  } else if (!validScoreTypes.includes(values.scoreType)) {
    errors.scoreType = 'Invalid score type';
  }

  // validate primary filter
  if (falsyButNotZero(values.primaryFilter)) {
    errors.primaryFilter = 'Specify the primary filter';
  } else if (Number.isNaN(Number(values.primaryFilter))) {
    errors.primaryFilter = 'Primary filter must be a number';
  }

  // validate minimum abundance
  if (falsyButNotZero(values.minAbundance)) {
    errors.minAbundance = 'Specify the minumum abundance';
  } else if (Number.isNaN(Number(values.minAbundance))) {
    errors.minAbundance = 'Minumum abundance must be a number';
  }

  // ensure column has been selected when control subtraction is true
  if (
    values.ctrlSub &&
    !values.control
  ) {
    errors.control = 'Select a column for control subtraction';
  }

  // ensure column has been selected when readout length normalization is true
  if (
    values.readoutLengthNorm &&
    !values.readoutLength
  ) {
    errors.readoutLength = 'Select a column for readout length normalization';
  }

  // validate normalization
  const validNorm = ['none', 'total', 'readout'];
  if (
    values.normalization &&
    !validNorm.includes(values.normalization)
  ) {
    errors.normalization = 'Select a valid normalization method';
  } else if (
    values.normalization === 'readout' &&
    !values.normalizationReadout
  ) {
    errors.normalizationReadout = 'Select a readout for readout-based normalization';
  }

  // validate log transformation
  const validLog = ['none', 2, 'e', 10];
  if (
    values.logBase &&
    !validLog.includes(values.logBase)
  ) {
    errors.logBase = 'Select a valid log transformation';
  }
  return errors;
};

export default validationDefault;
