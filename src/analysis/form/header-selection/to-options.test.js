import ToOptions from './to-options';

jest.mock('../../../helpers/sort-array-strings');

const expectedOptionsComponent = [
  {
    group: true,
    text: 'Suggested',
    children: [
      { text: 'column1', value: 'column1' },
      { text: 'column2', value: 'column2' },
    ],
  },
  {
    group: true,
    text: 'Other',
    children: [
      { text: 'column3', value: 'column3' },
      { text: 'column4', value: 'column4' },
    ],
  },
];
const other = ['column3', 'column4'];
const suggested = ['column1', 'column2'];

describe('ToOptionsComponent', () => {
  test('Returns grouped options components', () => {
    expect(ToOptions(suggested, other)).toEqual(expectedOptionsComponent);
  });

  test('Returns only Other when no suggested', () => {
    expect(ToOptions([], other)).toEqual([expectedOptionsComponent[1]]);
  });

  test('Returns only Suggested when no other', () => {
    expect(ToOptions(suggested, [])).toEqual([expectedOptionsComponent[0]]);
  });
});
