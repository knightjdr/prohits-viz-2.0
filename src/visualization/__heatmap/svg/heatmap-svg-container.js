import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ColumnsSelector from '../../../state/selectors/visualization/columns-selector';
import OnResize from '../../../helpers/on-resize';
import PanelSelector from '../../../state/selectors/visualization/panel-selector';
import RowNameSelector from '../../../state/selectors/visualization/row-name-selector';
import SettingSelector from '../../../state/selectors/visualization/settings-selector';
import Svg from './heatmap-svg';
import { setDimensions } from '../../../state/set/visualization/dimension-actions';
import { setReference } from '../../../state/set/visualization/columns-actions';
import { setSelections } from '../../../state/set/visualization/genes-actions';
import { sortRows } from '../../../state/set/visualization/rows-actions';

import './heatmap-svg.css';

const COL_MARGIN = 100;
const EXTRA_PADDING = 2;
const ROW_MARGIN = 100;
const SIDE_PANEL = 400;

export class SvgContainer extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.state = {
      contextTarget: '',
      contextEvent: null,
      fixLeft: false,
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
      translate: 'translate(0)',
      width: {
        arrowsX: false, // Should the horizontal navigation arrows be shown?
        canTranslate: false, // Should the image translate when the side panel opens?
        heatmap: 0, // Width of heat map in the svg.
        pageX: 0, // The number of heat map cells along the x axis.
        translate: 0, // The amount to translate the wrapper by if canTranslate = true.
        wrapper: 0, // The width of the entire svg.
      },
    };
  }
  componentDidMount = () => {
    const {
      cellSize,
      columns,
      panel,
      rows,
    } = this.props;
    this.setDimensions(cellSize, columns, panel, rows);
    window.addEventListener('resize', this.onResize);
  }
  componentWillReceiveProps = (nextProps) => {
    this.updateDimensions(nextProps, this.props.cellSize);
    this.updateTranslate(nextProps, this.props.panel);
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onResize);
  }
  onResize = () => {
    OnResize(this, this.resizeEnd, 800);
  }
  setDimensions = (cellSize, columns, panel, rows) => {
    const height = this.calculateHeight(cellSize, rows);
    const width = this.calculateWidth(cellSize, columns);
    const translate = this.wrapperPosition(panel, width);
    this.props.setDimensions(
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
      translate,
      width,
    });
  }
  calculateHeight = (cellSize, rows) => {
    // Maximum sizes.
    const wrapper = this.wrapperRef.current.getBoundingClientRect().height;
    const heatmap = wrapper - COL_MARGIN;
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
      height.wrapper = height.heatmap + COL_MARGIN + EXTRA_PADDING;
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
    // Maximum sizes.
    const wrapper = this.wrapperRef.current.getBoundingClientRect().width;
    const heatmap = wrapper - ROW_MARGIN;
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
      width.wrapper = width.heatmap + ROW_MARGIN + EXTRA_PADDING;
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
      this.props.setSelections([target], 'columns', 'columnsSelected');
    } else if (e.altKey && type === 'row') {
      this.props.setSelections([target], 'rows', 'rowsSelected');
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
    const { cellSize, columns, rows } = this.props;
    this.setDimensions(cellSize, columns, rows);
  }
  sortRows = (column, direction) => {
    const columnIndex = this.props.columns.names.indexOf(column);
    const refIndex = this.props.columns.names.indexOf(this.props.columns.ref);
    this.props.sortRows(columnIndex, direction, refIndex >= 0 ? refIndex : null);
  }
  toggleTooltip = (needsTooltip, display, text, left = 0, top = 0) => {
    if (needsTooltip) {
      const { panel } = this.props;
      this.setState(({ width }) => ({
        tooltip: {
          display,
          left: panel ? left + width.translate : left,
          text,
          top,
        },
      }));
    }
  }
  translateLeft = () => {
    const { panel } = this.props;
    this.setState(({ fixLeft, width }) => {
      const translateBy = ((window.innerWidth - width.wrapper) / 2) - 20;
      return {
        fixLeft: !fixLeft,
        translate: fixLeft ? this.wrapperPosition(panel, width) : `translate(-${translateBy}px)`,
      };
    });
  }
  updateDimensions = ({ cellSize, columns, rows }, prevCellSize) => {
    if (cellSize !== prevCellSize) {
      this.setDimensions(cellSize, columns, rows);
    }
  }
  updateTranslate = ({ panel }, prevPanel) => {
    if (
      panel !== prevPanel &&
      !this.state.fixLeft
    ) {
      this.setState(({ width }) => ({
        fixLeft: false,
        translate: this.wrapperPosition(panel, width),
      }));
    }
  }
  wrapperPosition = (panel, width) => {
    if (width.canTranslate && panel) {
      const freeWidth = window.innerWidth - width.wrapper;
      const translateBy = freeWidth > SIDE_PANEL ?
        SIDE_PANEL / 2
        : (freeWidth / 2) - 20; // Subtract 20 to ensure image does overflow into padding.
      return `translate(-${translateBy}px)`;
    }
    return 'translate(0)';
  }
  render() {
    return (
      <div
        className="heatmap-svg__wrapper"
        ref={this.wrapperRef}
        style={{
          transform: this.state.translate,
        }}
      >
        <Svg
          closeContextMenu={this.closeContextMenu}
          contextTarget={this.state.contextTarget}
          contextEvent={this.state.contextEvent}
          fixLeft={this.state.fixLeft}
          handleClick={this.handleClick}
          height={this.state.height}
          openContextMenu={this.openContextMenu}
          reference={this.props.columns.ref}
          setSelections={this.props.setSelections}
          setReference={this.props.setReference}
          show={this.state.showSvg}
          showContext={this.state.showContext}
          sortRows={this.sortRows}
          tooltip={this.state.tooltip}
          toggleTooltip={this.toggleTooltip}
          translateLeft={this.translateLeft}
          width={this.state.width}
        />
      </div>
    );
  }
}

SvgContainer.propTypes = {
  cellSize: PropTypes.number.isRequired,
  columns: PropTypes.shape({
    names: PropTypes.arrayOf(PropTypes.string),
    ref: PropTypes.string,
  }).isRequired,
  panel: PropTypes.bool.isRequired,
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  setDimensions: PropTypes.func.isRequired,
  setReference: PropTypes.func.isRequired,
  setSelections: PropTypes.func.isRequired,
  sortRows: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  cellSize: SettingSelector(state, 'cellSize'),
  columns: ColumnsSelector(state),
  panel: PanelSelector(state),
  rows: RowNameSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  setDimensions: (rows, columns, pageY, pageX, height, width) => {
    dispatch(setDimensions(rows, columns, pageY, pageX, height, width));
  },
  setSelections: (arr, source, target) => {
    dispatch(setSelections(arr, source, target));
  },
  setReference: (ref) => {
    dispatch(setReference(ref));
  },
  sortRows: (index, direction, ref) => {
    dispatch(sortRows(index, direction, ref));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SvgContainer);

export default ConnectedContainer;
