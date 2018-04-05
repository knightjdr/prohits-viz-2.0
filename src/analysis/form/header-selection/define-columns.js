import FilterHeader from './filter-header';

/* Returns a list of suggested and other headers, along with an initial value
** for the abundance, bait, prey and score columns. */

export const recommendedHeaders = {
  dotplot: {
    saint: {
      abundance: ['avgspec', 'specsum', 'avgintensity', 'intensitysum'],
      bait: ['bait', 'baits'],
      prey: ['preygene', 'prey', 'preygenes', 'preys'],
      score: ['bfdr', 'fdr', 'saintscore', 'avgp', 'maxp'],
    },
  },
};

const DefineColumns = (analysisType, fileType, header) => ({
  abundance: FilterHeader(
    recommendedHeaders[analysisType][fileType].abundance,
    header,
  ),
  bait: FilterHeader(
    recommendedHeaders[analysisType][fileType].bait,
    header,
  ),
  prey: FilterHeader(
    recommendedHeaders[analysisType][fileType].prey,
    header,
  ),
  score: FilterHeader(
    recommendedHeaders[analysisType][fileType].score,
    header,
  ),
});
export default DefineColumns;
