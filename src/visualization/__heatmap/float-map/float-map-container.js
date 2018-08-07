import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import FloatMap from './float-map';
import MapSelector from '../../../state/selectors/visualization/map-selector';
import { toggleMapAttach } from '../../../state/set/visualization/map-actions';

export class FloatMapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseDown: false,
      right: 20,
      top: 100,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    this.resetPosition(nextProps, this.props.minimap.attached);
  }
  componentWillUnmount = () => {
    if (this.props.minimap.attached) {
      this.props.attachMap();
    }
  }
  handleMouseDown = () => {
    this.setState({ mouseDown: true });
  }
  handleMouseMove = (e) => {
    if (this.state.mouseDown) {
      const { clientX, clientY } = e;
      this.setState({
        right: window.innerWidth - clientX - 32,
        top: clientY - 20,
      });
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
      this.setState({
        right: 20,
        top: 100,
      });
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
        right={this.state.right}
        top={this.state.top}
      />
    );
  }
}

FloatMapContainer.propTypes = {
  attachMap: PropTypes.func.isRequired,
  minimap: PropTypes.shape({
    attached: PropTypes.bool,
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  minimap: MapSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  attachMap: () => {
    dispatch(toggleMapAttach());
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FloatMapContainer);

export default ConnectedContainer;
