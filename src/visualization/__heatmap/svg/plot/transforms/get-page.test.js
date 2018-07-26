import GetPage from './get-page';

const gradient = ['#fff'];
const range = jest.fn();
range.mockReturnValue(0);

const dimensions = {
  pageX: 2,
  pageY: 2,
}
const position = {
  x: 0,
  y: 0,
};
const rows = {
  list: [
    {
      data: [{ value: 0 }, { value: 1 }, { value: 2 }],
      name: 'a',
    },
    {
      data: [{ value: 3 }, { value: 4 }, { value: 5 }],
      name: 'b',
    },
    {
      data: [{ value: 6 }, { value: 7 }, { value: 8 }],
      name: 'c',
    },
  ],
};

describe('Get page', () => {
  it('should subset an array of data rows', () => {
    const expected = [
      {
        data: [{ fillColor: '#fff', value: 0 }, { fillColor: '#fff', value: 1 }],
        name: 'a',
      },
      {
        data: [{ fillColor: '#fff', value: 3 }, { fillColor: '#fff', value: 4 }],
        name: 'b',
      },
    ];
    expect(GetPage(rows.list, position, dimensions, gradient, range)).toEqual(expected);
  });
});
