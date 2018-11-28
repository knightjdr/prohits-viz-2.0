import percToCoord from '../helpers/percent-to-coordinate';
import roundNearest from '../../../../helpers/round-nearest';

const knownSlice = (data, radius) => {
  const known = data.reduce((accum, datum) => (datum.known ? accum + 1 : accum), 0);
  const percent = roundNearest(known / data.length, 0.0001);
  const point = percToCoord(percent, radius);
  return {
    arc: percent > 0.5 ? 1 : 0,
    x: point[0],
    y: point[1],
  };
};

export default knownSlice;
