import { createSelector } from 'reselect';

const getPanel = state => state.panel;

const GetPanel = createSelector(
  [getPanel],
  panel => (
    panel
  ),
);

export default GetPanel;
