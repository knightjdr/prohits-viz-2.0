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
  closeAnnotationColorPicker,
  closeMarkerColorPicker,
  handleAnnotationColor,
  handleMarkerColor,
  handleSearch,
  markerColor,
  move,
  record,
  searchTerm,
  showAnnotationPicker,
  showMarkerPicker,
  toggleAnnotationColorPicker,
  toggleMarkerColorPicker,
  toggleMove,
  toggleRecord,
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
      handleAnnotationColor={handleAnnotationColor}
      move={move}
      showAnnotationPicker={showAnnotationPicker}
      toggleAnnotationColorPicker={toggleAnnotationColorPicker}
      toggleMove={toggleMove}
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
      toggleMarkerColorPicker={toggleMarkerColorPicker}
      toggleRecord={toggleRecord}
    />
    <div className="panel__border" />
    <div className="panel__title">
      Search
    </div>
    <Search
      handleSearch={handleSearch}
      searchTerm={searchTerm}
      updateSearchTerm={updateSearchTerm}
    />
  </div>
);

Annotation.propTypes = {
  addAnnotation: PropTypes.func.isRequired,
  annotation: PropTypes.string.isRequired,
  annotationColor: PropTypes.string.isRequired,
  clearAllAnnotations: PropTypes.func.isRequired,
  clearAllMarkers: PropTypes.func.isRequired,
  clearLastAnnotation: PropTypes.func.isRequired,
  clearLastMarker: PropTypes.func.isRequired,
  closeAnnotationColorPicker: PropTypes.func.isRequired,
  closeMarkerColorPicker: PropTypes.func.isRequired,
  handleAnnotationColor: PropTypes.func.isRequired,
  handleMarkerColor: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  markerColor: PropTypes.string.isRequired,
  move: PropTypes.bool.isRequired,
  record: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired,
  showAnnotationPicker: PropTypes.bool.isRequired,
  showMarkerPicker: PropTypes.bool.isRequired,
  toggleAnnotationColorPicker: PropTypes.func.isRequired,
  toggleMarkerColorPicker: PropTypes.func.isRequired,
  toggleMove: PropTypes.func.isRequired,
  toggleRecord: PropTypes.func.isRequired,
  updateAnnotation: PropTypes.func.isRequired,
  updateSearchTerm: PropTypes.func.isRequired,
};

export default Annotation;
