import PropTypes from 'prop-types';
import React from 'react';

import Cell from './cell/cell';

const Plot = ({
  cellSize,
  page,
}) => (
  <g transform="translate(100 100)">
    {
      page.reduce((cells, row, i) => {
        const y = i * cellSize;
        cells.push(...Cell(cellSize, row.data, y));
        return cells;
      }, [])
    }
  </g>
);

Plot.propTypes = {
  cellSize: PropTypes.number.isRequired,
  page: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.number,
        }),
      ),
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default Plot;
