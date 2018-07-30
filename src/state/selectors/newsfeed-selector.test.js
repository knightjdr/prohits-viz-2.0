import ConvertIsoDate from '../../helpers/convert-iso-date';
import NewsfeedSelector from './newsfeed-selector';

// mock ConvertIsoDate
jest.mock('../../helpers/convert-iso-date');
ConvertIsoDate.mockReturnValue('date');

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
