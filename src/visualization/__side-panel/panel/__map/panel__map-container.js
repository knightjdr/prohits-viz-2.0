import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnnotationSelector from '../../../../state/selectors/visualization/annotation-selector';
import DimensionSelector from '../../../../state/selectors/visualization/dimension-selector';
import Map from './panel__map';
import MapSelector from '../../../../state/selectors/visualization/map-selector';
import MarkerSelector from '../../../../state/selectors/visualization/marker-selector';
import PositionSelector from '../../../../state/selectors/visualization/position-selector';
import { syncMap } from '../../../../state/set/visualization/map-actions';
import { toggleAnnotations } from '../../../../state/set/visualization/annotation-actions';
import { updatePosition } from '../../../../state/set/visualization/position-actions';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    const { dimensions, markers, position } = this.props;
    this.state = {
      markers: this.convertMarkers(dimensions, markers),
      rangeBox: this.setRange(dimensions, position),
    };
  }
  componentWillReceiveProps = (nextProps) => {
    this.updateMarkers(nextProps, this.props.markers);
    this.updateRange(nextProps, this.props.dimensions, this.props.position);
  }
  setRange = (dimensions, position) => ({
    height: `${(dimensions.pageY / dimensions.rows) * 100}%`,
    left: `${(position.x / dimensions.columns) * 100}%`,
    top: `${(position.y / dimensions.rows) * 100}%`,
    width: `${(dimensions.pageX / dimensions.columns) * 100}%`,
  })
  convertMarkers = (dimensions, markers) => ({
    color: markers.color,
    list: markers.list.map(marker => ({
      height: marker.height / dimensions.rows,
      width: marker.width / dimensions.columns,
      x: marker.x / dimensions.columns,
      y: marker.y / dimensions.rows,
    })),
  })
  navigatePosition = (e) => {
    const rect = e.target.getBoundingClientRect();
    // Calculate mouse position as percentage of container.
    let x = (e.clientX - rect.left) / rect.width;
    let y = (e.clientY - rect.top) / rect.height;

    /* Move x and y positions so that event click represents center of
    ** new region. So move x by width / 2 and y by height / 2. */
    const {
      columns,
      pageX,
      pageY,
      rows,
    } = this.props.dimensions;
    const height = pageY / rows;
    const width = pageX / columns;
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

    // Convert x an y to cell numbers.
    x = Math.round(x * columns);
    y = Math.round(y * rows);
    this.props.updatePosition(x, y);
  }
  updateMarkers = ({ dimensions, markers }, prevMarkers) => {
    if (markers.list.length !== prevMarkers.list.length) {
      this.setState({
        markers: this.convertMarkers(dimensions, markers),
      });
    }
  }
  updateRange = ({ dimensions, position }, prevDimensions, prevPosition) => {
    if (
      dimensions.pageX !== prevDimensions.pageX ||
      dimensions.pageY !== prevDimensions.pageY ||
      position.x !== prevPosition.x ||
      position.y !== prevPosition.y
    ) {
      this.setState({
        rangeBox: this.setRange(dimensions, position),
      });
    }
  }
  render() {
    return (
      <Map
        annotations={this.props.annotations}
        dimensions={this.props.dimensions}
        isSyncing={this.props.minimap.isSyncing}
        markers={this.state.markers}
        minimap={this.props.minimap.image}
        navigatePosition={this.navigatePosition}
        rangeBox={this.state.rangeBox}
        showAnnotations={this.props.annotations.show}
        synced={this.props.minimap.synced}
        syncError={this.props.minimap.synced}
        syncImage={this.props.minimap.syncImage}
        syncMap={this.props.syncMap}
        toggleAnnotations={this.props.toggleAnnotations}
      />
    );
  }
}

MapContainer.propTypes = {
  annotations: PropTypes.shape({
    show: PropTypes.bool,
  }).isRequired,
  dimensions: PropTypes.shape({
    columns: PropTypes.number,
    pageX: PropTypes.number,
    pageY: PropTypes.number,
    rows: PropTypes.number,
  }).isRequired,
  markers: PropTypes.shape({}).isRequired,
  minimap: PropTypes.shape({
    image: PropTypes.string,
    isSyncing: PropTypes.bool,
    synced: PropTypes.bool,
    syncError: PropTypes.bool,
    syncImage: PropTypes.string,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  syncMap: PropTypes.func.isRequired,
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
  syncMap: () => {
    dispatch(syncMap());
  },
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
