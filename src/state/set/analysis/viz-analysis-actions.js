export const RUN_VIZ_ANALYSIS = 'RUN_VIZ_ANALYSIS';
export const SET_VIZ_ANALYSIS_TYPE = 'SET_VIZ_ANALYSIS_TYPE';
export const VIZ_ANALYSIS_ERROR = 'VIZ_ANALYSIS_ERROR';

export const analysisError = analysisType => ({
  analysisType,
  type: VIZ_ANALYSIS_ERROR,
});

export const runAnalysis = analysisType => ({
  analysisType,
  type: RUN_VIZ_ANALYSIS,
});

export const setAnalysisType = analysisType => ({
  analysisType,
  type: SET_VIZ_ANALYSIS_TYPE,
});
