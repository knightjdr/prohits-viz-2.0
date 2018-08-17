import * as analysisActions from '../set/analysis/viz-analysis-actions';
import * as tabActions from '../set/visualization/tab-actions';

export const getSelected = (columns, rows) => (
  [...new Set([...columns, ...rows])]
);

const performVizAnalysis = () => (
  (dispatch, getState) => {
    const {
      genes,
      session,
      vizanalysis,
      vizanalysisform,
    } = getState();
    const { type } = vizanalysis;

    // Get selected genes.
    const query = getSelected(genes.columnsSelected, genes.rowsSelected);

    // If there are no selected genes, do nothing.
    if (query.length === 0) {
      return null;
    }

    // Run and add tab.
    dispatch(analysisActions.runAnalysis(type));
    dispatch(tabActions.addTab(type));

    // Set body.
    const body = {
      ...vizanalysisform[type],
      query,
    };

    // Set headers.
    const headers = new Headers();
    headers.append('accept', 'application/json');
    headers.append('content-type', 'application/json');
    headers.append('session', session);
    const url = `${process.env.REACT_APP_API_ROOT}/analysis/viz/${type}`;
    return fetch(url, {
      cache: 'no-store',
      body: JSON.stringify(body),
      headers,
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
      })
      .catch(() => {
        dispatch(analysisActions.analysisError(type));
      });
  }
);

export default performVizAnalysis;
