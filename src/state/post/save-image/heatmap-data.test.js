import heatmapData from './heatmap-data';

const state = {
  annotations: {},
  columns: { names: ['a', 'b', 'c'] },
  customize: [{
    columns: { names: ['d', 'e', 'f'] },
    rows: {
      list: [
        { data: {}, name: 'u' },
        { data: {}, name: 'v' },
        { data: {}, name: 'w' },
      ],
    },
  }],
  markers: {},
  parameters: { scoreType: 'lte' },
  rows: {
    list: [
      { data: {}, name: 'x' },
      { data: {}, name: 'y' },
      { data: {}, name: 'z' },
    ],
  },
  settings: {
    current: {
      abundanceCap: 50,
      edgeColor: 'blueBlack',
      fillColor: 'blueBlack',
      imageType: 'dotplot',
      invertColor: false,
      primaryFilter: 0.01,
      secondaryFilter: 0.05,
    },
  },
  tabs: { selected: 'main' },
};
const getState = tab => () => ({
  ...state,
  tabs: { selected: tab },
});

describe('Getting store data for saving', () => {
  it('should return main image data', () => {
    const currentState = getState('main');
    const expected = {
      abundanceCap: 50,
      annotations: {},
      columns: ['a', 'b', 'c'],
      edgeColor: 'blueBlack',
      fillColor: 'blueBlack',
      imageType: 'dotplot',
      invertColor: false,
      markers: {},
      primaryFilter: 0.01,
      rows: [
        { data: {}, name: 'x' },
        { data: {}, name: 'y' },
        { data: {}, name: 'z' },
      ],
      secondaryFilter: 0.05,
      scoreType: 'lte',
    };
    expect(heatmapData(currentState)).toEqual(expected);
  });

  it('should return customize image data', () => {
    const currentState = getState('customize');
    const expected = {
      abundanceCap: 50,
      annotations: {},
      columns: ['d', 'e', 'f'],
      edgeColor: 'blueBlack',
      fillColor: 'blueBlack',
      imageType: 'dotplot',
      invertColor: false,
      markers: {},
      primaryFilter: 0.01,
      rows: [
        { data: {}, name: 'u' },
        { data: {}, name: 'v' },
        { data: {}, name: 'w' },
      ],
      secondaryFilter: 0.05,
      scoreType: 'lte',
    };
    expect(heatmapData(currentState)).toEqual(expected);
  });
});
