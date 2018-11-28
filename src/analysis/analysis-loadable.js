import Loadable from 'react-loadable';

import Loading from '../components/loading/loading';

const AnalysisLoadable = Loadable({
  loader: () => import('./analysis'),
  loading: Loading,
  delay: 500,
});

export default AnalysisLoadable;
