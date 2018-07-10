import { createSelector } from 'reselect';

const getParameters = state => state.parameters;

const GetParameters = createSelector(
  [getParameters],
  parameters => (
    parameters
  ),
);
export default GetParameters;
