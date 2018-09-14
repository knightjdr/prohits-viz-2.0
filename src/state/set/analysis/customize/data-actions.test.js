import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './data-actions';
import * as tabActions from '../../visualization/tab-actions';

// configure mock store
const mockStore = configureMockStore([thunk]);

const columns = ['a', 'b', 'c', 'd'];
const rows = {
  list: [
    {
      data: [
        { ratio: 0.25, value: 1 },
        { ratio: 0.5, value: 0 },
        { ratio: 0.75, value: 3 },
        { ratio: 1, value: 4 },
      ],
      name: 'x',
    },
    {
      data: [
        { ratio: 0.25, value: 0 },
        { ratio: 0.25, value: 0 },
        { ratio: 0.25, value: 0 },
        { ratio: 0.25, value: 0 },
      ],
      name: 'y',
    },
    {
      data: [
        { ratio: 0.25, value: 9 },
        { ratio: 0.5, value: 0 },
        { ratio: 0.75, value: 11 },
        { ratio: 0.25, value: 12 },
      ],
      name: 'z',
    },
  ],
  order: ['x', 'y', 'z'],
};
const rows2 = {
  list: [
    {
      data: [
        { ratio: 0.25, value: 1 },
        { ratio: 0.5, value: 2 },
        { ratio: 0.75, value: 3 },
        { ratio: 1, value: 4 },
      ],
      name: 'x',
    },
    {
      data: [
        { ratio: 0.25, value: 0 },
        { ratio: 0.25, value: 0 },
        { ratio: 0.25, value: 0 },
        { ratio: 0.25, value: 0 },
      ],
      name: 'y',
    },
    {
      data: [
        { ratio: 0.25, value: 9 },
        { ratio: 0.5, value: 10 },
        { ratio: 0.75, value: 11 },
        { ratio: 0.25, value: 12 },
      ],
      name: 'z',
    },
  ],
  order: ['x', 'y', 'z'],
};

// Transform data.
const emptyColumns = ['a', 'c', 'd'];
const emptyRows = {
  list: [
    {
      data: [
        { ratio: 0.25, value: 1 },
        { ratio: 0.75, value: 3 },
        { ratio: 1, value: 4 },
      ],
      name: 'x',
    },
    {
      data: [
        { ratio: 0.25, value: 9 },
        { ratio: 0.75, value: 11 },
        { ratio: 0.25, value: 12 },
      ],
      name: 'z',
    },
  ],
  order: ['x', 'z'],
};
const emptyRows2 = {
  list: [
    {
      data: [
        { ratio: 0.25, value: 1 },
        { ratio: 0.5, value: 2 },
        { ratio: 0.75, value: 3 },
        { ratio: 1, value: 4 },
      ],
      name: 'x',
    },
    {
      data: [
        { ratio: 0.25, value: 9 },
        { ratio: 0.5, value: 10 },
        { ratio: 0.75, value: 11 },
        { ratio: 0.25, value: 12 },
      ],
      name: 'z',
    },
  ],
  order: ['x', 'z'],
};
const resetRows = [
  {
    data: [
      { defaultRatio: 0.25, ratio: 0.25, value: 1 },
      { defaultRatio: 0.5, ratio: 0.5, value: 0 },
      { defaultRatio: 0.75, ratio: 0.75, value: 3 },
      { defaultRatio: 1, ratio: 1, value: 4 },
    ],
    name: 'x',
  },
  {
    data: [
      { defaultRatio: 0.25, ratio: 1, value: 0 },
      { defaultRatio: 0.25, ratio: 1, value: 0 },
      { defaultRatio: 0.25, ratio: 1, value: 0 },
      { defaultRatio: 0.25, ratio: 1, value: 0 },
    ],
    name: 'y',
  },
  {
    data: [
      { defaultRatio: 0.25, ratio: 0.33, value: 9 },
      { defaultRatio: 0.5, ratio: 0.67, value: 0 },
      { defaultRatio: 0.75, ratio: 1, value: 11 },
      { defaultRatio: 0.25, ratio: 0.33, value: 12 },
    ],
    name: 'z',
  },
];

