import React from 'react';

import iconPosition from '../customize__icon-position';

const deleteIcons = (num, cellSize, handleClick, type, mouseEnter, mouseLeave) => {
  const position = iconPosition(cellSize);
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
        <circle fill="#ffffff" cx="5" cy="5" r="4" />
        <path
          d="M5,0C2.238,0,0,2.238,0,5c0,2.761,2.238,5,5,5c2.762,0,5-2.238,5-5C10,2.238,7.762,0,5,0z M7.452,6.312
          c0.095,0.096,0.095,0.248,0,0.344l-0.8,0.795c-0.094,0.096-0.248,0.096-0.342,0L5,6.129L3.688,7.451
          c-0.095,0.096-0.248,0.096-0.343,0L2.548,6.654c-0.095-0.096-0.095-0.248,0-0.344L3.871,5L2.548,3.688
          c-0.095-0.095-0.095-0.248,0-0.343l0.798-0.798c0.095-0.095,0.248-0.095,0.343,0L5,3.872l1.312-1.323
          c0.095-0.095,0.248-0.095,0.342,0l0.799,0.798c0.095,0.095,0.095,0.248,0,0.343L6.129,5L7.452,6.312z"
          fill="#f44336"
        />
      </g>
    );
  });
};

export default deleteIcons;
