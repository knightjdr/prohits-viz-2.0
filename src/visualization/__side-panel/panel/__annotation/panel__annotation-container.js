import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Annotation from './panel__annotation';
import AnnotationSelector from '../../../../state/selectors/visualization/annotation-selector';
import MarkerSelector from '../../../../state/selectors/visualization/marker-selector';
import PositionSelector from '../../../../state/selectors/visualization/position-selector';
import {
  addAnnotation,
  clearAllAnnotations,
  clearLastAnnotation,
  setAnnotationColor,
} from '../../../../state/set/visualization/annotation-actions';
import {
  clearAllMarkers,
  clearLastMarker,
  setMarkerColor,
} from '../../../../state/set/visualization/marker-actions';

export class AnnotationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annotation: '',
      move: false,
      record: false,
      searchTerm: '',
      showAnnotationPicker: false,
      showMarkerPicker: false,
    };
  }
  addAnnotation = () => {
    this.props.addAnnotation(this.state.annotation, this.props.position.x, this.props.position.y);
  }
  clearSearch = () => {
    this.setState({
      searchTerm: '',
    });
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
  toggleMove = () => {
    this.setState(({ move }) => ({
      move: !move,
    }));
  }
  toggleRecord = () => {
    this.setState(({ record }) => ({
      record: !record,
    }));
  }
  updateAnnotation = (e) => {
    this.setState({
      annotation: e.target.value,
    });
  }
  updateSearchTerm = (e) => {
    this.setState({
      searchTerm: e.target.value,
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
        clearSearch={this.clearSearch}
        closeAnnotationColorPicker={this.closeAnnotationColorPicker}
        closeMarkerColorPicker={this.closeMarkerColorPicker}
        handleAnnotationColor={this.handleAnnotationColor}
        handleMarkerColor={this.handleMarkerColor}
        handleSearch={this.handleSearch}
        markerColor={this.props.markers.color}
        move={this.state.move}
        record={this.state.record}
        searchTerm={this.state.searchTerm}
        showAnnotationPicker={this.state.showAnnotationPicker}
        showMarkerPicker={this.state.showMarkerPicker}
        toggleAnnotationColorPicker={this.toggleAnnotationColorPicker}
        toggleMarkerColorPicker={this.toggleMarkerColorPicker}
        toggleMove={this.toggleMove}
        toggleRecord={this.toggleRecord}
        updateAnnotation={this.updateAnnotation}
        updateSearchTerm={this.updateSearchTerm}
      />
    );
  }
}

AnnotationContainer.propTypes = {
  annotations: PropTypes.shape({
    color: PropTypes.string,
  }).isRequired,
  addAnnotation: PropTypes.func.isRequired,
  clearAllAnnotations: PropTypes.func.isRequired,
  clearAllMarkers: PropTypes.func.isRequired,
  clearLastAnnotation: PropTypes.func.isRequired,
  clearLastMarker: PropTypes.func.isRequired,
  markers: PropTypes.shape({
    color: PropTypes.string,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  setAnnotationColor: PropTypes.func.isRequired,
  setMarkerColor: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  annotations: AnnotationSelector(state),
  markers: MarkerSelector(state),
  position: PositionSelector(state),
});

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
  setAnnotationColor: (hex) => {
    dispatch(setAnnotationColor(hex));
  },
  setMarkerColor: (hex) => {
    dispatch(setMarkerColor(hex));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnnotationContainer);

export default ConnectedContainer;
