import PropTypes from 'prop-types';
import React, { Component } from 'react';

import onResize from '../../../helpers/on-resize';

const PLOT_PADDING = 30;
const SIDE_PANEL = 400;

export class SvgDimensions extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.state = {
      dims: {
        canTranslate: false,
        wrapper: 0, // The height of the entire svg.
      },
      showSvg: false,
    };
  }
  componentDidMount = () => {
    const {
      display,
      panel,
    } = this.props;
    this.setDimensions(panel, display);
    window.addEventListener('resize', this.onResize);
  }
  componentWillReceiveProps = (nextProps) => {
    this.updateDimensions(
      nextProps,
      this.props.updateID,
    );
    this.updateTranslate(nextProps, this.props.panel);
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onResize);
  }
  onResize = () => {
    onResize(this, this.resizeEnd, 800);
  }
  setDimensions = (panel, display) => {
    const dims = this.calculateDims();
    const translate = this.setTranslate(display, panel, dims);
    this.setState({
      dims,
      showSvg: true,
    });
    this.props.updatePlotXY(display.plotFixed, translate);
  }
  setTranslate = (display, panel, dims) => {
    if (display.plotFixed) {
      return -(((window.innerWidth - dims.wrapper) / 2) - 20);
    } else if (dims.canTranslate && panel) {
      const freeWidth = window.innerWidth - dims.wrapper;
      const translateBy = freeWidth > SIDE_PANEL ?
        SIDE_PANEL / 2
        : (freeWidth / 2) - 20; // Subtract 20 to ensure image does overflow into padding.
      return -translateBy;
    }
    return 0;
  }
  calculateDims = () => {
    const { height, width } = this.wrapperRef.current.getBoundingClientRect();
    return {
      canTranslate: height < width,
      wrapper: height < width ? height - PLOT_PADDING : width - PLOT_PADDING,
    };
  }
  resizeEnd = () => {
    const { display, panel } = this.props;
    this.setDimensions(panel, display);
  }
  translateLeft = () => {
    const { display, panel } = this.props;
    const { width } = this.state;
    this.props.updatePlotXY(
      !display.plotFixed,
      this.setTranslate({ plotFixed: !display.plotFixed }, panel, width),
    );
  }
  updateDimensions = ({
    display,
    panel,
    updateID,
  }, prevUpdateID) => {
    if (updateID !== prevUpdateID) {
      this.setDimensions(panel, display);
    }
  }
  updateTranslate = ({ display, panel }, prevPanel) => {
    if (
      panel !== prevPanel &&
      !display.plotFixed
    ) {
      const { width } = this.state;
      this.props.updatePlotXY(
        false,
        this.setTranslate(display, panel, width),
      );
    }
  }
  render() {
    return (
      this.props.renderProp({
        fixLeft: this.props.display.plotFixed,
        pieDimensions: this.state.dims,
        plotTranslate: this.props.display.plotTranslate,
        setContainerRef: this.wrapperRef,
        show: this.state.showSvg,
        translateLeft: this.translateLeft,
      })
    );
  }
}

SvgDimensions.defaultProps = {
  updateID: null,
};

SvgDimensions.propTypes = {
  display: PropTypes.shape({
    plotFixed: PropTypes.bool,
    plotTranslate: PropTypes.number,
  }).isRequired,
  panel: PropTypes.bool.isRequired,
  renderProp: PropTypes.func.isRequired,
  updatePlotXY: PropTypes.func.isRequired,
  updateID: PropTypes.number,
};

const renderDims = props => <SvgDimensions {...props} />;

export default renderDims;
