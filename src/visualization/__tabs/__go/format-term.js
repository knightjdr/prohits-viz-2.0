import React from 'react';

const formatTerm = (depth, term) => {
  let content;
  let margin;
  let style;
  switch (depth) {
    case 1:
      content = (
        <div className="table__cell-overflow">
          <div className="table__cell-clipped">
            • {term}
          </div>
          <div className="table__cell-raw">
            • {term}
          </div>
        </div>
      );
      break;
    default:
      margin = 5 + (depth * 8);
      content = (
        <div className="table__cell-overflow">
          <div
            className="table__cell-clipped"
            style={{ marginLeft: margin }}
          >
            {term}
          </div>
          <div
            className="table__cell-raw"
            style={{ marginLeft: margin }}
          >
            {term}
          </div>
        </div>
      );
      break;
  }
  return {
    content,
    style,
  };
};

export default formatTerm;
