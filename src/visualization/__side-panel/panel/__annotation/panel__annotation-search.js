import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'antd';
import {
  faSearch,
  faTrashAlt,
} from '@fortawesome/pro-solid-svg-icons';

const Search = ({
  clearSearch,
  handleSearch,
  searchTerm,
  updateSearchTerm,
}) => (
  <div className="panel__annotation-search">
    <div className="panel__annotation-annotations-input">
      <Input
        onChange={updateSearchTerm}
        onPressEnter={handleSearch}
        placeholder="Gene name"
        value={searchTerm}
      />
      <button
        className="panel__annotation-button_theme-default"
        onClick={handleSearch}
        type="button"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
    <div className="panel__annotation-search-grid">
      <div>
        Clear searches
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
  searchTerm: PropTypes.string.isRequired,
  updateSearchTerm: PropTypes.func.isRequired,
};

export default Search;
