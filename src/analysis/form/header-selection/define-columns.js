import FilterHeader from './filter-header';

/* Returns a list of suggested and other headers, along with an initial value
** for the abundance, condition, readout and score columns. */

export const recommendedHeaders = {
  'circ-heatmap': {
    saint: {
      abundance: ['avgspec', 'specsum', 'avgintensity', 'intensitysum'],
      condition: ['bait', 'baits'],
      readout: ['preygene', 'prey', 'preygenes', 'preys'],
      score: ['bfdr', 'fdr', 'saintscore', 'avgp', 'maxp'],
    },
  },
  dotplot: {
    saint: {
      abundance: ['avgspec', 'specsum', 'avgintensity', 'intensitysum'],
      condition: ['bait', 'baits'],
      readout: ['preygene', 'prey', 'preygenes', 'preys'],
      score: ['bfdr', 'fdr', 'saintscore', 'avgp', 'maxp'],
    },
  },
};

const DefineColumns = (analysisType, fileType, header) => ({
  abundance: FilterHeader(
    recommendedHeaders[analysisType][fileType].abundance,
    header,
  ),
  condition: FilterHeader(
    recommendedHeaders[analysisType][fileType].condition,
    header,
  ),
  readout: FilterHeader(
    recommendedHeaders[analysisType][fileType].readout,
    header,
  ),
  score: FilterHeader(
    recommendedHeaders[analysisType][fileType].score,
    header,
  ),
});
export default DefineColumns;
