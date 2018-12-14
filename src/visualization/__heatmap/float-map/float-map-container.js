import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import FloatMap from './float-map';
import MapSelector from '../../../state/selectors/visualization/map-selector';
import { displaySelector } from '../../../state/selectors/visualization/display-selector';
import { toggleMapAttach } from '../../../state/set/visualization/map-actions';
import { resetMapPosition, updateMapPosition } from '../../../state/set/visualization/display-actions';

export class FloatMapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 'auto',
      mouseDown: false,
      opacity: 1,
      opaque: true,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    this.resetPosition(nextProps, this.props.minimap.attached);
  }
  handleMouseDown = (e) => {
    const { clientX, clientY } = e;
    this.lastPosition = {
      x: clientX,
      y: clientY,
    };
    this.setState({ mouseDown: true });
  }
  handleMouseEnter = () => {
    if (!this.state.opaque) {
      this.setState({
        opacity: 1,
      });
    }
  }
  handleMouseLeave = () => {
    if (
      !this.state.opaque
      && !this.state.mouseDown
    ) {
      this.setState({
        opacity: 0,
      });
    }
  }
  handleMouseMove = (e) => {
    if (this.state.mouseDown) {
      const { clientX, clientY } = e;
      const { display } = this.props;
      const newPosition = {
        x: display.floatMapRight + (this.lastPosition.x - clientX),
        y: display.floatMapTop - (this.lastPosition.y - clientY),
      };
      this.lastPosition = {
        x: clientX,
        y: clientY,
      };
      this.props.updateMapPosition(newPosition.x, newPosition.y);
    }
  }
  handleMouseUp = () => {
    this.setState({ mouseDown: false });
  }
  reattach = () => {
    const { attachMap } = this.props;
    attachMap();
    this.setState({
      height: 'auto',
      opacity: 1,
      opaque: true,
    });
  }
  resetPosition = ({ minimap }, prevAttached) => {
    if (
      minimap.attached !== prevAttached &&
      minimap.attached
    ) {
      this.props.resetMapPosition();
    }
  };
  toggleHeight = () => {
    this.setState(({ height }) => ({
      height: height ? 0 : 'auto',
      opacity: 1,
      opaque: true,
    }));
  }
  toggleOpacity = () => {
    this.setState(({ opaque }) => ({
      height: 'auto',
      opaque: !opaque,
    }));
  }
  render() {
    return (
      <FloatMap
        attached={this.props.minimap.attached}
        attachMap={this.reattach}
        handleMouseDown={this.handleMouseDown}
        handleMouseMove={this.handleMouseMove}
        handleMouseUp={this.handleMouseUp}
        height={this.state.height}
        mouseDown={this.state.mouseDown}
        mouseEnter={this.handleMouseEnter}
        mouseLeave={this.handleMouseLeave}
        opacity={this.state.opacity}
        opaque={this.state.opaque}
        right={this.props.display.floatMapRight}
        toggleHeight={this.toggleHeight}
        toggleOpacity={this.toggleOpacity}
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
  display: displaySelector(state),
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
