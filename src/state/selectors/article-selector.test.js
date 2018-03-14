import ArticleSelector from './article-selector';

const state = {
  home: {
    spotlight: [{ a: 'test' }],
  },
};
const expectedArticles = [{ a: 'test' }];

describe('Article selector', () => {
  it('should return array of articles', () => {
    expect(ArticleSelector(state)).toEqual(expectedArticles);
  });
});
