import SelectChange from './select-change';

describe('SelectChange', () => {
  test('OnChange called', () => {
    const input = {
      onChange: jest.fn(),
    };
    SelectChange('value', input);
    expect(input.onChange).toHaveBeenCalledTimes(1);
    expect(input.onChange).toHaveBeenCalledWith('value');
  });

  test('OnChange called with null', () => {
    const input = {
      onChange: jest.fn(),
    };
    SelectChange(undefined, input);
    expect(input.onChange).toHaveBeenCalledTimes(1);
    expect(input.onChange).toHaveBeenCalledWith(null);
  });
});
