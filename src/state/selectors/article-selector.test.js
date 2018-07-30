import ArticleSelector from './article-selector';

describe('Article selector', () => {
  it('should return array of articles', () => {
    const currentState = {
      home: {
        spotlight: [{ a: 'test' }],
      },
    };
    const expectedValue = [{ a: 'test' }];
    expect(ArticleSelector(currentState)).toEqual(expectedValue);
  });
});
