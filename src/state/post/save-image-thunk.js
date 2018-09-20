export const SAVE_ERROR = 'SAVE_ERROR';
export const SAVE_IMAGE = 'SAVE_IMAGE';
export const SAVING_IMAGE = 'SAVING_IMAGE';

export const saveError = () => ({
  type: 'SAVE_ERROR',
});

export const savingImage = () => ({
  type: 'SAVING_IMAGE',
});

/* Get dotplot/heatmap data, either from main or customize view
** depending on which tab is active. */
export const heatmapData = (state) => {
  const {
    annotations,
    markers,
    parameters,
    settings,
    tabs,
  } = state();
  const activeTab = tabs.selected;
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
  const data = {
    abundanceCap,
    annotationFontSize: annotations.fontSize,
    annotations: annotations.list,
    edgeColor,
    fillColor,
    imageType,
    invertColor,
    markerColor: markers.color,
    markers: markers.list,
    primaryFilter,
    scoreType,
    secondaryFilter,
  };
  if (activeTab === 'main') {
    const { columns, rows } = state();
    data.columns = columns.names;
    data.rows = rows.list;
  } else {
    const { customize } = state();
    data.columns = customize[customize.length - 1].columns.names;
    data.rows = customize[customize.length - 1].rows.list;
  }
  return data;
};

/* Determing type of data to send for saving. */
export const imageData = (imageType, state) => {
  let data = {};
  if (
    imageType === 'dotplot' ||
    imageType === 'heatmap'
  ) {
    data = heatmapData(state);
  }
  return data;
};

export const saveImage = () => (
  (dispatch, getState) => {
    dispatch(savingImage());
    const { save, session, settings } = getState();
    const { imageType } = settings.current;
    const data = imageData(imageType, getState);
    data.outputType = save.imageType;
    // Set headers.
    const headers = new Headers();
    headers.append('accept', 'application/json');
    headers.append('content-type', 'application/json');
    headers.append('session', session);
    const url = `${process.env.REACT_APP_API_ROOT}/export/${imageType}`;
    return fetch(url, {
      cache: 'no-store',
      body: JSON.stringify(data),
      headers,
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
      })
      .catch(() => {
        dispatch(saveError());
      });
  }
);
