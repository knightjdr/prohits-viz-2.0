import React from 'react';

import iconPosition from '../customize__icon-position';

const arrows = {
  col: (
    <path
      d="M3.333,6.176V5.546h3.334v0.629c0,0.293,0.354,0.439,0.56,0.232l1.178-1.176c0.127-0.128,0.127-0.336,0-0.464
      L7.227,3.591c-0.206-0.207-0.56-0.061-0.56,0.231v0.63H3.333v-0.63c0-0.292-0.353-0.438-0.56-0.231L1.596,4.768
      c-0.128,0.128-0.128,0.336,0,0.464l1.178,1.176C2.98,6.615,3.333,6.469,3.333,6.176z"
      fill="#fff"
    />
  ),
  row: (
    <path
      d="M6.177,6.667h-0.63V3.333h0.63c0.292,0,0.439-0.354,0.231-0.56L5.232,1.596c-0.128-0.128-0.336-0.128-0.464,0
      L3.592,2.773c-0.207,0.207-0.061,0.56,0.231,0.56h0.63v3.334h-0.63c-0.292,0-0.438,0.353-0.231,0.56l1.176,1.178
      c0.128,0.128,0.336,0.128,0.464,0l1.176-1.178C6.616,7.02,6.469,6.667,6.177,6.667z"
      fill="#fff"
    />
  ),
};

const reorderIcons = (num, cellSize, type) => {
  const position = iconPosition(cellSize, type);
  const translateDim = type === 'col' ? 'x' : 'y';
  return [...Array(num).keys()].map((i) => {
    position.translate[translateDim] = (cellSize * i) + position.offset;
    return (
      <g
        className="delete-icon__circle"
        cursor="pointer"
        key={`icon-${i}`}
        transform={`
          translate(${position.translate.x} ${position.translate.y})
          scale(${position.scale})
        `}
      >
        <circle fill="#336B87" cx="5" cy="5" r="5" />
        {arrows[type]}
      </g>
    );
  });
};

export default reorderIcons;
