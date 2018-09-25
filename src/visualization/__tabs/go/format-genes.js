import React from 'react';

/* "genes" is a string of gene names */
const formatGenes = genes => (
  <div className="table__cell-overflow">
    <div
      className="table__cell-clipped"
      style={{
        paddingRight: 5,
      }}
    >
      {genes}
    </div>
    <div className="table__cell-raw">
      {genes}
    </div>
  </div>
);

export default formatGenes;
