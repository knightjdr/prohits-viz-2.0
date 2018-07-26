import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ColumnsSelector from '../../../state/selectors/visualization/columns-selector';
import Round from '../../../helpers/round';
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
      contextPos: {
        left: 0,
        top: 0,
      },
      contextColumnTarget: '',
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
    const { cellSize, columns, rows } = nextProps;
    if (cellSize !== this.props.cellSize) {
      this.setDimensions(cellSize, columns, rows);
    }
  }
  setDimensions = (cellSize, columns, rows) => {
    const height = this.calculateHeight(cellSize, rows);
    const width = this.calculateWidth(cellSize, columns);
    this.props.setDimensions(
      height.rows,
      width.columns,
      height.pageYFrac,
      width.pageX,
      height.pageY,
      width.pageXFrac,
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
    const pageY = Math.floor(heatmap / this.props.cellSize);

    /* If there are not enough rows to fill available height,
    ** shrink the dimensions to what is needed */
    const rowNum = rows.length;
    const height = {};
    if (pageY > rowNum) {
      height.arrowsY = false;
      height.heatmap = rowNum * cellSize;
      height.pageY = rowNum;
      height.pageYFrac = 1;
      height.rows = rowNum;
      height.wrapper = height.heatmap + COL_MARGIN;
    } else {
      height.arrowsY = true;
      height.heatmap = heatmap;
      height.pageY = pageY;
      height.pageYFrac = Round(pageY / rowNum, 4);
      height.rows = rowNum;
      height.wrapper = wrapper;
    }
    return height;
  }
  calculateWidth = (cellSize, columns) => {
    // Maximum sizes.
    const wrapper = this.wrapperRef.current.getBoundingClientRect().width;
    const heatmap = wrapper - ROW_MARGIN;
    const pageX = Math.floor(heatmap / this.props.cellSize);

    /* If there are not enough columns to fill available width,
    ** shrink the dimensions to what is needed */
    const columnNum = columns.names.length;
    const width = {};
    if (pageX > columnNum) {
      width.arrowsX = false;
      width.heatmap = columnNum * cellSize;
      width.pageX = columnNum;
      width.pageXFrac = 1;
      width.columns = columnNum;
      width.wrapper = width.heatmap + ROW_MARGIN;
    } else {
      width.arrowsX = true;
      width.heatmap = heatmap;
      width.pageX = pageX;
      width.pageXFrac = Round(pageX / columnNum, 4);
      width.columns = columnNum;
      width.wrapper = wrapper;
    }
    return width;
  }
  closeContextMenu = () => {
    this.setState({ showColumnContext: false });
  }
  openColumnContextMenu = (e, column) => {
    e.preventDefault();
    const limitLeft = window.innerWidth - 130;
    this.setState({
      contextPos: {
        left: e.clientX < limitLeft ? e.clientX : limitLeft,
        top: e.clientY,
      },
      contextColumnTarget: column,
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
  render() {
    return (
      <div
        className="heatmap-svg__wrapper"
        ref={this.wrapperRef}
      >
        <Svg
          closeContextMenu={this.closeContextMenu}
          contextColumnTarget={this.state.contextColumnTarget}
          contextPos={this.state.contextPos}
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

SvgContainer.defaultProps = {
  cellSize: 20,
};

SvgContainer.propTypes = {
  cellSize: PropTypes.number,
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
  setDimensions: (rows, columns, height, pageX, pageY, width) => {
    dispatch(setDimensions(rows, columns, height, pageX, pageY, width));
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
