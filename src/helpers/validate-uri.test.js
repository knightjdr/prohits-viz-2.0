import ValidateUri from './validate-uri';

describe('Validate PNG uris', () => {
  it('should return true for valid uris', () => {
    expect(ValidateUri('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD')).toBeTruthy();
    expect(ValidateUri('data:image/png,iVBORw0KGgoAAAANSUhEUgAAAD')).toBeTruthy();
  });

  it('should return false for invalid uris', () => {
    // Typo in data:image
    expect(ValidateUri('data:imae/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD')).toBeFalsy();
    // JPGs are not valid.
    expect(ValidateUri('data:image/jpg,iVBORw0KGgoAAAANSUhEUgAAAD')).toBeFalsy();
  });
});
