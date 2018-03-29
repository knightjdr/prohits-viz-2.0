import ParseString from './parse-string';

const csv = {
  parsed: ['a', 'b', 'c'],
  string: 'a,b,c',
};
const tab = {
  parsed: ['a', 'b', 'c'],
  string: 'a\tb\tc',
};

describe('ParseString', () => {
  test('No specified type should return original string', () => {
    expect(ParseString(csv.string)).toEqual(csv.string);
  });

  test('CSV-separated string with type text/csv', () => {
    expect(ParseString(csv.string, 'text/csv')).toEqual(csv.parsed);
  });

  test('CSV-separated string with wrong type', () => {
    expect(ParseString(csv.string, 'text/plain')).toEqual([csv.string]);
  });

  test(`Tab-separated string with wrong type should return original
    string in array`, () => {
    expect(ParseString(tab.string, 'text/csv')).toEqual([tab.string]);
  });

  test('Tab-separated string with type text/plain', () => {
    expect(ParseString(tab.string, 'text/plain')).toEqual(tab.parsed);
  });

  test('Tab-separated string with type text/tab-separated-values', () => {
    expect(ParseString(tab.string, 'text/tab-separated-values')).toEqual(tab.parsed);
  });
});
