import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import columnSelector from '../../../state/selectors/visualization/columns-selector';
import debounce from '../../../helpers/debounce';
import FloatMap from './float-map';
import { mapSelectorProp } from '../../../state/selectors/visualization/map-selector';
import rowNameSelector from '../../../state/selectors/visualization/row-name-selector';
import { displaySelector } from '../../../state/selectors/visualization/display-selector';
import { toggleMapAttach } from '../../../state/set/visualization/map-actions';
import {
  resetMapPosition,
  toggleMapOpacity,
  toggleMapVisibility,
  updateMapPosition,
  updateMapSize,
} from '../../../state/set/visualization/display-actions';

export class FloatMapContainer extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.imageLimits = this.setImageLimits();
    this.state = {
      mouseDown: false,
      opacity: 1,
    };
  }
  componentDidMount = () => {
    window.addEventListener('resize', this.debouncedResize);
  }
  componentDidUpdate = (prevProps) => {
    this.resetPosition(this.props.attached, prevProps.attached);
  }
  static getDerivedStateFromProps = (props, state) => {
    if (
      props.attached
      && state.opacity === 0
    ) {
      return {
        opacity: 1,
      };
    }
    return null;
  }
  setImageLimits = () => ({
    height: {
      max: window.innerHeight - 60,
      min: 20,
    },
    width: {
      max: window.innerWidth - 20,
      min: 200,
    },
  })
  setImageMax = display => ({
    maxHeight: display.height - 10,
    maxWidth: display.width - 10,
    panelHeight: 'auto',
  });
  setInitialImageMax = (columns, rows, window) => {
    const maxHeight = window.innerHeight - 20 > 1000 ? 1000 : window.innerHeight - 20;
    const maxWidth = window.innerWidth / 2 > 1000 ? 1000 : window.innerWidth / 2;
    const maxImageSize = columns.length > rows.length ? maxWidth : maxHeight - 50;
    return {
      maxHeight: maxImageSize,
      maxWidth: maxImageSize,
      panelHeight: 'auto',
    };
  }
  componentWillUnMount = () => {
    window.RemoveEventListener('resize', this.debouncedResize);
  }
  debouncedResize = debounce(() => {
    this.imageLimits = this.setImageLimits();
  }, 100, false);
  handleMouseDown = (x, y, height, width) => {
    this.lastPosition = {
      height,
      width,
      x,
      y,
    };
    this.setState({ mouseDown: true });
  }
  handleMouseDownMove = (e) => {
    const { clientX, clientY } = e;
    this.moveType = 'move';
    this.handleMouseDown(clientX, clientY);
  }
  handleMouseDownResize = (e) => {
    const { clientX, clientY } = e;
    this.moveType = 'resize';
    const { clientHeight, clientWidth } = this.mapRef.current;
    this.handleMouseDown(clientX, clientY, clientHeight, clientWidth);
  }
  handleMouseEnter = () => {
    if (!this.props.display.opaque) {
      this.setState({
        opacity: 1,
      });
    }
  }
  handleMouseLeave = () => {
    if (
      !this.props.display.opaque
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
      if (this.moveType === 'resize') {
        this.resizeMap(clientX, clientY);
      } else {
        this.mapPosition(clientX, clientY);
      }
    }
  }
  handleMouseUp = () => {
    this.setState({ mouseDown: false });
  }
  mapPosition = (x, y) => {
    const { display } = this.props;
    const newPosition = {
      x: display.floatMapRight + (this.lastPosition.x - x),
      y: display.floatMapTop - (this.lastPosition.y - y),
    };
    this.lastPosition = {
      x,
      y,
    };
    this.props.updateMapPosition(newPosition.x, newPosition.y);
  }
  newDimensions = (change) => {
    const dimensions = {
      height: this.lastPosition.height - change.y,
      width: this.lastPosition.width + change.x,
    };
    if (dimensions.height > this.imageLimits.height.max) {
      dimensions.height = this.imageLimits.height.max;
    } else if (dimensions.height < this.imageLimits.height.min) {
      dimensions.height = this.imageLimits.height.min;
    }
    if (dimensions.width > this.imageLimits.width.max) {
      dimensions.width = this.imageLimits.width.max;
    } else if (dimensions.width < this.imageLimits.width.min) {
      dimensions.width = this.imageLimits.width.min;
    }
    return dimensions;
  }
  reattach = () => {
    const { attachMap } = this.props;
    attachMap();
    this.setState({
      opacity: 1,
    });
  }
  resizeMap = (x, y) => {
    const change = {
      x: this.lastPosition.x - x,
      y: this.lastPosition.y - y,
    };
    const dimensions = this.newDimensions(change);
    this.lastPosition = {
      height: dimensions.height,
      x,
      y,
      width: dimensions.width,
    };
    this.props.updateMapSize(dimensions.height, dimensions.width);
  }
  resetPosition = (attached, prevAttached) => {
    if (
      attached !== prevAttached
      && attached
    ) {
      this.props.resetMapPosition();
    }
  };
  render() {
    const { columns, display, rows } = this.props;
    const imageMax = display.height === 'auto' ? this.setInitialImageMax(columns.names, rows, window) : this.setImageMax(display);
    return (
      <FloatMap
        attached={this.props.attached}
        attachMap={this.reattach}
        handleMouseDownMove={this.handleMouseDownMove}
        handleMouseDownResize={this.handleMouseDownResize}
        handleMouseMove={this.handleMouseMove}
        handleMouseUp={this.handleMouseUp}
        height={display.height}
        imageMax={imageMax}
        mouseDown={this.state.mouseDown}
        mouseEnter={this.handleMouseEnter}
        mouseLeave={this.handleMouseLeave}
        opacity={this.state.opacity}
        opaque={display.opaque}
        ref={this.mapRef}
        right={display.floatMapRight}
        visible={display.visible}
        toggleOpacity={this.props.toggleOpacity}
        toggleVisibility={this.props.toggleVisibility}
        top={display.floatMapTop}
        width={display.width}
      />
    );
  }
}

FloatMapContainer.propTypes = {
  attached: PropTypes.bool.isRequired,
  attachMap: PropTypes.func.isRequired,
  columns: PropTypes.shape({
    names: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  display: PropTypes.shape({
    floatMapRight: PropTypes.number,
    floatMapTop: PropTypes.number,
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    opaque: PropTypes.bool,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }).isRequired,
  resetMapPosition: PropTypes.func.isRequired,
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleOpacity: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  updateMapPosition: PropTypes.func.isRequired,
  updateMapSize: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  attached: mapSelectorProp(state, 'attached'),
  columns: columnSelector(state),
  display: displaySelector(state),
  rows: rowNameSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  attachMap: () => {
    dispatch(toggleMapAttach());
  },
  resetMapPosition: () => {
    dispatch(resetMapPosition());
  },
  toggleOpacity: () => {
    dispatch(toggleMapOpacity());
  },
  toggleVisibility: () => {
    dispatch(toggleMapVisibility());
  },
  updateMapPosition: (right, top) => {
    dispatch(updateMapPosition(right, top));
  },
  updateMapSize: (height, width) => {
    dispatch(updateMapSize(height, width));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FloatMapContainer);

export default ConnectedContainer;
