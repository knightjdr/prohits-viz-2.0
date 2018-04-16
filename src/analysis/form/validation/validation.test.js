import Validation from './validation';
import ValidationDefault from './validation-default';
import ValidationDotplot from './validation-dotplot';

jest.mock('./validation-default');
ValidationDefault.mockReturnValue({ test: 'error' });

jest.mock('./validation-dotplot');
ValidationDotplot.mockReturnValue({ dotplot: 'error' });

describe('Validation', () => {
  test('Returns error object', () => {
    expect(Validation()).toEqual({ test: 'error', dotplot: 'error' });
  });
});
