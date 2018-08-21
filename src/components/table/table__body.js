import PropTypes from 'prop-types';
import React from 'react';
import shortId from 'shortid';

const Body = ({
  columnOrder,
  height,
  rows,
}) => (
  <tbody
    style={{
      height: height,
    }}
  >
    {
      rows.map(row => (
        <tr key={shortId.generate()}>
          {
            columnOrder.map(name => (
              <td key={shortId.generate()}>
                { row[name] }
              </td>
            ))
          }
        </tr>
      ))
    }
  </tbody>
);

Body.propTypes = {
  columnOrder: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  height: PropTypes.number.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

export default Body;
