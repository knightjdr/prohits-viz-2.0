import Loadable from 'react-loadable';

import Loading from '../components/loading/loading';

/* Add css imports to possible landing components to ensure they render
** with the correct style immmediately */
import './help.css';

const HelpLoadable = Loadable({
  loader: () => import('./help'),
  loading: Loading,
  delay: process.env.REACT_APP_LOADABLE_DELAY,
});

export default HelpLoadable;
