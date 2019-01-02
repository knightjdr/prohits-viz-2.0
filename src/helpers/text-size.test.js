import textSize from './text-size';

describe('Text size', () => {
  it('should return size', () => {
    expect(textSize('test')).toBe(48);
  });
});