describe('Customize data actions', () => {
  it('should dispatch an action to ADD_CUSTOMIZE_STATE', () => {
    const expectedAction = {
      columns: [],
      removeEmpty: true,
      resetMaximums: true,
      rows: [],
      type: actions.ADD_CUSTOMIZE_STATE,
    };
    expect(actions.addCustomizeState([], [], true, true)).toEqual(expectedAction);
  });

  it('should dispatch an action to REPLACE_CUSTOMIZE_STATE', () => {
    const expectedAction = {
      columns: [],
      removeEmpty: true,
      resetMaximums: true,
      rows: [],
      type: actions.REPLACE_CUSTOMIZE_STATE,
    };
    expect(actions.replaceCustomizeState([], [], true, true)).toEqual(expectedAction);
  });

  it('should dispatch an action to RESET_CUSTOMIZE_STATE', () => {
    const expectedAction = {
      type: actions.RESET_CUSTOMIZE_STATE,
    };
    expect(actions.resetCustomizeState([], [], true, true)).toEqual(expectedAction);
  });

  it('should dispatch an action to SET_CUSTOMIZE_STATE', () => {
    const expectedAction = {
      columns: [],
      removeEmpty: true,
      resetMaximums: true,
      rows: [],
      type: actions.SET_CUSTOMIZE_STATE,
    };
    expect(actions.setCustomizeState([], [], true, true)).toEqual(expectedAction);
  });

  it('should dispatch an action to UNDO_CUSTOMIZE_STATE', () => {
    const expectedAction = {
      type: actions.UNDO_CUSTOMIZE_STATE,
    };
    expect(actions.undoCustomizeState([], [], true, true)).toEqual(expectedAction);
  });

  it('should filter a row list', () => {
    const genes = {
      columnsSelected: ['a', 'd'],
      rowsSelected: ['x', 'z'],
    };
    const expected = [
      {
        data: [{ ratio: 0.25, value: 1 }, { ratio: 1, value: 4 }],
        name: 'x',
      },
      {
        data: [{ ratio: 0.25, value: 9 }, { ratio: 0.25, value: 12 }],
        name: 'z',
      },
    ];
    const filtered = actions.filterRows(columns, rows, genes.columnsSelected, genes.rowsSelected);
    expect(filtered).toEqual(expected);
  });

  describe('and remove empty rows and columns', () => {
    it('should return original state when first arg is "false"', () => {
      const expected = {
        columns,
        rows: {
          list: rows.list,
          order: ['x', 'y', 'z'],
        },
      };
      expect(actions.removeBlanks(false, columns, rows)).toEqual(expected);
    });

    it('should return updated list when first arg is "true"', () => {
      const expected = {
        columns: emptyColumns,
        didRemove: true,
        rows: emptyRows,
      };
      expect(actions.removeBlanks(true, columns, rows)).toEqual(expected);
    });

    it('should return updated list when only remove rows', () => {
      const expected = {
        columns,
        didRemove: true,
        rows: emptyRows2,
      };
      expect(actions.removeBlanks(true, columns, rows2)).toEqual(expected);
    });
  });

  describe('and recalculate row ratios', () => {
    it('should return original list when first arg is "false"', () => {
      expect(actions.recalculateRatios(false, rows)).toEqual(rows);
    });

    it('should return updated list when first arg is "true"', () => {
      const expected = resetRows;
      expect(actions.recalculateRatios(true, rows.list)).toEqual(expected);
    });
  });

  describe('and reset row ratios', () => {
    it('should return original list', () => {
      const current = [
        {
          data: [
            { defaultRatio: 0.25, ratio: 0.25, value: 1 },
            { defaultRatio: 0.5, ratio: 0.5, value: 0 },
            { defaultRatio: 0.75, ratio: 0.75, value: 3 },
            { defaultRatio: 1, ratio: 1, value: 4 },
          ],
          name: 'x',
        },
        {
          data: [
            { defaultRatio: 0.25, ratio: 1, value: 0 },
            { defaultRatio: 0.25, ratio: 1, value: 0 },
            { defaultRatio: 0.25, ratio: 1, value: 0 },
            { defaultRatio: 0.25, ratio: 1, value: 0 },
          ],
          name: 'y',
        },
        {
          data: [
            { defaultRatio: 0.25, ratio: 0.33, value: 9 },
            { defaultRatio: 0.5, ratio: 0.67, value: 0 },
            { defaultRatio: 0.75, ratio: 1, value: 11 },
            { defaultRatio: 0.25, ratio: 0.33, value: 12 },
          ],
          name: 'z',
        },
      ];
      expect(actions.restoreRatios(current)).toEqual(rows.list);
    });
  });

  describe('when updating an image', () => {
    describe('where the settings do not change', () => {
      let dispatcedActions;

      beforeAll(() => {
        const store = mockStore({});
        store.dispatch(actions.updateImage(
          {
            removeEmpty: false,
            resetMaximums: false,
          },
          false,
          false,
        ));
        dispatcedActions = store.getActions();
      });

      it('should not dispatch any actions', () => {
        expect(dispatcedActions.length).toBe(0);
      });
    });

    describe('to remove empty rows and columns', () => {
      let dispatcedActions;

      beforeAll(() => {
        const store = mockStore({});
        store.dispatch(actions.updateImage(
          {
            columns: {
              names: columns,
              ref: null,
            },
            removeEmpty: false,
            resetMaximums: false,
            rows,
          },
          true,
          false,
        ));
        dispatcedActions = store.getActions();
      });

      it('should dispatch add state action', () => {
        expect(dispatcedActions).toContainEqual({
          columns: emptyColumns,
          removeEmpty: true,
          resetMaximums: false,
          rows: emptyRows,
          type: actions.ADD_CUSTOMIZE_STATE,
        });
      });
    });

    describe('to reset row ratios', () => {
      let dispatcedActions;

      beforeAll(() => {
        const store = mockStore({});
        store.dispatch(actions.updateImage(
          {
            columns: {
              names: columns,
              ref: null,
            },
            removeEmpty: false,
            resetMaximums: false,
            rows,
          },
          false,
          true,
        ));
        dispatcedActions = store.getActions();
      });

      it('should dispatch replace state action', () => {
        expect(dispatcedActions).toContainEqual({
          columns,
          removeEmpty: false,
          resetMaximums: true,
          rows: {
            ...rows,
            list: resetRows,
          },
          type: actions.REPLACE_CUSTOMIZE_STATE,
        });
      });
    });

    describe('to restore row ratios', () => {
      let dispatcedActions;

      beforeAll(() => {
        const store = mockStore({});
        store.dispatch(actions.updateImage(
          {
            columns: {
              names: columns,
              ref: null,
            },
            removeEmpty: false,
            resetMaximums: true,
            rows: {
              ...rows,
              list: resetRows,
            },
          },
          false,
          false,
        ));
        dispatcedActions = store.getActions();
      });

      it('should dispatch replace state action', () => {
        expect(dispatcedActions).toContainEqual({
          columns,
          removeEmpty: false,
          resetMaximums: false,
          rows,
          type: actions.REPLACE_CUSTOMIZE_STATE,
        });
      });
    });
  });

  describe('when customizing an image', () => {
    describe('where there are not selected genes', () => {
      let dispatcedActions;

      beforeAll(() => {
        const state = {
          genes: {
            columnsSelected: [],
            rowsSelected: [],
          },
          vizanalysisform: {
            customize: {
              removeEmpty: false,
              resetMaximums: false,
            },
          },
        };
        const store = mockStore(state);
        store.dispatch(actions.customizeImage());
        dispatcedActions = store.getActions();
      });

      it('should not dispatch any actions', () => {
        expect(dispatcedActions.length).toBe(0);
      });
    });

    describe('where there are selected genes', () => {
      let dispatcedActions;

      beforeAll(() => {
        const state = {
          columns: {
            names: columns,
          },
          genes: {
            columnsSelected: ['a', 'b', 'c', 'd'],
            rowsSelected: ['x', 'y', 'z'],
          },
          rows,
          vizanalysisform: {
            customize: {
              removeEmpty: true,
              resetMaximums: false,
            },
          },
        };
        const store = mockStore(state);
        store.dispatch(actions.customizeImage());
        dispatcedActions = store.getActions();
      });

      it('should dispatch an action to add a tab', () => {
        expect(dispatcedActions).toContainEqual({
          tab: 'customize',
          type: tabActions.ADD_TAB,
        });
      });

      it('should dispatch a set state action', () => {
        expect(dispatcedActions).toContainEqual({
          columns: emptyColumns,
          removeEmpty: true,
          resetMaximums: false,
          rows: emptyRows,
          type: actions.SET_CUSTOMIZE_STATE,
        });
      });
    });
  });
});
