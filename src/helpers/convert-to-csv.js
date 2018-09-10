/* Converts 2D matrix of rows to CSV using the header as the first line
** for the csv. The 'order' argument is a numerical array specifying the
** order of the columns (should match header). */
const convertToCsv = (header, order, rows, sep = ',') => {
  const headerString = header.join(sep);
  const csvArr = rows.map(row => (
    order.map(column => (
      row[column]
    )).join(sep)
  ));
  return [headerString, ...csvArr].join('\n');
};

export default convertToCsv;
