import percToCoord from '../helpers/percent-to-coordinate';
import roundNearest from '../../../../helpers/round-nearest';

/* The plot is being rotated -90 in main-segcircle-svg, so the "x" and
** and "y" here are reversed. I'm intentionaly leaving it like this
** because it makes calculating the text positions easier. */
const textPosition = (data, radius) => {
  let cumulativePercent = 0;
  const percent = roundNearest(1 / data.length, 0.0001);
  const halfPercent = percent / 2;
  return data.map(() => {
    cumulativePercent += percent;
    const textPoint = percToCoord(cumulativePercent - halfPercent, radius);
    return {
      x: textPoint[0],
      y: cumulativePercent < 0.25 || cumulativePercent > 0.75
        ? textPoint[1] - 8
        : textPoint[1] + 8,
      yOffset: cumulativePercent > 0.5,
    };
  });
};

export default textPosition;
