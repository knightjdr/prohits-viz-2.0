import DefaultCheckboxChange from './default-checkbox-change';

const input = {
  onChange: jest.fn(),
};

describe('DefaultCheckboxChange', () => {
  test('Calls input.onChange() with first arg', () => {
    DefaultCheckboxChange(true, input);
    expect(input.onChange).toHaveBeenCalledTimes(1);
    expect(input.onChange).toHaveBeenCalledWith(true);
  });
});
