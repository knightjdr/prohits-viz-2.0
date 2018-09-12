import * as actions from './customize-actions';

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

describe('Customize selection actions', () => {
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
        columns: ['a', 'c', 'd'],
        didRemove: true,
        rows: {
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
        },
      };
      expect(actions.removeBlanks(true, columns, rows)).toEqual(expected);
    });
  });

  describe('and reset row ratios', () => {
    it('should return original list when first arg is "false"', () => {
      expect(actions.recalculateRatios(false, rows)).toEqual(rows);
    });

    it('should return updated list when first arg is "true"', () => {
      const expected = [
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
      expect(actions.recalculateRatios(true, rows.list)).toEqual(expected);
    });
  });
});
