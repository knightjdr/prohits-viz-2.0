import FilterHeader from './filter-header';
import ToOptions from './to-options';

jest.mock('./to-options');

const headers = ['column1', 'column2', 'column3', 'column4'];
const other = ['column2', 'column3', 'column4'];
const recommended = ['column1'];


describe('FilterHeader', () => {
  test('Returns grouped options components', () => {
    const filtered = FilterHeader(recommended, headers);
    expect(filtered.initialValue).toBe('column1');
    expect(ToOptions).toHaveBeenCalledWith(recommended, other);
  });

  test('Returns only Other when no recommended', () => {
    const filtered = FilterHeader([], headers);
    expect(filtered.initialValue).toBeUndefined();
    expect(ToOptions).toHaveBeenCalledWith([], headers);
  });

  test('Returns only Suggested when no other', () => {
    const filtered = FilterHeader(headers, headers);
    expect(filtered.initialValue).toBe('column1');
    expect(ToOptions).toHaveBeenCalledWith(headers, []);
  });

  test('Returns only Other when no matches to suggested', () => {
    const filtered = FilterHeader(['column5'], headers);
    expect(filtered.initialValue).toBeUndefined();
    expect(ToOptions).toHaveBeenCalledWith([], headers);
  });
});
