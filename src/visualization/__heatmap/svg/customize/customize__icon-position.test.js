import iconPosition from './customize__icon-position';

describe('Icon position on customize components', () => {
  let position;

  beforeAll(() => {
    position = iconPosition(20);
  });

  it('should set offset', () => {
    expect(position.offset).toBe(2);
  });

  it('should set scale', () => {
    expect(position.scale).toBe(1.6);
  });

  it('should set translate', () => {
    const expectedTranslate = { x: 0, y: 0 };
    expect(position.translate).toEqual(expectedTranslate);
  });
});
