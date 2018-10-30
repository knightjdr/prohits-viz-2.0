import { tabSelector, tabSelectorProp } from './tab-selector';

const state = {
  tabs: {
    available: ['test'],
    selected: 'test',
  },
};

describe('Tab selector', () => {
  it('should return tab state', () => {
    expect(tabSelector(state)).toEqual(state.tabs);
  });

  it('should return a specific prop from tab state', () => {
    expect(tabSelectorProp(state, 'selected')).toBe('test');
  });
});
