import PropTypes from 'prop-types';
import React from 'react';

import Cell from './cell/cell';

const Plot = ({
  cellSize,
  edgeSize,
  imageType,
  page,
}) => {
  const CellType = Cell(imageType);
  const offset = cellSize / 2;
  return (
    <g transform="translate(100 100)">
      {
        page.reduce((cells, row, i) => {
          const y = i * cellSize;
          cells.push(...CellType(cellSize, row.data, y, edgeSize, offset));
          return cells;
        }, [])
      }
    </g>
  );
};

Plot.propTypes = {
  cellSize: PropTypes.number.isRequired,
  edgeSize: PropTypes.number.isRequired,
  imageType: PropTypes.string.isRequired,
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
