import PropTypes from 'prop-types';
import React from 'react';

import Annotations from './panel__annotation-annotations';
import Markers from './panel__annotation-markers';
import Search from './panel__annotation-search';

import './panel__annotation.css';

const Annotation = ({
  addAnnotation,
  annotation,
  annotationColor,
  clearAllAnnotations,
  clearAllMarkers,
  clearLastAnnotation,
  clearLastMarker,
  clearSearch,
  closeAnnotationColorPicker,
  closeMarkerColorPicker,
  fontSize,
  handleAnnotationColor,
  handleAnnotationSize,
  handleMarkerColor,
  handleSearch,
  markerColor,
  record,
  search,
  show,
  showAnnotationPicker,
  showMarkerPicker,
  showMarkers,
  tab,
  toggleAnnotationColorPicker,
  toggleMarkerColorPicker,
  toggleMarkers,
  toggleRecord,
  toggleShow,
  updateAnnotation,
  updateSearchTerm,
}) => (
  <div className="panel">
    <div className="panel__title">
      Annotations
    </div>
    <Annotations
      addAnnotation={addAnnotation}
      annotation={annotation}
      annotationColor={annotationColor}
      clearAllAnnotations={clearAllAnnotations}
      clearLastAnnotation={clearLastAnnotation}
      closeAnnotationColorPicker={closeAnnotationColorPicker}
      fontSize={fontSize}
      handleAnnotationColor={handleAnnotationColor}
      handleAnnotationSize={handleAnnotationSize}
      show={show}
      showAnnotationPicker={showAnnotationPicker}
      toggleAnnotationColorPicker={toggleAnnotationColorPicker}
      toggleShow={toggleShow}
      updateAnnotation={updateAnnotation}
    />
    <div className="panel__border" />
    <div className="panel__title">
      Markers
    </div>
    <Markers
      clearAllMarkers={clearAllMarkers}
      clearLastMarker={clearLastMarker}
      closeMarkerColorPicker={closeMarkerColorPicker}
      handleMarkerColor={handleMarkerColor}
      markerColor={markerColor}
      record={record}
      showMarkerPicker={showMarkerPicker}
      showMarkers={showMarkers}
      toggleMarkerColorPicker={toggleMarkerColorPicker}
      toggleMarkers={toggleMarkers}
      toggleRecord={toggleRecord}
    />
    <div className="panel__border" />
    <div className="panel__title">
      Search
    </div>
    <Search
      clearSearch={clearSearch}
      handleSearch={handleSearch}
      search={search}
      tab={tab}
      updateSearchTerm={updateSearchTerm}
    />
  </div>
);

Annotation.defaultProps = {
  annotationColor: '#f44336',
  markerColor: '#000000',
  record: false,
  show: true,
  showMarkers: true,
};

Annotation.propTypes = {
  addAnnotation: PropTypes.func.isRequired,
  annotation: PropTypes.string.isRequired,
  annotationColor: PropTypes.string,
  clearAllAnnotations: PropTypes.func.isRequired,
  clearAllMarkers: PropTypes.func.isRequired,
  clearLastAnnotation: PropTypes.func.isRequired,
  clearLastMarker: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  closeAnnotationColorPicker: PropTypes.func.isRequired,
  closeMarkerColorPicker: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  handleAnnotationColor: PropTypes.func.isRequired,
  handleAnnotationSize: PropTypes.func.isRequired,
  handleMarkerColor: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  markerColor: PropTypes.string,
  record: PropTypes.bool,
  search: PropTypes.shape({
    match: PropTypes.bool,
    matchCustomize: PropTypes.bool,
    search: PropTypes.bool,
    term: PropTypes.string,
  }).isRequired,
  show: PropTypes.bool,
  showAnnotationPicker: PropTypes.bool.isRequired,
  showMarkerPicker: PropTypes.bool.isRequired,
  showMarkers: PropTypes.bool,
  tab: PropTypes.string.isRequired,
  toggleAnnotationColorPicker: PropTypes.func.isRequired,
  toggleMarkerColorPicker: PropTypes.func.isRequired,
  toggleMarkers: PropTypes.func.isRequired,
  toggleRecord: PropTypes.func.isRequired,
  toggleShow: PropTypes.func.isRequired,
  updateAnnotation: PropTypes.func.isRequired,
  updateSearchTerm: PropTypes.func.isRequired,
};

export default Annotation;
