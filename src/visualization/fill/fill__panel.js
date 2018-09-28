import { defaultState } from '../../state/set/visualization/panel-reducer';

const fillPanel = userPanel => (
  typeof userPanel === 'boolean' ? userPanel : defaultState
);

export default fillPanel;
