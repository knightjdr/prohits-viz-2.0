import heatmap from './fill__heatmap';

import * as annotations from '../../state/set/visualization/annotation-reducer';
import * as customize from '../../state/set/analysis/customize/data-reducer';
import * as go from '../../state/set/analysis/go-reducer';
import * as markers from '../../state/set/visualization/marker-reducer';
import * as panel from '../../state/set/visualization/panel-reducer';
import * as position from '../../state/set/visualization/position-reducer';
import * as search from '../../state/set/visualization/search-reducer';
import * as settings from '../../state/set/visualization/settings-reducer';
import * as tabs from '../../state/set/visualization/tab-reducer';
import * as vizanalysis from '../../state/set/analysis/viz-analysis-reducer';
import * as vizanalysisform from '../../state/set/analysis/viz-analysis-form-reducer';

const file = {
  columns: {
    names: ['a', 'b', 'c'],
    ref: null,
  },
  parameters: {
    imageType: 'heatmap',
  },
  rows: {
    list: [
      { data: [{ value: 1 }, { value: 2 }, { value: 3 }], name: 'x' },
      { data: [{ value: 4 }, { value: 5 }, { value: 6 }], name: 'y' },
      { data: [{ value: 7 }, { value: 8 }, { value: 9 }], name: 'z' },
    ],
  },
};
const expected = {
  annotations: annotations.defaultState,
  customize: customize.defaultState,
  columns: file.columns,
  genes: {
    columnMap: { a: 0, b: 1, c: 2 },
    columns: ['a', 'b', 'c'],
    columnsSelected: [],
    rowMap: { x: 0, y: 1, z: 2 },
    rows: ['x', 'y', 'z'],
    rowsSelected: [],
  },
  go: go.defaultState,
  markers: markers.defaultState,
  minimap: {
    image: null,
    syncImage: null,
    synced: true,
  },
  panel: panel.defaultState,
  parameters: {
    abundanceColumn: 'Abundance',
    imageType: 'heatmap',
    name: 'name',
    scoreColumn: 'Score',
    scoreType: 'lte',
  },
  position: position.defaultState,
  positionCustomize: position.defaultState,
  rows: {
    direction: null,
    id: null,
    list: file.rows.list,
    order: ['x', 'y', 'z'],
    sortBy: null,
  },
  save: {
    imageType: 'svg',
    name: '',
  },
  search: search.defaultState,
  settings: {
    current: settings.defaultState,
  },
  tabs: tabs.defaultState,
  vizanalysis: vizanalysis.defaultState,
  vizanalysisform: vizanalysisform.defaultState,
};

describe('Fill heatmap', () => {
  it('should return default values for file', () => {
    expect(heatmap('name', file)).toEqual(expected);
  });
});
