import PropTypes from 'prop-types';
import React, { Component } from 'react';

import onResize from '../../helpers/on-resize';
import Table from './table';

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.bodyRef = React.createRef();
    this.tableHeaderRef = React.createRef();
    this.tableRef = React.createRef();
    this.state = {
      height: 0,
      scrollLeftOffset: 0,
      scrollLeftPosition: 0,
      scrollLeftWidth: 0,
    };
  }
  componentDidMount = () => {
    this.setDimensions();
    window.addEventListener('resize', this.onResize);
    window.addEventListener('touchcancel', this.handleTouchEnd, false);
    window.addEventListener('touchend', this.handleTouchEnd, false);
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('touchcancel', this.handleTouchEnd, false);
    window.removeEventListener('touchend', this.handleTouchEnd, false);
  }
  onResize = () => {
    this.setState({
      bodyInnerWidth: 'auto',
      bodyWidth: 'auto',
    });
    onResize(this, this.setDimensions);
  }
  setDimensions = () => {
    const height = this.calculateHeight();
    const leftOffset = this.tableRef.current.clientWidth -
      this.tableHeaderRef.current.clientWidth - 1;
    this.setState({
      bodyInnerWidth: this.tableHeaderRef.current.clientWidth,
      bodyWidth: this.tableRef.current.clientWidth + height.scrollBarWidth,
      height: height.available,
      scrollLeftOffset: leftOffset,
      scrollLeftWidth: (this.tableRef.current.clientWidth - leftOffset) + 1,
    });
  };
  calculateHeight = () => {
    const { top } = this.tableRef.current.getBoundingClientRect();
    // 48 is the pixel height of the table header.
    const available = window.innerHeight - top - this.props.bottom - 48;
    const needed = this.props.rows.length * this.props.cellHeight;
    return {
      available,
      scrollBarWidth: needed > available ? this.scrollBarWidth() : 0,
    };
  }
  handleScroll = (e) => {
    const { scrollLeft } = e.target;
    this.setState({
      scrollLeftPosition: -scrollLeft,
    });
  }
  handleTouchEnd = () => {
    this.touched = false;
  }
  handleTouchMove = (e) => {
    if (this.touched) {
      const { firstColumn, maxBodyWidth } = this.props;
      const scrollLeft = this.touchStart - e.touches[0].clientX;
      this.touchStart = e.touches[0].clientX;
      this.setState(({ scrollLeftPosition }) => {
        const minWidth = maxBodyWidth - (this.bodyRef.current.clientWidth - firstColumn.width);
        if (minWidth <= 0) {
          return {};
        }
        let newPosition = scrollLeftPosition - scrollLeft;
        if (newPosition > 0) {
          newPosition = 0;
        } else if (newPosition < -minWidth) {
          newPosition = -minWidth;
        }
        return {
          scrollLeftPosition: newPosition,
        };
      });
    }
  }
  handleTouchStart = (e) => {
    this.touched = true;
    this.touchStart = e.touches[0].clientX;
  }
  scrollBarWidth = () => (
    this.tableRef.current.clientWidth - this.bodyRef.current.clientWidth
  )
  render() {
    return (
      <Table
        bodyRef={this.bodyRef}
        bodyInnerWidth={this.state.bodyInnerWidth}
        bodyWidth={this.state.bodyWidth}
        cellHeight={this.props.cellHeight}
        columns={this.props.columns}
        columnOrder={this.props.columnOrder}
        columnTemplate={this.props.columnTemplate}
        firstColumn={this.props.firstColumn}
        handleScroll={this.handleScroll}
        handleTouchMove={this.handleTouchMove}
        handleTouchStart={this.handleTouchStart}
        height={this.state.height}
        maxBodyWidth={this.props.maxBodyWidth}
        rows={this.props.rows}
        scrollLeftOffset={this.state.scrollLeftOffset}
        scrollLeftPosition={this.state.scrollLeftPosition}
        scrollLeftWidth={this.state.scrollLeftWidth}
        scrollTop={this.state.scrollTop}
        tableHeaderRef={this.tableHeaderRef}
        tableRef={this.tableRef}
      />
    );
  }
}

TableContainer.defaultProps = {
  bottom: 0,
  cellHeight: 35,
  columnTemplate: 'auto',
  maxBodyWidth: 500,
};

TableContainer.propTypes = {
  bottom: PropTypes.number,
  cellHeight: PropTypes.number,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      contentAlign: PropTypes.string,
      name: PropTypes.string,
      sortable: PropTypes.bool,
      sortDir: PropTypes.string,
      sortKey: PropTypes.string,
    }),
  ).isRequired,
  columnOrder: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  columnTemplate: PropTypes.string,
  firstColumn: PropTypes.shape({
    minWidth: PropTypes.number,
    name: PropTypes.string,
    width: PropTypes.number,
  }).isRequired,
  maxBodyWidth: PropTypes.number,
  rows: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

export default TableContainer;
