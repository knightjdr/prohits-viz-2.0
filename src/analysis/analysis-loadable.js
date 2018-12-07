import Loadable from 'react-loadable';

import Loading from '../components/loading/loading';

/* Add css imports to possible landing components to ensure they render
** with the correct style immmediately */
import './form/analysis-form.css';

const AnalysisLoadable = Loadable({
  loader: () => import('./analysis'),
  loading: Loading,
  delay: process.env.REACT_APP_LOADABLE_DELAY,
});

export default AnalysisLoadable;
