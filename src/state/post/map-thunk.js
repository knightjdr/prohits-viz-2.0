import * as mapActions from '../set/visualization/map-actions';

export const syncMap = () => (
  (dispatch, getState) => {
    dispatch(mapActions.synchronizeMap());
    const { rows, settings } = getState();
    const {
      abundanceCap,
      edgeColor,
      fillColor,
      imageType,
      invert,
      minAbundance,
      primaryFilter,
      secondaryFilter,
    } = settings.current;
    const body = {
      abundanceCap,
      fillColor,
      invert,
      minAbundance,
      rows: rows.list.map(row => row.data),
    };
    if (imageType === 'dotplot') {
      body.imageType = 'dotplot';
      body.edgeColor = edgeColor;
      body.primaryFilter = primaryFilter;
      body.secondaryFilter = secondaryFilter;
    } else {
      body.imageType = 'heatmap';
    }
    // Set headers.
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    const url = `${process.env.REACT_APP_API_ROOT}/sync/`;
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
        dispatch(mapActions.synchError());
      });
  }
);

export default syncMap;
