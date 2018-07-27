import React from 'react';
import Shortid from 'shortid';

const Cell = imageType => (cellSize, row, y, edgeSize, offset) => {
  if (imageType === 'dotplot') {
    return (
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
  }
  return (
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
};

export default Cell;
