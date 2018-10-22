import React from 'react';

import round from '../../../../helpers/round';

const SVG_SCALE_SIZE = 10;

const deleteIcons = (num, cellSize, handleClick, type) => {
  const effectiveCellSize = cellSize * 0.8;
  const scale = round(effectiveCellSize / SVG_SCALE_SIZE, 2);
  const offset = type === 'col' ? round((cellSize - effectiveCellSize) / 2, 2) : 0;
  const translate = { x: 0, y: 0 };
  const translateDim = type === 'col' ? 'x' : 'y';
  return [...Array(num).keys()].map((i) => {
    translate[translateDim] = (cellSize * i) + offset;
    return (
      <g
        cursor="pointer"
        key={i}
        onClick={() => { handleClick(i, type); }}
        transform={`translate(${translate.x} ${translate.y}) scale(${scale})`}
      >
        <circle fill="#fff" cx="5" cy="5" r="4" />
        <path
          d="M5,1.562c-2.762,0-5,2.238-5,5s2.238,5,5,5s5-2.238,5-5S7.762,1.562,5,1.562z M7.452,7.875c0.095,0.095,0.095,0.248,0,0.343
          L6.653,9.014c-0.095,0.095-0.248,0.095-0.343,0L5,7.691L3.688,9.014c-0.095,0.095-0.248,0.095-0.343,0L2.548,8.216
          c-0.095-0.095-0.095-0.248,0-0.343l1.323-1.311L2.548,5.25c-0.095-0.095-0.095-0.248,0-0.343l0.798-0.798
          c0.095-0.095,0.248-0.095,0.343,0L5,5.434l1.312-1.323c0.095-0.095,0.248-0.095,0.343,0l0.798,0.798
          c0.095,0.095,0.095,0.248,0,0.343L6.129,6.562L7.452,7.875z"
          fill="#f44336"
        />
      </g>
    );
  });
};

export default deleteIcons;
