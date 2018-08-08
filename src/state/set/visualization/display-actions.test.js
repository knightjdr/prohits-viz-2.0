import * as actions from './display-actions';

describe('Display set actions', () => {
  it('should dispatch an action to change panel tab', () => {
    const expectedAction = {
      tab: 'map',
      type: actions.CHANGE_PANEL_TAB,
    };
    expect(actions.changePanelTab('map')).toEqual(expectedAction);
  });

  it('should dispatch an action to reset map position', () => {
    const expectedAction = {
      type: actions.RESET_MAP_POSITION,
    };
    expect(actions.resetMapPosition()).toEqual(expectedAction);
  });

  it('should dispatch an action to toggle selection box', () => {
    const expectedAction = {
      type: actions.TOGGLE_SELECTION_BOX,
    };
    expect(actions.toggleSelectionBox()).toEqual(expectedAction);
  });

  it('should dispatch an action to toggle tooltips', () => {
    const expectedAction = {
      type: actions.TOGGLE_TOOLTIPS,
    };
    expect(actions.toggleTooltips()).toEqual(expectedAction);
  });

  it('should dispatch an action to update map position', () => {
    const expectedAction = {
      right: 100,
      top: 200,
      type: actions.UPDATE_MAP_POSITION,
    };
    expect(actions.updateMapPosition(100, 200)).toEqual(expectedAction);
  });

  it('should dispatch an action to update plot position', () => {
    const expectedAction = {
      fixed: true,
      translate: -200,
      type: actions.UPDATE_PLOT_POSITION,
    };
    expect(actions.updatePlotPosition(true, -200)).toEqual(expectedAction);
  });
});
