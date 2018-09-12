import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Annotation from './panel__annotation';
import AnnotationSelector from '../../../../state/selectors/visualization/annotation-selector';
import markerSelector from '../../../../state/selectors/visualization/marker-selector';
import searchSelector from '../../../../state/selectors/visualization/search-selector';
import {
  clearAllAnnotations,
  clearLastAnnotation,
  placeAnnotation,
  setAnnotationColor,
  setAnnotationSize,
  toggleAnnotations,
} from '../../../../state/set/visualization/annotation-actions';
import {
  clearAllMarkers,
  clearLastMarker,
  setMarkerColor,
  toggleMarkers,
  toggleRecordMarker,
} from '../../../../state/set/visualization/marker-actions';
import {
  clearSearch,
  searchGenes,
  setSearchTerm,
} from '../../../../state/set/visualization/search-actions';

export class AnnotationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annotation: '',
      showAnnotationPicker: false,
      showMarkerPicker: false,
    };
  }
  addAnnotation = () => {
    this.props.placeAnnotation(this.state.annotation);
  }
  closeAnnotationColorPicker = () => {
    this.setState({
      showAnnotationPicker: false,
    });
  }
  closeMarkerColorPicker= () => {
    this.setState({
      showMarkerPicker: false,
    });
  }
  handleAnnotationColor = (color) => {
    this.props.setAnnotationColor(color.hex);
  }
  handleMarkerColor = (color) => {
    this.props.setMarkerColor(color.hex);
  }
  toggleAnnotationColorPicker = () => {
    this.setState(({ showAnnotationPicker }) => ({
      showAnnotationPicker: !showAnnotationPicker,
    }));
  }
  toggleMarkerColorPicker = () => {
    this.setState(({ showMarkerPicker }) => ({
      showMarkerPicker: !showMarkerPicker,
    }));
  }
  updateAnnotation = (e) => {
    this.setState({
      annotation: e.target.value,
    });
  }
  render() {
    return (
      <Annotation
        addAnnotation={this.addAnnotation}
        annotation={this.state.annotation}
        annotationColor={this.props.annotations.color}
        clearAllAnnotations={this.props.clearAllAnnotations}
        clearAllMarkers={this.props.clearAllMarkers}
        clearLastAnnotation={this.props.clearLastAnnotation}
        clearLastMarker={this.props.clearLastMarker}
        clearSearch={this.props.clearSearch}
        closeAnnotationColorPicker={this.closeAnnotationColorPicker}
        closeMarkerColorPicker={this.closeMarkerColorPicker}
        fontSize={this.props.annotations.fontSize}
        handleAnnotationColor={this.handleAnnotationColor}
        handleAnnotationSize={this.props.setAnnotationSize}
        handleMarkerColor={this.handleMarkerColor}
        handleSearch={this.props.searchGenes}
        markerColor={this.props.markers.color}
        record={this.props.markers.record}
        search={this.props.search}
        show={this.props.annotations.show}
        showAnnotationPicker={this.state.showAnnotationPicker}
        showMarkerPicker={this.state.showMarkerPicker}
        showMarkers={this.props.markers.show}
        toggleAnnotationColorPicker={this.toggleAnnotationColorPicker}
        toggleMarkerColorPicker={this.toggleMarkerColorPicker}
        toggleMarkers={this.props.toggleMarkers}
        toggleRecord={this.props.toggleRecordMarker}
        toggleShow={this.props.toggleAnnotations}
        updateAnnotation={this.updateAnnotation}
        updateSearchTerm={this.props.setSearchTerm}
      />
    );
  }
}

AnnotationContainer.propTypes = {
  annotations: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
    show: PropTypes.bool,
  }).isRequired,
  clearAllAnnotations: PropTypes.func.isRequired,
  clearAllMarkers: PropTypes.func.isRequired,
  clearLastAnnotation: PropTypes.func.isRequired,
  clearLastMarker: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  markers: PropTypes.shape({
    color: PropTypes.string,
    record: PropTypes.bool,
    show: PropTypes.bool,
  }).isRequired,
  placeAnnotation: PropTypes.func.isRequired,
  search: PropTypes.shape({
    match: PropTypes.bool,
    search: PropTypes.bool,
    term: PropTypes.string,
  }).isRequired,
  searchGenes: PropTypes.func.isRequired,
  setAnnotationColor: PropTypes.func.isRequired,
  setAnnotationSize: PropTypes.func.isRequired,
  setMarkerColor: PropTypes.func.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  toggleAnnotations: PropTypes.func.isRequired,
  toggleMarkers: PropTypes.func.isRequired,
  toggleRecordMarker: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  annotations: AnnotationSelector(state),
  markers: markerSelector(state),
  search: searchSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  clearAllAnnotations: () => {
    dispatch(clearAllAnnotations());
  },
  clearAllMarkers: () => {
    dispatch(clearAllMarkers());
  },
  clearLastAnnotation: () => {
    dispatch(clearLastAnnotation());
  },
  clearLastMarker: () => {
    dispatch(clearLastMarker());
  },
  clearSearch: () => {
    dispatch(clearSearch());
  },
  placeAnnotation: (text) => {
    dispatch(placeAnnotation(text));
  },
  searchGenes: (term) => {
    dispatch(searchGenes(term));
  },
  setAnnotationColor: (hex) => {
    dispatch(setAnnotationColor(hex));
  },
  setAnnotationSize: (fontSize) => {
    dispatch(setAnnotationSize(fontSize));
  },
  setMarkerColor: (hex) => {
    dispatch(setMarkerColor(hex));
  },
  setSearchTerm: (term) => {
    dispatch(setSearchTerm(term));
  },
  toggleAnnotations: () => {
    dispatch(toggleAnnotations());
  },
  toggleMarkers: () => {
    dispatch(toggleMarkers());
  },
  toggleRecordMarker: () => {
    dispatch(toggleRecordMarker());
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnnotationContainer);

export default ConnectedContainer;
