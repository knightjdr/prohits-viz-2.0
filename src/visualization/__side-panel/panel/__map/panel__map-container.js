import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnnotationSelector from '../../../../state/selectors/visualization/annotation-selector';
import Map from './panel__map';
import MapSelector from '../../../../state/selectors/visualization/map-selector';
import MarkerSelector from '../../../../state/selectors/visualization/marker-selector';
import Round from '../../../../helpers/round';
import { toggleAnnotations } from '../../../../state/set/visualization/map-actions';
import { updatePosition } from '../../../../state/set/visualization/position-actions';

export class MapContainer extends Component {
  navigatePosition = (e) => {
    const rect = e.target.getBoundingClientRect();
    // Calculate mouse position as percentage of container.
    /* Need to also subtract half image percentage width to get top left corner
    ** for big image */
    const x = Round((e.clientX - rect.left) / rect.width, 2);
    const y = Round((e.clientY - rect.top) / rect.height, 2);
    this.props.updatePosition(x, y);
  }
  render() {
    return (
      <Map
        annotations={this.props.annotations}
        markers={this.props.markers}
        minimap={this.props.minimap.image}
        navigatePosition={this.navigatePosition}
        showAnnotations={this.props.minimap.showAnnotations}
        toggleAnnotations={this.props.toggleAnnotations}
      />
    );
  }
}

MapContainer.propTypes = {
  annotations: PropTypes.shape({}).isRequired,
  markers: PropTypes.shape({}).isRequired,
  minimap: PropTypes.shape({
    image: PropTypes.string,
    showAnnotations: PropTypes.bool,
  }).isRequired,
  toggleAnnotations: PropTypes.func.isRequired,
  updatePosition: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  annotations: AnnotationSelector(state),
  markers: MarkerSelector(state),
  minimap: MapSelector(state),
});

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
