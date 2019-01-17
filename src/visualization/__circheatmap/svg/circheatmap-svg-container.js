import PropTypes from 'prop-types';
import React, { Component } from 'react';

import onResize from '../../../helpers/on-resize';

export class SvgDimensions extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.state = {
      dims: {
        canTranslate: false,
        wrapper: 0, // The height of the entire svg
      },
      showSvg: false,
    };
  }
  componentDidMount = () => {
    const {
      display,
      panel,
      plot,
    } = this.props;
    this.setDimensions(panel, display, plot.segments.length);
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
  setDimensions = (panel, display, circleNumber) => {
    const dims = this.calculateDims();
    const thickness = this.defineThickness(circleNumber, dims.wrapper);
    const translate = this.setTranslate(display, panel, dims);
    this.setState({
      dims,
      showSvg: true,
    });
    this.props.updatePlotXY(display.plotFixed, translate);
    this.props.updateSettingValue('thickness', thickness);
  }
  setTranslate = (display, panel, dims) => {
    if (display.plotFixed) {
      return -(((window.innerWidth - dims.wrapper) / 2) - 20);
    } else if (dims.canTranslate && panel) {
      const freeWidth = window.innerWidth - dims.wrapper;
      const panelWidth = process.env.REACT_APP_SIDE_PANEL_WIDTH;
      const translateBy = freeWidth > panelWidth
        ? panelWidth / 2
        : (freeWidth / 2) - 20; // Subtract 20 to ensure image does overflow into padding.
      return -translateBy;
    }
    return 0;
  }
  calculateDims = () => {
    const { height, width } = this.wrapperRef.current.getBoundingClientRect();
    const padding = process.env.REACT_APP_CIRCHEATMAP_PLOT_PADDING;
    return {
      canTranslate: height < width,
      wrapper: height < width ? height - padding : width - padding,
    };
  }
  defineThickness = (circleNumber, height) => {
    let thickness = Number(process.env.REACT_APP_CIRCHEATMAP_THICKNESS);
    const radius = height / 2;
    if (thickness * (1 + (1.25 * circleNumber)) > radius) {
      thickness = Math.floor(radius / (1 + (1.25 * circleNumber)));
    }
    return thickness;
  }
  resizeEnd = () => {
    const { display, panel } = this.props;
    this.setDimensions(panel, display);
  }
  translateLeft = () => {
    const { display, panel } = this.props;
    const { dims } = this.state;
    this.props.updatePlotXY(
      !display.plotFixed,
      this.setTranslate({ plotFixed: !display.plotFixed }, panel, dims),
    );
  }
  updateDimensions = ({
    display,
    panel,
    plot,
    updateID,
  }, prevUpdateID) => {
    if (updateID !== prevUpdateID) {
      this.setDimensions(panel, display, plot.segments.length);
    }
  }
  updateTranslate = ({ display, panel }, prevPanel) => {
    if (
      panel !== prevPanel &&
      !display.plotFixed
    ) {
      const { dims } = this.state;
      this.props.updatePlotXY(
        false,
        this.setTranslate(display, panel, dims),
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
  plot: PropTypes.shape({
    segments: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  renderProp: PropTypes.func.isRequired,
  updatePlotXY: PropTypes.func.isRequired,
  updateID: PropTypes.number,
  updateSettingValue: PropTypes.func.isRequired,
};

const renderDims = props => <SvgDimensions {...props} />;

export default renderDims;
