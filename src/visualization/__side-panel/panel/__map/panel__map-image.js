import PropTypes from 'prop-types';
import React from 'react';

import Annotations from './panel__map-annotations';
import Markers from './panel__map-markers';
import Search from './panel__map-search';

import './panel__map.css';

const Image = ({
  annotations,
  imageLimits,
  markers,
  minimap,
  navigatePosition,
  rangeBox,
  search,
  showAnnotations,
  showMarkers,
  syncImage,
}) => (
  <div className="panel__map-inner">
    <img
      alt="Mini map"
      src={syncImage || minimap}
      style={imageLimits}
    />
    <button
      className="panel__map-select"
      onClick={navigatePosition}
      type="button"
    >
      <div
        className="panel__map-position"
        style={rangeBox}
      />
      <div className="panel__map-annotations">
        {
          showMarkers &&
          <Markers markers={markers} />
        }
        {
          search.term &&
          search.match &&
          <Search search={search} />
        }
        {
          showAnnotations &&
          <Annotations annotations={annotations} />
        }
      </div>
    </button>
  </div>
);

Image.defaultProps = {
  minimap: null,
  showAnnotations: true,
  showMarkers: true,
  syncImage: null,
};

Image.propTypes = {
  annotations: PropTypes.shape({}).isRequired,
  imageLimits: PropTypes.shape({
    maxHeight: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    maxWidth: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }).isRequired,
  markers: PropTypes.shape({}).isRequired,
  minimap: PropTypes.string,
  navigatePosition: PropTypes.func.isRequired,
  rangeBox: PropTypes.shape({
    height: PropTypes.string,
    left: PropTypes.string,
    top: PropTypes.string,
    width: PropTypes.string,
  }).isRequired,
  search: PropTypes.shape({
    columns: PropTypes.shape({}),
    match: PropTypes.bool,
    rows: PropTypes.shape({}),
    term: PropTypes.string,
  }).isRequired,
  showAnnotations: PropTypes.bool,
  showMarkers: PropTypes.bool,
  syncImage: PropTypes.string,
};

export default Image;
