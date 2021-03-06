import convertIsoDate from '../../helpers/convert-iso-date';
import NewsSelector from './news-selector';

// mock convertIsoDate
jest.mock('../../helpers/convert-iso-date');
convertIsoDate.mockReturnValue('date');

describe('News selector', () => {
  it('should return array of news items', () => {
    const currentState = {
      news: {
        list: [{ headline: 'test' }],
      },
    };
    const expectedValue = {
      list: [{ headline: 'test', date: 'date' }],
    };
    expect(NewsSelector(currentState)).toEqual(expectedValue);
  });
});
