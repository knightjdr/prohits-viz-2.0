import { TabSelector, TabSelectorProp } from './tab-selector';

const state = {
  tabs: {
    available: ['test'],
    selected: 'test',
  },
};

describe('Tab selector', () => {
  it('should return tab state', () => {
    expect(TabSelector(state)).toEqual(state.tabs);
  });

  it('should return a specific prop from tab state', () => {
    expect(TabSelectorProp(state, 'selected')).toBe('test');
  });
});
