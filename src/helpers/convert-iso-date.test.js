import ConvertIsoDate from './convert-iso-date';

const isoDate = '2018-03-12T16:56:16.000Z';
const localDate = 'Mar 12, 2018';

test('isoDate should convert to local date', () => {
  expect(ConvertIsoDate(isoDate)).toBe(localDate);
});
