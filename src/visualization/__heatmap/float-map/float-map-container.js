import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import columnSelector from '../../../state/selectors/visualization/columns-selector';
import debounce from '../../../helpers/debounce';
import FloatMap from './float-map';
import mapSelector from '../../../state/selectors/visualization/map-selector';
import rowNameSelector from '../../../state/selectors/visualization/row-name-selector';
import { displaySelector } from '../../../state/selectors/visualization/display-selector';
import { toggleMapAttach } from '../../../state/set/visualization/map-actions';
import { resetMapPosition, updateMapPosition } from '../../../state/set/visualization/display-actions';

export class FloatMapContainer extends PureComponent {
  constructor(props) {
    super(props);
    const { columns, rows } = this.props;
    this.mapRef = React.createRef();
    this.imageLimits = this.setImageLimits();
    this.state = {
      height: 'auto',
      imageLimits: this.setInitialLimits(columns.names, rows),
      mouseDown: false,
      opacity: 1,
      opaque: true,
      scale: true,
      width: 'auto',
    };
  }
  componentDidMount = () => {
    window.addEventListener('resize', this.debouncedResize);
  }
  componentDidUpdate = (prevProps) => {
    this.resetPosition(this.props.minimap.attached, prevProps.minimap.attached);
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
  setInitialLimits = (columns, rows) => {
    const maxHeight = window.innerHeight - 20 > 1000 ? 1000 : window.innerHeight - 20;
    const maxWidth = window.innerWidth / 2 > 1000 ? 1000 : window.innerWidth / 2;
    const maxImageSize = columns.length > rows.length ? maxWidth : maxHeight - 60;
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
      x,
      y,
      width,
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
    this.setState({
      height: dimensions.height,
      imageLimits: {
        maxHeight: dimensions.height - 10,
        maxWidth: dimensions.width - 10,
        panelHeight: 'auto',
      },
      width: dimensions.width,
    });
  }
  reattach = () => {
    const { attachMap } = this.props;
    attachMap();
    this.setState({
      opacity: 1,
      opaque: true,
      scale: true,
    });
  }
  resetPosition = (attached, prevAttached) => {
    if (
      attached !== prevAttached
      && attached
    ) {
      this.props.resetMapPosition();
    }
  };
  toggleVisibility = () => {
    this.setState(({ scale }) => ({
      opacity: 1,
      opaque: true,
      scale: !scale,
    }));
  }
  toggleOpacity = () => {
    this.setState(({ opaque }) => ({
      opaque: !opaque,
      scale: true,
    }));
  }
  render() {
    return (
      <FloatMap
        attached={this.props.minimap.attached}
        attachMap={this.reattach}
        handleMouseDownMove={this.handleMouseDownMove}
        handleMouseDownResize={this.handleMouseDownResize}
        handleMouseMove={this.handleMouseMove}
        handleMouseUp={this.handleMouseUp}
        height={this.state.height}
        imageLimits={this.state.imageLimits}
        mouseDown={this.state.mouseDown}
        mouseEnter={this.handleMouseEnter}
        mouseLeave={this.handleMouseLeave}
        opacity={this.state.opacity}
        opaque={this.state.opaque}
        ref={this.mapRef}
        right={this.props.display.floatMapRight}
        scale={this.state.scale}
        toggleOpacity={this.toggleOpacity}
        toggleVisibility={this.toggleVisibility}
        top={this.props.display.floatMapTop}
        width={this.state.width}
      />
    );
  }
}

FloatMapContainer.propTypes = {
  attachMap: PropTypes.func.isRequired,
  columns: PropTypes.shape({
    names: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  display: PropTypes.shape({
    floatMapRight: PropTypes.number,
    floatMapTop: PropTypes.number,
  }).isRequired,
  minimap: PropTypes.shape({
    attached: PropTypes.bool,
  }).isRequired,
  resetMapPosition: PropTypes.func.isRequired,
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateMapPosition: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  columns: columnSelector(state),
  display: displaySelector(state),
  minimap: mapSelector(state),
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
  updateMapPosition: (right, top) => {
    dispatch(updateMapPosition(right, top));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FloatMapContainer);

export default ConnectedContainer;
