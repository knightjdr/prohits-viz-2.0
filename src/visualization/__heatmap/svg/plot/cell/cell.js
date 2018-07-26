import React from 'react';
import Shortid from 'shortid';

const Cell = (cellSize, row, y) => (
  row.map((cell, i) => (
    <rect
      fill={cell.fillColor}
      height={cellSize}
      key={Shortid.generate()}
      width={cellSize}
      x={i * cellSize}
      y={y}
    />
  ))
);

export default Cell;
