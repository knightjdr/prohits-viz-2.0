import * as actions from './viz-analysis-form-actions';

export const initState = {
  go: {
    advanced_options_on: true,
    domain_size_type: 'annotated',
    hierfiltering: '',
    max_set_size: undefined,
    min_isect_size: undefined,
    min_set_size: undefined,
    no_iea: false,
    ordered_query: false,
    organism: 'hsapiens',
    output: 'mini',
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
