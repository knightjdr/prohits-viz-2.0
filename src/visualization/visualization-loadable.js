import Loadable from 'react-loadable';

import Loading from '../components/loading/loading';

const VisualizationLoadable = Loadable({
  loader: () => import('./visualization'),
  loading: Loading,
  delay: 500,
});

export default VisualizationLoadable;
