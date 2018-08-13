import React from 'react';
import Shortid from 'shortid';

const Cell = (imageType) => {
  switch (imageType) {
    case 'dotplot':
      return (cellSize, row, y, edgeSize, offset) => (
        row.map((cell, i) => (
          <circle
            cx={(i * cellSize) + offset}
            cy={y + offset}
            fill={cell.fillColor}
            key={Shortid.generate()}
            r={cell.radius}
            stroke={cell.edgeColor}
            strokeWidth={edgeSize}
          />
        ))
      );
    default:
      return (cellSize, row, y) => (
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
  }
};

export default Cell;
