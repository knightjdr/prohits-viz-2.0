import deepCopy from '../../../../helpers/deep-copy';

const sortAlgorithm = (byKnown) => {
  if (byKnown) {
    return (a, b, values, known) => {
      if (!known[b] && known[a]) {
        return -1;
      } if (known[b] && !known[a]) {
        return 1;
      }
      return values[b] - values[a];
    };
  }
  return (a, b, values) => values[b] - values[a];
};

const sortCircles = (circHeatmaps, sortBy, byKnown = true) => {
  const indices = Array.from(Array(circHeatmaps.readouts.length)).map((c, index) => index);
  const known = circHeatmaps.readouts.map(readout => readout.known);
  const { values } = circHeatmaps.segments[sortBy];
  const sortMethod = sortAlgorithm(byKnown);
  indices.sort((a, b) => sortMethod(a, b, values, known));
  const sortedCircles = deepCopy(circHeatmaps);
  sortedCircles.readouts = indices.map(index => circHeatmaps.readouts[index]);
  sortedCircles.segments = circHeatmaps.segments.map(segment => ({
    ...segment,
    values: indices.map(index => segment.values[index]),
  }));
  return sortedCircles;
};

export default sortCircles;
