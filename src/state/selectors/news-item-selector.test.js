import convertIsoDate from '../../helpers/convert-iso-date';
import NewsItemSelector, { addDateIfNotNull } from './news-item-selector';

// mock convertIsoDate
jest.mock('../../helpers/convert-iso-date');
convertIsoDate.mockReturnValue('date');

describe('Add date to news item', () => {
  it('should return a date', () => {
    expect(addDateIfNotNull('item')).toEqual('date');
  });

  it('should return null', () => {
    expect(addDateIfNotNull()).toBeNull();
  });
});

describe('News item selector', () => {
  it('should return a news item', () => {
    const currentState = {
      newsItem: { item: { headline: 'test' } },
    };
    const expectedValue = { item: { headline: 'test', date: 'date' } };
    expect(NewsItemSelector(currentState)).toEqual(expectedValue);
  });
});
