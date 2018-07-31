import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Annotation from './panel__annotation';
import AnnotationSelector from '../../../../state/selectors/visualization/annotation-selector';
import MarkerSelector from '../../../../state/selectors/visualization/marker-selector';
import PositionSelector from '../../../../state/selectors/visualization/position-selector';
import SearchSelector from '../../../../state/selectors/visualization/search-selector';
import {
  addAnnotation,
  clearAllAnnotations,
  clearLastAnnotation,
  setAnnotationColor,
  toggleAnnotations,
  toggleMoveAnnotation,
} from '../../../../state/set/visualization/annotation-actions';
import {
  clearAllMarkers,
  clearLastMarker,
  setMarkerColor,
  toggleRecordMarker,
} from '../../../../state/set/visualization/marker-actions';
import {
  clearSearch,
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
    this.props.addAnnotation(this.state.annotation, this.props.position.x, this.props.position.y);
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
  handleSearch = () => {
    console.log(this.state.searchTerm);
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
        handleAnnotationColor={this.handleAnnotationColor}
        handleMarkerColor={this.handleMarkerColor}
        handleSearch={this.handleSearch}
        markerColor={this.props.markers.color}
        move={this.props.annotations.move}
        record={this.props.markers.record}
        searchTerm={this.props.search.term}
        show={this.props.annotations.show}
        showAnnotationPicker={this.state.showAnnotationPicker}
        showMarkerPicker={this.state.showMarkerPicker}
        toggleAnnotationColorPicker={this.toggleAnnotationColorPicker}
        toggleMarkerColorPicker={this.toggleMarkerColorPicker}
        toggleMove={this.props.toggleMoveAnnotation}
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
    move: PropTypes.bool,
    show: PropTypes.bool,
  }).isRequired,
  addAnnotation: PropTypes.func.isRequired,
  clearAllAnnotations: PropTypes.func.isRequired,
  clearAllMarkers: PropTypes.func.isRequired,
  clearLastAnnotation: PropTypes.func.isRequired,
  clearLastMarker: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  markers: PropTypes.shape({
    color: PropTypes.string,
    record: PropTypes.bool,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  search: PropTypes.shape({
    term: PropTypes.string,
  }).isRequired,
  setAnnotationColor: PropTypes.func.isRequired,
  setMarkerColor: PropTypes.func.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  toggleAnnotations: PropTypes.func.isRequired,
  toggleMoveAnnotation: PropTypes.func.isRequired,
  toggleRecordMarker: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  annotations: AnnotationSelector(state),
  markers: MarkerSelector(state),
  position: PositionSelector(state),
  search: SearchSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  addAnnotation: (text, x, y) => {
    dispatch(addAnnotation(text, x, y));
  },
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
  setAnnotationColor: (hex) => {
    dispatch(setAnnotationColor(hex));
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
  toggleMoveAnnotation: () => {
    dispatch(toggleMoveAnnotation());
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
