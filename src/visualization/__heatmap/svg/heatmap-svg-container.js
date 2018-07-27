import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ColumnsSelector from '../../../state/selectors/visualization/columns-selector';
import RowNameSelector from '../../../state/selectors/visualization/row-name-selector';
import SettingSelector from '../../../state/selectors/visualization/settings-selector';
import Svg from './heatmap-svg';
import { setDimensions } from '../../../state/set/visualization/dimension-actions';
import { setReference } from '../../../state/set/visualization/columns-actions';
import { sortRows } from '../../../state/set/visualization/rows-actions';

const COL_MARGIN = 100;
const ROW_MARGIN = 100;

export class SvgContainer extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.state = {
      contextColumnTarget: '',
      contextEvent: null,
      height: {
        arrowsY: false, // Should the vertical navigation arrows be shown?
        heatmap: 0, // Height of heat map in the svg.
        pageY: 0, // The number of heat map cells along the y axis.
        wrapper: 0, // The height of the entire svg.
      },
      showSvg: false,
      showColumnContext: false,
      tooltip: {
        display: false,
        left: 0,
        text: '',
        top: 0,
      },
      width: {
        arrowsX: false, // Should the horizontal navigation arrows be shown?
        heatmap: 0, // Width of heat map in the svg.
        pageX: 0, // The number of heat map cells along the x axis.
        wrapper: 0, // The width of the entire svg.
      },
    };
  }
  componentDidMount = () => {
    const { cellSize, columns, rows } = this.props;
    this.setDimensions(cellSize, columns, rows);
  }
  componentWillReceiveProps = (nextProps) => {
    this.updateDimensions(nextProps, this.props.cellSize);
  }
  setDimensions = (cellSize, columns, rows) => {
    const height = this.calculateHeight(cellSize, rows);
    const width = this.calculateWidth(cellSize, columns);
    this.props.setDimensions(
      height.rows,
      width.columns,
      width.pageX,
      height.pageY,
    );
    this.setState({
      height,
      showSvg: true,
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
      height.wrapper = height.heatmap + COL_MARGIN;
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
      width.heatmap = columnNum * cellSize;
      width.pageX = columnNum;
      width.columns = columnNum;
      width.wrapper = width.heatmap + ROW_MARGIN;
    } else {
      width.arrowsX = true;
      width.heatmap = pageX * cellSize;
      width.pageX = pageX;
      width.columns = columnNum;
      width.wrapper = wrapper;
    }
    return width;
  }
  closeContextMenu = () => {
    this.setState({
      contextEvent: null,
      showColumnContext: false,
    });
  }
  openColumnContextMenu = (e, column) => {
    e.preventDefault();
    this.setState({
      contextColumnTarget: column,
      contextEvent: {
        clientX: e.clientX,
        clientY: e.clientY,
      },
      showColumnContext: true,
    });
  }
  sortRows = (shiftKey, column, direction) => {
    if (shiftKey) {
      const columnIndex = this.props.columns.names.indexOf(column);
      const refIndex = this.props.columns.names.indexOf(this.props.columns.ref);
      this.props.sortRows(columnIndex, direction, refIndex >= 0 ? refIndex : null);
    }
  }
  toggleTooltip = (needsTooltip, display, text, left = 0, top = 0) => {
    if (needsTooltip) {
      this.setState({
        tooltip: {
          display,
          left,
          text,
          top,
        },
      });
    }
  }
  updateDimensions = ({ cellSize, columns, rows }, prevCellSize) => {
    if (cellSize !== prevCellSize) {
      this.setDimensions(cellSize, columns, rows);
    }
  }
  render() {
    return (
      <div
        className="heatmap-svg__wrapper"
        ref={this.wrapperRef}
      >
        <Svg
          closeContextMenu={this.closeContextMenu}
          contextColumnTarget={this.state.contextColumnTarget}
          contextEvent={this.state.contextEvent}
          height={this.state.height}
          openColumnContextMenu={this.openColumnContextMenu}
          reference={this.props.columns.ref}
          setReference={this.props.setReference}
          show={this.state.showSvg}
          showColumnContext={this.state.showColumnContext}
          sortRows={this.sortRows}
          tooltip={this.state.tooltip}
          toggleTooltip={this.toggleTooltip}
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
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  setDimensions: PropTypes.func.isRequired,
  setReference: PropTypes.func.isRequired,
  sortRows: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  cellSize: SettingSelector(state, 'cellSize'),
  columns: ColumnsSelector(state),
  rows: RowNameSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  setDimensions: (rows, columns, height, width) => {
    dispatch(setDimensions(rows, columns, height, width));
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
