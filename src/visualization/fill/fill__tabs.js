import { defaultState } from '../../state/set/visualization/tab-reducer';

const acceptedTabs = ['main', 'customize', 'domain', 'go', 'network'];

const fillTabs = (userTabs = {}) => {
  const tabs = {};

  const {
    available,
    selected,
    show,
  } = userTabs;

  tabs.available = Array.isArray(available) && available.includes('main') ?
    available : defaultState.available;
  tabs.selected = acceptedTabs.includes(selected) && tabs.available.includes(selected) ?
    selected : defaultState.selected;
  tabs.show = typeof show === 'boolean' ? show : defaultState.show;

  return tabs;
};

export default fillTabs;
