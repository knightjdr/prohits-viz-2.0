import Loadable from 'react-loadable';

import Loading from '../components/loading/loading';

const VisualizationLoadable = Loadable({
  loader: () => import('./visualization'),
  loading: Loading,
  delay: process.env.REACT_APP_LOADABLE_DELAY,
});

export default VisualizationLoadable;
