import IsJson from './is-json';

describe('IsJson', () => {
  test('Valid JSON should return json', () => {
    const json = {
      a: 'b',
      c: 'd',
    };
    const jsonString = '{"a": "b", "c": "d"}';
    expect(IsJson(jsonString)).toEqual(json);
  });

  test('Non-exception-throwing cases with JSON.parse should return false', () => {
    expect(IsJson(false)).toBeFalsy();
    expect(IsJson(1234)).toBeFalsy();
    expect(IsJson(null)).toBeFalsy();
  });

  test('Invalid json string', () => {
    const jsonString = '{"a": "b", "c": "d"';
    expect(IsJson(jsonString)).toBeFalsy();
  });
});
