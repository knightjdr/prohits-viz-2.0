import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnnotationSelector from '../../../../state/selectors/visualization/annotation-selector';
import Map from './panel__map';
import MapSelector from '../../../../state/selectors/visualization/map-selector';
import Round from '../../../../helpers/round';
import { updatePosition } from '../../../../state/set/visualization/position-actions';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnnotations: false,
    };
  }
  toggleAnnotations = () => {
    this.setState(({ showAnnotations }) => ({
      showAnnotations: !showAnnotations,
    }));
  }
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
        minimap={this.props.minimap}
        navigatePosition={this.navigatePosition}
        showAnnotations={this.state.showAnnotations}
        toggleAnnotations={this.toggleAnnotations}
      />
    );
  }
}

MapContainer.propTypes = {
  annotations: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  minimap: PropTypes.string.isRequired,
  updatePosition: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  annotations: AnnotationSelector(state),
  minimap: MapSelector(state),
});

const mapDispatchToProps = dispatch => ({
  updatePosition: (x, y) => {
    dispatch(updatePosition(x, y));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapContainer);

export default ConnectedContainer;
