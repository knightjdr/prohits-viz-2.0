import PropTypes from 'prop-types';
import React from 'react';

const IndexedDBContainer = ({
  render,
}) => {
  const props = {
    test: 'value',
  };
  return (
    <div className="indexeddb-container">
      { render(props) }
    </div>
  );
};

IndexedDBContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default IndexedDBContainer;
