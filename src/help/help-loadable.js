import Loadable from 'react-loadable';

import Loading from '../components/loading/loading';

const HelpLoadable = Loadable({
  loader: () => import('./help'),
  loading: Loading,
  delay: process.env.REACT_APP_LOADABLE_DELAY,
});

export default HelpLoadable;
