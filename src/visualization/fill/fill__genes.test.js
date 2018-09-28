import fillGenes from './fill__genes';
import mapArr from '../../helpers/map-array';

jest.mock('../../helpers/map-array');

const columns = {
  names: ['a', 'b', 'c'],
};
const rows = {
  list: [
    { name: 'x' },
    { name: 'y' },
    { name: 'z' },
  ],
};

const expected = {
  columnMap: { a: 0, b: 1, c: 2 },
  columns: ['a', 'b', 'c'],
  columnsSelected: [],
  rowMap: { x: 0, y: 1, z: 2 },
  rows: ['x', 'y', 'z'],
  rowsSelected: [],
};

describe('Fill genes', () => {
  it('should generate column and row values when gene object is undefined', () => {
    mapArr.mockReturnValueOnce({ a: 0, b: 1, c: 2 });
    mapArr.mockReturnValueOnce({ x: 0, y: 1, z: 2 });
    expect(fillGenes(columns, undefined, rows)).toEqual(expected);
  });

  describe('columns', () => {
    beforeAll(() => {
      mapArr.mockReturnValue({ a: 0, b: 1, c: 2 });
    });

    it('should return user input when valid', () => {
      const user = expected;
      expect(fillGenes(columns, user, rows)).toEqual(expected);
    });

    it('should generate column values when columns value is not an array', () => {
      const user = {
        ...expected,
        columns: {},
      };
      expect(fillGenes(columns, user, rows)).toEqual(expected);
    });

    it('should generate column values when columnMap is not an object', () => {
      const user = {
        ...expected,
        columnMap: [],
      };
      expect(fillGenes(columns, user, rows)).toEqual(expected);
    });

    it('should generate column values when columnMap does not match columns', () => {
      const user = {
        ...expected,
        columnMap: { a: 0, b: 1, d: 2 },
      };
      expect(fillGenes(columns, user, rows)).toEqual(expected);
    });

    it('should generate column values when columnsSelected is not an array', () => {
      const user = {
        ...expected,
        columnsSelected: {},
      };
      expect(fillGenes(columns, user, rows)).toEqual(expected);
    });

    it('should generate column values when columnsSelected values are not found in columns', () => {
      const user = {
        ...expected,
        columnsSelected: ['d'],
      };
      expect(fillGenes(columns, user, rows)).toEqual(expected);
    });
  });

  describe('rows', () => {
    beforeAll(() => {
      mapArr.mockReturnValue({ x: 0, y: 1, z: 2 });
    });

    it('should return user input when valid', () => {
      const user = expected;
      expect(fillGenes(columns, user, rows)).toEqual(expected);
    });

    it('should generate row values when rows value is not an array', () => {
      const user = {
        ...expected,
        rows: {},
      };
      expect(fillGenes(columns, user, rows)).toEqual(expected);
    });

    it('should generate row values when rowMap is not an object', () => {
      const user = {
        ...expected,
        rowMap: [],
      };
      expect(fillGenes(columns, user, rows)).toEqual(expected);
    });

    it('should generate row values when rowMap does not match columns', () => {
      const user = {
        ...expected,
        rowMap: { x: 0, y: 1, d: 2 },
      };
      expect(fillGenes(columns, user, rows)).toEqual(expected);
    });

    it('should generate row values when rowsSelected is not an array', () => {
      const user = {
        ...expected,
        rowsSelected: {},
      };
      expect(fillGenes(columns, user, rows)).toEqual(expected);
    });

    it('should generate row values when rowSelected values are not found in columns', () => {
      const user = {
        ...expected,
        rowsSelected: ['d'],
      };
      expect(fillGenes(columns, user, rows)).toEqual(expected);
    });
  });
});
