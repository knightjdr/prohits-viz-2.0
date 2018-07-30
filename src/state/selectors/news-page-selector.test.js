import NewsPageSelector from './news-page-selector';

describe('News page selector', () => {
  it('should return current page index and page of news items', () => {
    const currentState = {
      newsPage: {
        page: ['a'],
        pageIndex: 1,
      },
    };
    const expectedValue = { page: ['a'], pageIndex: 1 };
    expect(NewsPageSelector(currentState)).toEqual(expectedValue);
  });
});
