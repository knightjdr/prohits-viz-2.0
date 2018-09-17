import PropTypes from 'prop-types';
import React from 'react';

const Columns = ({
  cellSize,
  fontSize,
  handleClick,
  names,
  openContextMenu,
  reference,
  search,
  toggleTooltip,
}) => {
  const textOffset = (cellSize / 2) - (fontSize / 3);
  return (
    <g transform="translate(100 0)">
      {
        names.reduce((textElements, name, i) => {
          // 98px is used as the height of the text to give a bit of bottom padding.
          const x = Math.round((i * cellSize) + textOffset);
          if (
            search.term &&
            search.match &&
            search.columns[name.original]
          ) {
            textElements.push(
              <rect
                fill="#4caf50"
                height="100"
                key={`${name.original}-match`}
                onContextMenu={(e) => { openContextMenu(e, name.original); }}
                width={cellSize}
                x={i * cellSize}
                y="0"
              />,
            );
          }
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
              onClick={(e) => { handleClick(e, name.original, 'column'); }}
              onContextMenu={(e) => { openContextMenu(e, name.original); }}
              onMouseEnter={(e) => {
                toggleTooltip(name.trimmed, true, name.original, e.clientX, 10);
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
  handleClick: PropTypes.func.isRequired,
  names: PropTypes.arrayOf(
    PropTypes.shape({
      original: PropTypes.string,
      text: PropTypes.string,
      trimmed: PropTypes.bool,
    }),
  ).isRequired,
  openContextMenu: PropTypes.func.isRequired,
  reference: PropTypes.string,
  search: PropTypes.shape({
    columns: PropTypes.shape({}),
    match: PropTypes.bool,
    term: PropTypes.string,
  }).isRequired,
  toggleTooltip: PropTypes.func.isRequired,
};

export default Columns;
