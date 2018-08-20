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

    if (!type) {
      return null;
    }

    // Get columns to query and remove duplicates.
    const query = [...new Set(getSelected(genes.columnsSelected, genes.rowsSelected))];
    if (query.length === 0) {
      return null;
    }

    // Run and add tab.
    dispatch(analysisActions.runAnalysis(type));
    dispatch(tabActions.addTab(type));

    const body = {
      ...vizanalysisform[type],
      query: query.join(' '),
    };

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
