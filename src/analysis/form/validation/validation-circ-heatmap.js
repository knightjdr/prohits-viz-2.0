import falsyButNotZero from '../../../helpers/falsy-but-not-zero';

const validationCircHeatmap = (values) => {
  const errors = {};

  // validate maximun abundance
  if (falsyButNotZero(values.abundanceCap)) {
    errors.abundanceCap = 'Specify the maximum abundance';
  } else if (Number.isNaN(Number(values.abundanceCap))) {
    errors.abundanceCap = 'Minumum abundance must be a number';
  }

  // validate fill
  const validColors = ['blueBlack', 'greenBlack', 'greyscale', 'redBlack', 'yellowBlack'];
  if (!values.fillColor) {
    errors.fillColor = 'Specify the fill color';
  } else if (!validColors.includes(values.fillColor)) {
    errors.fillColor = 'Select a valid fill color';
  }

  return errors;
};
export default validationCircHeatmap;
