import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnnotationSelector from '../../../../state/selectors/visualization/annotation-selector';
import DimensionSelector from '../../../../state/selectors/visualization/dimension-selector';
import Map from './panel__map';
import MapSelector from '../../../../state/selectors/visualization/map-selector';
import MarkerSelector from '../../../../state/selectors/visualization/marker-selector';
import PositionSelector from '../../../../state/selectors/visualization/position-selector';
import Round from '../../../../helpers/round';
import { toggleAnnotations } from '../../../../state/set/visualization/map-actions';
import { updatePosition } from '../../../../state/set/visualization/position-actions';

export class MapContainer extends Component {
  navigatePosition = (e) => {
    const rect = e.target.getBoundingClientRect();
    // Calculate mouse position as percentage of container.
    let x = (e.clientX - rect.left) / rect.width;
    let y = (e.clientY - rect.top) / rect.height;

    /* Move x and y positions so that event click represents center of
    ** new region. So move x by width / 2 and y by height / 2. */
    const { height, width } = this.props.dimensions;
    x -= width / 2;
    y -= height / 2;

    // Move x and y positions if they are too close to the edges.
    if (x + width > 1) {
      x = 1 - width;
    } else if (x < 0) {
      x = 0;
    }
    if (y + height > 1) {
      y = 1 - height;
    } else if (y < 0) {
      y = 0;
    }
    x = Round(x, 4);
    y = Round(y, 4);
    this.props.updatePosition(x, y);
  }
  render() {
    return (
      <Map
        annotations={this.props.annotations}
        dimensions={this.props.dimensions}
        markers={this.props.markers}
        minimap={this.props.minimap.image}
        navigatePosition={this.navigatePosition}
        position={this.props.position}
        showAnnotations={this.props.minimap.showAnnotations}
        toggleAnnotations={this.props.toggleAnnotations}
      />
    );
  }
}

MapContainer.propTypes = {
  annotations: PropTypes.shape({}).isRequired,
  dimensions: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  markers: PropTypes.shape({}).isRequired,
  minimap: PropTypes.shape({
    image: PropTypes.string,
    showAnnotations: PropTypes.bool,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  toggleAnnotations: PropTypes.func.isRequired,
  updatePosition: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  annotations: AnnotationSelector(state),
  dimensions: DimensionSelector(state),
  markers: MarkerSelector(state),
  minimap: MapSelector(state),
  position: PositionSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  toggleAnnotations: () => {
    dispatch(toggleAnnotations());
  },
  updatePosition: (x, y) => {
    dispatch(updatePosition(x, y));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapContainer);

export default ConnectedContainer;
