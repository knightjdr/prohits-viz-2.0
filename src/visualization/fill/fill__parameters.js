import { defaultState } from '../../state/set/visualization/params-reducer';

const acceptedImageTypes = ['dotplot', 'heatmap', 'circ-heatmap'];
const acceptedScoreTypes = ['lte', 'gte'];

const fillParameters = (userParams = {}, filename) => {
  const parameters = {};

  const {
    abundanceColumn,
    imageType,
    name,
    scoreColumn,
    scoreType,
    ...other
  } = userParams;

  parameters.abundanceColumn = typeof abundanceColumn === 'string' ? abundanceColumn : defaultState.abundanceColumn;
  parameters.imageType = imageType && acceptedImageTypes.includes(imageType) ?
    imageType : null;
  parameters.name = typeof name === 'string' ? name : filename;
  parameters.scoreColumn = typeof scoreColumn === 'string' ? scoreColumn : defaultState.scoreColumn;
  parameters.scoreType = scoreType && acceptedScoreTypes.includes(scoreType) ?
    scoreType : defaultState.scoreType;

  return {
    ...parameters,
    ...other,
  };
};

export default fillParameters;
