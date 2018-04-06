import DefaultChange from './default-change';

describe('DefaultChange', () => {
  test('OnChange called', () => {
    const input = {
      onChange: jest.fn(),
    };
    DefaultChange('value', input);
    expect(input.onChange).toHaveBeenCalledTimes(1);
    expect(input.onChange).toHaveBeenCalledWith('value');
  });

  test('OnChange called with null', () => {
    const input = {
      onChange: jest.fn(),
    };
    DefaultChange(undefined, input);
    expect(input.onChange).toHaveBeenCalledTimes(1);
    expect(input.onChange).toHaveBeenCalledWith(null);
  });
});
