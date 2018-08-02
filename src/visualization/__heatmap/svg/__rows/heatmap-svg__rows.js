import PropTypes from 'prop-types';
import React from 'react';

const Rows = ({
  cellSize,
  fontSize,
  names,
  openContextMenu,
  search,
  toggleTooltip,
}) => {
  const textOffset = (cellSize / 2) - (fontSize / 3);
  return (
    <g transform="translate(0 100)">
      {
        names.reduce((textElements, name, i) => {
          // 98px is used as the width of the text to give a bit of right padding.
          const y = Math.round(((i + 1) * cellSize) - textOffset);
          if (
            search.term &&
            search.match &&
            search.rows[name.original]
          ) {
            textElements.push(
              <rect
                fill="#4caf50"
                height={cellSize}
                key={`${name.original}-match`}
                width="100"
                x="0"
                y={i * cellSize}
              />,
            );
          }
          textElements.push(
            <text
              fontSize={fontSize}
              key={name.original}
              onContextMenu={(e) => { openContextMenu(e, name.original); }}
              onMouseEnter={(e) => {
                toggleTooltip(name.trimmed, true, name.original, e.clientX, e.clientY - 80);
              }}
              onMouseLeave={() => { toggleTooltip(name.trimmed, false, name.original); }}
              textAnchor="end"
              x="98"
              y={y}
            >
              {name.text}
            </text>,
          );
          return textElements;
        }, [])
      }
    </g>
  );
};

Rows.propTypes = {
  cellSize: PropTypes.number.isRequired,
  fontSize: PropTypes.number.isRequired,
  names: PropTypes.arrayOf(
    PropTypes.shape({
      original: PropTypes.string,
      text: PropTypes.string,
      trimmed: PropTypes.bool,
    }),
  ).isRequired,
  openContextMenu: PropTypes.func.isRequired,
  search: PropTypes.shape({
    match: PropTypes.bool,
    rows: PropTypes.shape({}),
    term: PropTypes.string,
  }).isRequired,
  toggleTooltip: PropTypes.func.isRequired,
};

export default Rows;
