import Loadable from 'react-loadable';

import Loading from '../components/loading/loading';

/* Add css imports to possible landing components to ensure they render
** with the correct style immmediately */
import './__select/visualization__select.css';
import './__display/image/image.css';

const VisualizationLoadable = Loadable({
  loader: () => import('./visualization'),
  loading: Loading,
  delay: process.env.REACT_APP_LOADABLE_DELAY,
});

export default VisualizationLoadable;
