import { createSelector } from 'reselect';

const getGenes = state => state.genes;

const GetGenes = createSelector(
  [getGenes],
  genes => (
    genes
  ),
);
export default GetGenes;
