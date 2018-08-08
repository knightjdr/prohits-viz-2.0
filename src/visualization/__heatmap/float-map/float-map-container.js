import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import FloatMap from './float-map';
import MapSelector from '../../../state/selectors/visualization/map-selector';
import { DisplaySelector } from '../../../state/selectors/visualization/display-selector';
import { toggleMapAttach } from '../../../state/set/visualization/map-actions';
import { resetMapPosition, updateMapPosition } from '../../../state/set/visualization/display-actions';

export class FloatMapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseDown: false,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    this.resetPosition(nextProps, this.props.minimap.attached);
  }
  handleMouseDown = () => {
    this.setState({ mouseDown: true });
  }
  handleMouseMove = (e) => {
    if (this.state.mouseDown) {
      const { clientX, clientY } = e;
      // 32 and 20 are the right and top position of the arrow icon.
      this.props.updateMapPosition(window.innerWidth - clientX - 32, clientY - 20);
    }
  }
  handleMouseUp = () => {
    this.setState({ mouseDown: false });
  }
  resetPosition = ({ minimap }, prevAttached) => {
    if (
      minimap.attached !== prevAttached &&
      minimap.attached
    ) {
      this.props.resetMapPosition();
    }
  };
  render() {
    return (
      <FloatMap
        attached={this.props.minimap.attached}
        attachMap={this.props.attachMap}
        handleMouseDown={this.handleMouseDown}
        handleMouseMove={this.handleMouseMove}
        handleMouseUp={this.handleMouseUp}
        mouseDown={this.state.mouseDown}
        right={this.props.display.floatMapRight}
        top={this.props.display.floatMapTop}
      />
    );
  }
}

FloatMapContainer.propTypes = {
  attachMap: PropTypes.func.isRequired,
  display: PropTypes.shape({
    floatMapRight: PropTypes.number,
    floatMapTop: PropTypes.number,
  }).isRequired,
  minimap: PropTypes.shape({
    attached: PropTypes.bool,
  }).isRequired,
  resetMapPosition: PropTypes.func.isRequired,
  updateMapPosition: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  display: DisplaySelector(state),
  minimap: MapSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  attachMap: () => {
    dispatch(toggleMapAttach());
  },
  resetMapPosition: () => {
    dispatch(resetMapPosition());
  },
  updateMapPosition: (right, top) => {
    dispatch(updateMapPosition(right, top));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FloatMapContainer);

export default ConnectedContainer;
