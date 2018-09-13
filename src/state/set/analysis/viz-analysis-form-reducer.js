import * as actions from './viz-analysis-form-actions';
import * as fileActions from '../interactive-file-actions';

export const initState = {
  customize: {
    deleteBy: undefined,
    orderBy: undefined,
    removeEmpty: false,
    resetMaximums: false,
  },
  go: {
    domain_size_type: 'annotated',
    hierfiltering: '',
    max_set_size: undefined,
    min_isect_size: undefined,
    min_set_size: undefined,
    no_iea: false,
    ordered_query: false,
    organism: 'hsapiens',
    region_query: false,
    sf_CORUM: true,
    sf_GO: true,
    sf_HP: true,
    sf_KEGG: true,
    sf_MI: true,
    sf_REAC: true,
    sf_TF: true,
    'sf_GO:BP': true,
    'sf_GO:CC': true,
    'sf_GO:MF': true,
    significant: true,
    sort_by_structure: true,
    threshold_algo: 'analytical',
    underrep: false,
    user_thr: 1,
  },
};

const VizAnalysisForms = (state = initState, action) => {
  switch (action.type) {
    case fileActions.PARSE_INTERACTIVE_FILE:
      return { ...action.file.vizanalysisform };
    case actions.SET_CUSTOMIZE_PARAMETER: {
      return {
        ...state,
        customize: {
          ...state.customize,
          ...action.setting,
        },
      };
    }
    case actions.SET_GO_PARAMETER: {
      return {
        ...state,
        go: {
          ...state.go,
          ...action.setting,
        },
      };
    }
    default:
      return state;
  }
};

export default VizAnalysisForms;
