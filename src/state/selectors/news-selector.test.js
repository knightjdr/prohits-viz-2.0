import ConvertIsoDate from '../../helpers/convert-iso-date';
import NewsSelector from './news-selector';

// mock ConvertIsoDate
jest.mock('../../helpers/convert-iso-date');
ConvertIsoDate.mockReturnValue('date');

const state = {
  news: {
    list: [{ headline: 'test' }],
  },
};
const expectedNews = {
  list: [{ headline: 'test', date: 'date' }],
};

describe('News selector', () => {
  it('should return array of news items', () => {
    expect(NewsSelector(state)).toEqual(expectedNews);
  });
});
