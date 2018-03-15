import NewsPageSelector from './news-page-selector';

const state = {
  newsPage: {
    page: ['a'],
    pageIndex: 1,
  },
};
const expectedNewsPage = { page: ['a'], pageIndex: 1 };

describe('News page selector', () => {
  it('should return current page index and page of news items', () => {
    expect(NewsPageSelector(state)).toEqual(expectedNewsPage);
  });
});
