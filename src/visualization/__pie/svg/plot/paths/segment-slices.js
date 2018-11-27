import percToCoord from './percent-to-coordinate';
import roundNearest from '../../../../../helpers/round-nearest';

const pieSlice = (data, radii) => {
  let cumulativePercent = 0;
  const last = {
    inner: [radii.segment, 0],
    outer: [radii.full, 0],
  };
  const arc = data.length < 2 ? 1 : 0;
  const percent = roundNearest(1 / data.length, 0.0001);
  const halfPercent = percent / 2;
  return data.map((datum) => {
    cumulativePercent += percent;
    const innerPoint = percToCoord(cumulativePercent, radii.segment);
    const outerPoint = percToCoord(cumulativePercent, radii.full);
    const textPoint = percToCoord(cumulativePercent - halfPercent, radii.text);
    const start = {
      inner: [...last.inner],
      outer: [...last.outer],
    };
    last.inner = innerPoint;
    last.outer = outerPoint;
    return {
      a: {
        x: start.outer[0],
        y: start.outer[1],
      },
      abundance: datum.abundance,
      b: {
        arc,
        x: outerPoint[0],
        y: outerPoint[1],
      },
      c: {
        x: innerPoint[0],
        y: innerPoint[1],
      },
      d: {
        arc,
        x: start.inner[0],
        y: start.inner[1],
      },
      fill: datum.color,
      readout: datum.readout,
      text: {
        alignment: cumulativePercent < 0.25 || cumulativePercent > 0.75 ? 'baseline' : 'hanging',
        anchor: cumulativePercent > 0.5 ? 'end' : 'start',
        x: textPoint[0],
        y: textPoint[1],
      },
    };
  });
};

export default pieSlice;
