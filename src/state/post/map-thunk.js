import * as mapActions from '../set/visualization/map-actions';

const syncMap = (updateOriginal = false) => (
  (dispatch, getState) => {
    dispatch(mapActions.synchronizeMap(updateOriginal));
    const {
      parameters,
      rows,
      session,
      settings,
    } = getState();
    const {
      abundanceCap,
      edgeColor,
      fillColor,
      imageType,
      invertColor,
      primaryFilter,
      secondaryFilter,
    } = settings.current;
    const { scoreType } = parameters;
    const body = {
      abundanceCap,
      fillColor,
      invertColor,
      rows: rows.list,
      scoreType,
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
    headers.append('accept', 'application/json');
    headers.append('content-type', 'application/json');
    headers.append('session', session);
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
