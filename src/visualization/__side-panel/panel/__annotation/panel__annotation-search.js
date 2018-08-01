import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'antd';
import {
  faExclamationTriangle,
  faSearch,
  faTrashAlt,
} from '@fortawesome/pro-solid-svg-icons';

const warningStyle = {
  false: {
    height: 0,
    opacity: 0,
  },
  true: {
    height: 31,
    opacity: 1,
  },
};

const Search = ({
  clearSearch,
  handleSearch,
  search,
  updateSearchTerm,
}) => (
  <div className="panel__annotation-search">
    <div className="panel__annotation-annotations-input">
      <Input
        onChange={(e) => { updateSearchTerm(e.target.value); }}
        onPressEnter={handleSearch}
        placeholder="Gene name"
        value={search.term}
      />
      <button
        className="panel__annotation-button_theme-default"
        onClick={handleSearch}
        type="button"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
    <div
      className="panel__annotation-search-warning"
      style={warningStyle[Boolean(search.searched && !search.match)]}
    >
      <FontAwesomeIcon icon={faExclamationTriangle} />
      <div>
        No match found.
      </div>
    </div>
    <div className="panel__annotation-search-grid">
      <div>
        Clear search
      </div>
      <div>
        <button
          className="panel__annotation-button_theme-warning"
          onClick={clearSearch}
          type="button"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  </div>
);

Search.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  search: PropTypes.shape({
    match: PropTypes.bool,
    search: PropTypes.bool,
    term: PropTypes.string,
  }).isRequired,
  updateSearchTerm: PropTypes.func.isRequired,
};

export default Search;
