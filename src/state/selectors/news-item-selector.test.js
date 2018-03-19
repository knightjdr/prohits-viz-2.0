import ConvertIsoDate from '../../helpers/convert-iso-date';
import NewsItemSelector, { addDateIfNotNull } from './news-item-selector';

// mock ConvertIsoDate
jest.mock('../../helpers/convert-iso-date');
ConvertIsoDate.mockReturnValue('date');

const state = {
  newsItem: { item: { headline: 'test' } },
};
const expectedNews = { item: { headline: 'test', date: 'date' } };

describe('News item selector', () => {
  it('Should return a news item', () => {
    expect(NewsItemSelector(state)).toEqual(expectedNews);
  });

  it('Should return a date or null based on input', () => {
    expect(addDateIfNotNull('item')).toEqual('date');
    expect(addDateIfNotNull()).toBeNull();
  });
});
