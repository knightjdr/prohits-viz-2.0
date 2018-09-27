import { defaultState } from '../../../state/set/visualization/tab-reducer';

const acceptedTabs = ['main', 'customize', 'go'];

const fillTabs = (userTabs) => {
  const tabs = {};

  const {
    available,
    selected,
  } = userTabs;

  tabs.available = Array.isArray(available) && available.includes('main') ?
    available
    : defaultState.available;
  tabs.selected = acceptedTabs.includes(selected) ? selected : defaultState.selected;

  return tabs;
};

export default fillTabs;
