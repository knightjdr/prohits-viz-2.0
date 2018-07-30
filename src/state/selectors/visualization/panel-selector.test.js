import PanelSelector from './panel-selector';

describe('Panel selector', () => {
  it('should return panel visibility state', () => {
    const state = {
      panel: false,
    };
    expect(PanelSelector(state)).toBeFalsy();
  });
});
