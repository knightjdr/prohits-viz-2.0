import Loadable from 'react-loadable';

import Loading from '../components/loading/loading';

const VisualizationLoadable = Loadable({
  loader: () => import('./visualization'),
  loading: Loading,
});

export default VisualizationLoadable;
