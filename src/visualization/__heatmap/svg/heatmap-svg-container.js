import PropTypes from 'prop-types';
import React, { Component } from 'react';

import onResize from '../../../helpers/on-resize';

export class SvgDimensions extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.state = {
      contextTarget: '',
      contextEvent: null,
      height: {
        arrowsY: false, // Should the vertical navigation arrows be shown?
        heatmap: 0, // Height of heat map in the svg.
        pageY: 0, // The number of heat map cells along the y axis.
        wrapper: 0, // The height of the entire svg.
      },
      showSvg: false,
      showContext: '',
      tooltip: {
        display: false,
        left: 0,
        text: '',
        top: 0,
      },
      width: {
        arrowsX: false, // Should the horizontal navigation arrows be shown?
        canTranslate: false, // Should the image translate when the side panel opens?
        heatmap: 0, // Width of heat map in the svg.
        pageX: 0, // The number of heat map cells along the x axis.
        wrapper: 0, // The width of the entire svg.
      },
    };
  }
  componentDidMount = () => {
    const {
      columns,
      display,
      panel,
      rowNames,
      settings,
    } = this.props;
    this.setDimensions(settings.cellSize, columns, panel, rowNames, display);
    window.addEventListener('resize', this.onResize);
  }
  componentWillReceiveProps = (nextProps) => {
    this.updateDimensions(
      nextProps,
      this.props.settings,
      this.props.updateID,
      this.props.customizeID,
    );
    this.updateTranslate(nextProps, this.props.panel);
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onResize);
  }
  onResize = () => {
    onResize(this, this.resizeEnd, 800);
  }
  setDimensions = (cellSize, columns, panel, rows, display) => {
    const width = this.calculateWidth(cellSize, columns);
    const height = this.calculateHeight(cellSize, rows, width.arrowsX);
    const translate = this.setTranslate(display, panel, width);
    this.props.setDims(
      height.rows,
      width.columns,
      width.pageX,
      height.pageY,
      height.heatmap,
      width.heatmap,
    );
    this.setState({
      height,
      showSvg: true,
      width,
    });
    this.props.updatePlotXY(display.plotFixed, translate);
  }
  setTranslate = (display, panel, width) => {
    if (display.plotFixed) {
      return -(((window.innerWidth - width.wrapper) / 2) - 20);
    } else if (width.canTranslate && panel) {
      const freeWidth = window.innerWidth - width.wrapper;
      const sidePanel = Number(process.env.REACT_APP_SIDE_PANEL_WIDTH);
      const translateBy = freeWidth > sidePanel
        ? sidePanel / 2
        : (freeWidth / 2) - 20; // Subtract 20 to ensure image does overflow into padding.
      return -translateBy;
    }
    return 0;
  }
  calculateHeight = (cellSize, rows, removePadding) => {
    const arrowPadding = Number(process.env.REACT_APP_HEATMAP_ARROW_PADDING);
    const colMargin = Number(process.env.REACT_APP_HEATMAP_COL_MARGIN);
    const padding = Number(process.env.REACT_APP_HEATMAP_PADDING);
    const vertPadding = Number(process.env.REACT_APP_HEATMAP_VERT_PADDING);

    // Available height for image wrapper.
    let wrapper = this.wrapperRef.current.getBoundingClientRect().height - vertPadding;

    // If horizontal scroll arrows are being shown, remove some more height from wrapper.
    if (removePadding) {
      wrapper -= arrowPadding;
    }

    // Available height for plot and maximum number of rows.
    const heatmap = wrapper - colMargin;
    const pageY = Math.floor(heatmap / cellSize);

    /* If there are not enough rows to fill available height,
    ** shrink the dimensions to what is needed */
    const rowNum = rows.length;
    const height = {};
    if (pageY > rowNum) {
      height.arrowsY = false;
      height.heatmap = rowNum * cellSize;
      height.pageY = rowNum;
      height.rows = rowNum;
      height.wrapper = height.heatmap + colMargin + padding;
    } else {
      height.arrowsY = true;
      height.heatmap = pageY * cellSize;
      height.pageY = pageY;
      height.rows = rowNum;
      height.wrapper = wrapper;
    }
    return height;
  }
  calculateWidth = (cellSize, columns) => {
    const horzPadding = Number(process.env.REACT_APP_HEATMAP_HORZ_PADDING);
    const padding = Number(process.env.REACT_APP_HEATMAP_PADDING);
    const rowMargin = Number(process.env.REACT_APP_HEATMAP_ROW_MARGIN);

    // Maximum sizes.
    const wrapper = this.wrapperRef.current.getBoundingClientRect().width - horzPadding;
    const heatmap = wrapper - rowMargin;
    const pageX = Math.floor(heatmap / cellSize);

    /* If there are not enough columns to fill available width,
    ** shrink the dimensions to what is needed */
    const columnNum = columns.names.length;
    const width = {};
    if (pageX > columnNum) {
      width.arrowsX = false;
      width.canTranslate = true;
      width.columns = columnNum;
      width.heatmap = columnNum * cellSize;
      width.pageX = columnNum;
      width.wrapper = width.heatmap + rowMargin + padding;
    } else {
      width.arrowsX = true;
      width.columns = columnNum;
      width.canTranslate = false;
      width.heatmap = pageX * cellSize;
      width.pageX = pageX;
      width.wrapper = wrapper;
    }
    return width;
  }
  closeContextMenu = () => {
    this.setState({
      contextEvent: null,
      showContext: '',
    });
  }
  handleClick = (e, target, type) => {
    if (e.shiftKey && type === 'column') {
      this.sortRows(target);
    } else if (e.altKey && type === 'column') {
      this.props.setSelectedGenes([target], 'columns', 'columnsSelected');
    } else if (e.altKey && type === 'row') {
      this.props.setSelectedGenes([target], 'rows', 'rowsSelected');
    }
  }
  openContextMenu = (e, target, type) => {
    e.preventDefault();
    const rect = this.wrapperRef.current.getBoundingClientRect();
    const left = e.clientX - rect.left;
    const top = e.clientY - rect.top;
    this.setState({
      contextTarget: target,
      contextEvent: {
        clientX: left,
        clientY: top,
      },
      showContext: type,
    });
  }
  resizeEnd = () => {
    const {
      columns,
      display,
      panel,
      rowNames,
      settings,
    } = this.props;
    this.setDimensions(settings.cellSize, columns, panel, rowNames, display);
  }
  sortRows = (column, direction) => {
    const columnIndex = this.props.columns.names.indexOf(column);
    const refIndex = this.props.columns.names.indexOf(this.props.columns.ref);
    this.props.sort(columnIndex, direction, refIndex >= 0 ? refIndex : null);
  }
  toggleTooltip = (needsTooltip, shouldDisplay, text, left = 0, top = 0) => {
    if (needsTooltip) {
      const { display } = this.props;
      this.setState({
        tooltip: {
          display: shouldDisplay,
          left: left - display.plotTranslate,
          text,
          top,
        },
      });
    } else {
      this.setState({
        tooltip: {
          display: false,
          left: 0,
          text: null,
          top: 0,
        },
      });
    }
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
    columns,
    customizeID,
    display,
    panel,
    rowNames,
    settings,
    updateID,
  }, prevSettings, prevUpdateID, prevCustomizeID) => {
    if (
      updateID !== prevUpdateID ||
      customizeID !== prevCustomizeID ||
      settings.cellSize !== prevSettings.cellSize
    ) {
      this.setDimensions(settings.cellSize, columns, panel, rowNames, display);
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
        closeContextMenu: this.closeContextMenu,
        contextTarget: this.state.contextTarget,
        contextEvent: this.state.contextEvent,
        fixLeft: this.props.display.plotFixed,
        handleClick: this.handleClick,
        height: this.state.height,
        openContextMenu: this.openContextMenu,
        plotTranslate: this.props.display.plotTranslate,
        reference: this.props.columns.ref,
        setSelections: this.props.setSelectedGenes,
        setContainerRef: this.wrapperRef,
        setReference: this.props.setRef,
        show: this.state.showSvg,
        showContext: this.state.showContext,
        sortRows: this.sortRows,
        tooltip: this.state.tooltip,
        toggleTooltip: this.toggleTooltip,
        translateLeft: this.translateLeft,
        width: this.state.width,
      })
    );
  }
}

SvgDimensions.defaultProps = {
  customizeID: null,
  setSelectedGenes: null,
  updateID: null,
};

SvgDimensions.propTypes = {
  columns: PropTypes.shape({
    names: PropTypes.arrayOf(PropTypes.string),
    ref: PropTypes.string,
  }).isRequired,
  customizeID: PropTypes.number,
  display: PropTypes.shape({
    plotFixed: PropTypes.bool,
    plotTranslate: PropTypes.number,
  }).isRequired,
  panel: PropTypes.bool.isRequired,
  renderProp: PropTypes.func.isRequired,
  rowNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  setDims: PropTypes.func.isRequired,
  setRef: PropTypes.func.isRequired,
  setSelectedGenes: PropTypes.func,
  settings: PropTypes.shape({
    cellSize: PropTypes.number,
  }).isRequired,
  sort: PropTypes.func.isRequired,
  updatePlotXY: PropTypes.func.isRequired,
  updateID: PropTypes.number,
};

const renderDims = props => <SvgDimensions {...props} />;

export default renderDims;
