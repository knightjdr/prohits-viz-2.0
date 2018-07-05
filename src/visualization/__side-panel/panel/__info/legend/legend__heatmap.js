import React from 'react';

const HeatmapLegend = (params) => {
  const numColors = params.gradient.length;
  const halfColorIndex = Math.floor(numColors / 2);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="240"
      width="200"
      viewBox="0 0 200 240"
    >
      <defs>
        <linearGradient id="legendGradient">
          <stop offset="0%" stopColor={params.gradient[0]} />
          <stop offset="50%" stopColor={params.gradient[halfColorIndex]} />
          <stop offset="100%" stopColor={params.gradient[numColors - 1]} />
        </linearGradient>
      </defs>
      <g>
        <text x="100" y="20" textAnchor="middle">
          {params.abundanceName}
        </text>
        <rect x="25" y="30" height="20" width="150" fill="url('#legendGradient')" />
        <text x="25" y="65" textAnchor="middle">
          {params.min}
        </text>
        <text x="175" y="65" textAnchor="middle">
          {params.max}
        </text>
      </g>
    </svg>
  );
};
export default HeatmapLegend;
