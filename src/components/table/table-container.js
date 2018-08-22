import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Table from './table';

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.bodyRef = React.createRef();
    this.firstColumnRef = React.createRef();
    this.tableRef = React.createRef();
    this.state = {
      height: 0,
      scrollTop: 0,
    };
  }
  componentDidMount = () => {
    this.setState({
      height: this.calculateHeight(),
    });
  }
  calculateHeight = () => {
    const { top } = this.tableRef.current.getBoundingClientRect();
    return window.innerHeight - top - this.props.bottom - 48;
  };
  handleScroll = () => {
    this.firstColumnRef.current.scrollTop = this.bodyRef.current.scrollTop;
  }
  render() {
    return (
      <Table
        bodyRef={this.bodyRef}
        columns={this.props.columns}
        columnOrder={this.props.columnOrder}
        columnTemplate={this.props.columnTemplate}
        firstColumn={this.props.firstColumn}
        firstColumnRef={this.firstColumnRef}
        handleScroll={this.handleScroll}
        height={this.state.height}
        rows={this.props.rows}
        scrollTop={this.state.scrollTop}
        tableRef={this.tableRef}
      />
    );
  }
}

TableContainer.defaultProps = {
  bottom: 0,
};

TableContainer.propTypes = {
  bottom: PropTypes.number,
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
  columnTemplate: PropTypes.string.isRequired,
  firstColumn: PropTypes.shape({
    minWidth: PropTypes.number,
    name: PropTypes.string,
    width: PropTypes.string,
  }).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

export default TableContainer;
