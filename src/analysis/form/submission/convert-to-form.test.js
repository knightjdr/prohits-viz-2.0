import convertToForm from './convert-to-form';

const obj = {
  arr: ['a', 'b'],
  field1: 'value1',
  field2: 'value2',
  file: ['file1', 'file2'],
};

/*  Jest is not using a JSDOM version that supports iterating
** through FormData using .entries iterator. */

describe('Convert to form', () => {
  let form;

  beforeAll(() => {
    form = convertToForm(obj);
  });

  it('should return form instance', () => {
    expect(form instanceof FormData).toBeTruthy();
  });
});
