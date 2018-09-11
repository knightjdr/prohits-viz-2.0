export const SET_CUSTOMIZE_PARAMETER = 'SET_CUSTOMIZE_PARAMETER';
export const SET_GO_PARAMETER = 'SET_GO_PARAMETER';

export const setCustomizeParameters = setting => ({
  setting,
  type: SET_CUSTOMIZE_PARAMETER,
});

export const setGoParameters = setting => ({
  setting,
  type: SET_GO_PARAMETER,
});
