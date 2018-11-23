import Loadable from 'react-loadable';

import Loading from '../components/loading/loading';

const AnalysisLoadable = Loadable({
  loader: () => import('./analysis'),
  loading: Loading,
});

export default AnalysisLoadable;
