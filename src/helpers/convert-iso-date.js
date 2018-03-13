import Moment from 'moment';

// converts an ISO_8601 date to local 'Month Day, Year'
const ConvertISODate = (isoDate) => {
  if (Moment(isoDate, Moment.ISO_8601, true).isValid()) {
    return Moment(isoDate).format('MMMM D, YYYY');
  }
  return null;
};
export default ConvertISODate;
