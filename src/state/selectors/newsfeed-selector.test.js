import convertIsoDate from '../../helpers/convert-iso-date';
import NewsfeedSelector from './newsfeed-selector';

// mock convertIsoDate
jest.mock('../../helpers/convert-iso-date');
convertIsoDate.mockReturnValue('date');

describe('Newsfeed selector', () => {
  it('should return array of news items with date', () => {
    const currentState = {
      home: {
        news: [{ a: 'test' }],
      },
    };
    const expectedValue = [{ a: 'test', date: 'date' }];
    expect(NewsfeedSelector(currentState)).toEqual(expectedValue);
  });
});
