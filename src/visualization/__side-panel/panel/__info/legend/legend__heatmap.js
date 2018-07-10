import React from 'react';

const HeatmapLegend = (params) => {
  const numColors = params.gradientFill.length;
  const halfColorIndex = Math.floor(numColors / 2);
  return (
    <svg
      id="legend"
      xmlns="http://www.w3.org/2000/svg"
      height="80"
      width="200"
      viewBox="0 0 200 80"
    >
      <defs>
        <linearGradient id="legendGradient">
          <stop offset="0%" stopColor={params.gradientFill[0]} />
          <stop offset="50%" stopColor={params.gradientFill[halfColorIndex]} />
          <stop offset="100%" stopColor={params.gradientFill[numColors - 1]} />
        </linearGradient>
      </defs>
      <g>
        <text x="100" y="20" textAnchor="middle">
          {params.abundanceName}
        </text>
        <rect x="25" y="30" height="20" width="150" fill="url('#legendGradient')" />
        <text x="25" y="65" textAnchor="middle">
          {params.minAbundance}
        </text>
        <text x="175" y="65" textAnchor="middle">
          {params.abundanceCap}
        </text>
      </g>
    </svg>
  );
};
export default HeatmapLegend;
