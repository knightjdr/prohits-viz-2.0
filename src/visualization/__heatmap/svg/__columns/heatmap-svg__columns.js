import PropTypes from 'prop-types';
import React from 'react';

const Columns = ({
  cellSize,
  fontSize,
  names,
  openContextMenu,
  reference,
  sortRows,
  toggleTooltip,
}) => {
  const textOffset = (cellSize / 2) - (fontSize / 3);
  return (
    <g transform="translate(100 0)">
      {
        names.reduce((textElements, name, i) => {
          // 98px is used as the height of the text to give a bit of padding.
          const x = Math.round((i * cellSize) + textOffset);
          if (reference === name.original) {
            textElements.push(
              <rect
                fill="#90afc5"
                height="100"
                key={`${name.original}-reference`}
                onContextMenu={(e) => { openContextMenu(e, name.original); }}
                width={cellSize}
                x={i * cellSize}
                y="0"
              />,
            );
          }
          textElements.push(
            <text
              fontSize={fontSize}
              key={name.original}
              onClick={(e) => { sortRows(e.shiftKey, name.original); }}
              onContextMenu={(e) => { openContextMenu(e, name.original); }}
              onMouseEnter={(e) => {
                toggleTooltip(name.trimmed, true, name.original, e.clientX, 0);
              }}
              onMouseLeave={() => { toggleTooltip(name.trimmed, false, name.original); }}
              textAnchor="end"
              transform={`rotate(90, ${x}, 98)`}
              x={x}
              y="98"
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

Columns.defaultProps = {
  reference: null,
};

Columns.propTypes = {
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
  reference: PropTypes.string,
  sortRows: PropTypes.func.isRequired,
  toggleTooltip: PropTypes.func.isRequired,
};

export default Columns;
