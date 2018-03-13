import ConvertIsoDate from '../../helpers/convert-iso-date';
import NewsfeedSelector from './newsfeed-selector';

// mock ConvertIsoDate
jest.mock('../../helpers/convert-iso-date');
ConvertIsoDate.mockReturnValue('date');

const state = {
  home: {
    news: [{ a: 'test' }],
  },
};
const expectedNews = [{ a: 'test', date: 'date' }];

describe('Newsfeed selector', () => {
  it('should return array of news items with date', () => {
    expect(NewsfeedSelector(state)).toEqual(expectedNews);
  });
});
