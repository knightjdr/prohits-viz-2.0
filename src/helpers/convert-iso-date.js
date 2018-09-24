const Months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const convertISODate = (isoDate) => {
  const utcDate = new Date(isoDate);
  const localDate = new Date(utcDate.getTime() + (utcDate.getTimezoneOffset() * 60000));
  const day = localDate.getDate();
  const month = Months[localDate.getMonth()];
  const year = localDate.getFullYear();
  return `${month} ${day}, ${year}`;
};
export default convertISODate;
