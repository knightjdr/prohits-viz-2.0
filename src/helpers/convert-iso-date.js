const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const ConvertISODate = (isoDate) => {
  const utcDate = new Date(isoDate);
  const localDate = new Date(utcDate.getTime() + (utcDate.getTimezoneOffset() * 60000));
  const day = localDate.getDate();
  const month = Months[localDate.getMonth()];
  const year = localDate.getFullYear();
  return `${month} ${day}, ${year}`;
};
export default ConvertISODate;
