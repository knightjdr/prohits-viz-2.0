import Loadable from 'react-loadable';

import Loading from '../components/loading/loading';

const AnalysisLoadable = Loadable({
  loader: () => import('./analysis'),
  loading: Loading,
  delay: process.env.REACT_APP_LOADABLE_DELAY,
});

export default AnalysisLoadable;
