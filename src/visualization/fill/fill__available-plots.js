import { defaultState } from '../../state/set/visualization/available-plots-reducer';

const fillAvailablePlots = (userPlots) => {
  const plots = Array.isArray(userPlots) ? userPlots : defaultState;
  return plots;
};

export default fillAvailablePlots;
