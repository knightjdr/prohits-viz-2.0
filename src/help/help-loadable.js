import Loadable from 'react-loadable';

import Loading from '../components/loading/loading';

const HelpLoadable = Loadable({
  loader: () => import('./help'),
  loading: Loading,
  delay: 500,
});

export default HelpLoadable;
