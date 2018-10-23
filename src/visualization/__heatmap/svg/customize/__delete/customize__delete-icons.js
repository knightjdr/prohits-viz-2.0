import React from 'react';

import iconPosition from '../customize__icon-position';

const deleteIcons = (num, cellSize, handleClick, type, mouseEnter, mouseLeave) => {
  const position = iconPosition(cellSize, type);
  const translateDim = type === 'col' ? 'x' : 'y';
  return [...Array(num).keys()].map((i) => {
    position.translate[translateDim] = (cellSize * i) + position.offset;
    return (
      <g
        className="delete-icon__circle"
        cursor="pointer"
        key={`icon-${i}`}
        onClick={() => { handleClick(i, type); }}
        onMouseEnter={() => { mouseEnter(i, type); }}
        onMouseLeave={() => { mouseLeave(i, type); }}
        transform={`translate(${position.translate.x} ${position.translate.y}) scale(${position.scale})`}
      >
        <circle fill="#fff" cx="5" cy="6" r="4" />
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
