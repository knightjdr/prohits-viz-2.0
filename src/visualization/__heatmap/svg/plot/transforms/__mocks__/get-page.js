const getPage = jest.fn().mockImplementation(
  () => () => ([
    { data: [{ value: 1 }, { value: 2 }, { value: 3 }], name: 'a' },
    { data: [{ value: 4 }, { value: 5 }, { value: 6 }], name: 'b' },
    { data: [{ value: 7 }, { value: 8 }, { value: 9 }], name: 'c' },
  ]),
);

export default getPage;
