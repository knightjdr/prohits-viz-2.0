import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Table from './table';

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.state = {
      height: 0,
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
  render() {
    return (
      <Table
        columns={this.props.columns}
        columnOrder={this.props.columnOrder}
        height={this.state.height}
        rows={this.props.rows}
        setRef={this.tableRef}
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
  rows: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

export default TableContainer;
