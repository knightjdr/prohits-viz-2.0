import percToCoord from './percent-to-coordinate';
import roundNearest from '../../../../../helpers/round-nearest';

const pieSlice = (data, radius) => {
  let cumulativePercent = 0;
  let last = [radius, 0];
  const total = data.reduce((accum, datum) => accum + datum.readouts, 0);
  return data.map((datum) => {
    cumulativePercent += datum.readouts;
    const percent = roundNearest(cumulativePercent / total, 0.0001);
    const point = percToCoord(percent, radius);
    const start = [...last];
    last = point;
    return {
      a: {
        arc: datum.readouts / total > 0.5 ? 1 : 0,
        x: point[0],
        y: point[1],
      },
      fill: datum.color,
      m: {
        x: start[0],
        y: start[1],
      },
      term: datum.term,
    };
  });
};

export default pieSlice;
