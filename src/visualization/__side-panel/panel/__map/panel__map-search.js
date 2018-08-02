import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import ShortID from 'shortid';

import './panel__map.css';

const Search = ({
  search,
}) => (
  <Fragment>
    {
      Object.entries(search.columns).map(([name, position]) => (
        <div
          className="panel__map-search-match"
          tooltip={name}
          key={ShortID.generate()}
          style={{
            left: `calc(${position * 100}% - 5px)`,
            top: -5,
          }}
          tooltip-position="right"
        />
      ))
    }
    {
      Object.entries(search.rows).map(([name, position]) => (
        <div
          className="panel__map-search-match"
          tooltip={name}
          key={ShortID.generate()}
          style={{
            left: -5,
            top: `calc(${position * 100}% - 5px)`,
          }}
          tooltip-position="right"
        />
      ))
    }
  </Fragment>
);


Search.propTypes = {
  search: PropTypes.shape({
    columns: PropTypes.shape({}),
    rows: PropTypes.shape({}),
  }).isRequired,
};

export default Search;
