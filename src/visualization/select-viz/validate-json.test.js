import ValidateJson from './validate-json';

describe('ValidateJson', () => {
  test('Invalid JSON should return error', () => {
    const json = ValidateJson(1234);
    expect(json.err).toBeTruthy();
    expect(json.message).toBe('Invalid file format');
  });

  test('Missing params prop or params not equal to an object returns an error', () => {
    // Missing "params" property.
    let jsonString = '{}';
    let json = ValidateJson(jsonString);
    expect(json.err).toBeTruthy();
    expect(json.message).toBe('The JSON object must have a "params" property with an object containing analysis parameters');

    // "params" value is not an object.
    jsonString = '{"params": []}';
    json = ValidateJson(jsonString);
    expect(json.err).toBeTruthy();
    expect(json.message).toBe('The JSON object must have a "params" property with an object containing analysis parameters');
  });

  test('Missing or unsupported analysis type returns an error', () => {
    // Missing analysisType.
    let jsonString = '{"params": {}}';
    let json = ValidateJson(jsonString);
    expect(json.err).toBeTruthy();
    expect(json.message).toBe('The analysis type must be specified in the params object and be of a supported type');

    // Unsupported analysisType.
    jsonString = '{"params": {"analysisType": "something"}}';
    json = ValidateJson(jsonString);
    expect(json.err).toBeTruthy();
    expect(json.message).toBe('The analysis type must be specified in the params object and be of a supported type');
  });
});

describe('ValidateJson for dotplot', () => {
  test('Missing columns prop or columns not equal to array returns an error', () => {
    // Missing "columns" property.
    let jsonString = '{"params": {"analysisType": "dotplot"}}';
    let json = ValidateJson(jsonString);
    expect(json.err).toBeTruthy();
    expect(json.message).toBe('The JSON object must have a "column" property with an array of column names');

    // "columns" value is not an array.
    jsonString = '{"params": {"analysisType": "dotplot"}}';
    json = ValidateJson(jsonString);
    expect(json.err).toBeTruthy();
    expect(json.message).toBe('The JSON object must have a "column" property with an array of column names');
  });

  test('Missing rows prop or rows not equal to array returns an error', () => {
    // Missing "columns" property.
    let jsonString = '{"columns": ["a", "b"], "params": {"analysisType": "dotplot"}}';
    let json = ValidateJson(jsonString);
    expect(json.err).toBeTruthy();
    expect(json.message).toBe('The JSON object must have a "rows" property with an array of row values');

    // "columns" value is not an array.
    jsonString = '{"columns": ["a", "b"], "params": {"analysisType": "dotplot"}, "rows": {}}';
    json = ValidateJson(jsonString);
    expect(json.err).toBeTruthy();
    expect(json.message).toBe('The JSON object must have a "rows" property with an array of row values');
  });

  test('Each entry in the rows array should have a data and names prop of correct type', () => {
    // Missing props.
    let jsonString = '{"columns": ["a", "b"], "params": {"analysisType": "dotplot"}, "rows": []}';
    let json = ValidateJson(jsonString);
    expect(json.err).toBeTruthy();
    expect(json.message).toBe('Each "rows" entry should have a "data" and "name" prop');

    // Missing data prop.
    jsonString = '{"columns": ["a", "b"], "params": {"analysisType": "dotplot"}, "rows": [{"name": "test"}]}';
    json = ValidateJson(jsonString);
    expect(json.err).toBeTruthy();
    expect(json.message).toBe('Each "rows" entry should have a "data" and "name" prop');

    // Missing name prop.
    jsonString = '{"columns": ["a", "b"], "params": {"analysisType": "dotplot"}, "rows": [{"data": []}]}';
    json = ValidateJson(jsonString);
    expect(json.err).toBeTruthy();
    expect(json.message).toBe('Each "rows" entry should have a "data" and "name" prop');

    // Data prop of incorrect type.
    jsonString = '{"columns": ["a", "b"], "params": {"analysisType": "dotplot"}, "rows": [{"data": {}, "name": "test"}]}';
    json = ValidateJson(jsonString);
    expect(json.err).toBeTruthy();
    expect(json.message).toBe('The row data should be an array with at least a "value" key');

    // Data prop missing value.
    jsonString = '{"columns": ["a", "b"], "params": {"analysisType": "dotplot"}, "rows": [{"data": [{}], "name": "test"}]}';
    json = ValidateJson(jsonString);
    expect(json.err).toBeTruthy();
    expect(json.message).toBe('The row data should be an array with at least a "value" key');
  });

  test('Valid dotplot/heatmap data', () => {
    // Data prop missing value.
    const jsonString = '{"columns": ["a", "b"], "params": {"analysisType": "dotplot"}, "rows": [{"data": [{"value": 1}], "name": "test"}]}';
    const json = ValidateJson(jsonString);
    expect(json.err).toBeFalsy();
    const parsed = {
      columns: ['a', 'b'],
      params: { analysisType: 'dotplot' },
      rows: [{ data: [{value: 1}], name: 'test' }],
    };
    expect(json.json).toEqual(parsed);
  });
});
