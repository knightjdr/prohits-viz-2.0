import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Rows from './heatmap-svg__rows';
import TrimText from '../helpers/trim-text';

export class RowsContainer extends Component {
  constructor(props) {
    super(props);
    const {
      cellSize,
      pageHeight,
      rows,
      position,
    } = this.props;
    const fontSize = this.fontSize(cellSize);
    this.state = {
      fontSize,
      names: this.checkRowSize(
        this.getPage(rows, position, pageHeight),
        fontSize,
      ),
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const {
      cellSize,
      pageHeight,
      position,
      rows,
      sortID,
    } = nextProps;
    this.updateFontSize(cellSize, this.props.cellSize, rows);
    this.updatePage(
      position,
      this.props.position,
      pageHeight,
      this.props.pageHeight,
      sortID,
      this.props.sortID,
      rows,
    );
  }
  shouldComponentUpdate = (nextProps) => {
    const {
      cellSize,
      pageHeight,
      position,
      search,
      sortID,
    } = nextProps;
    return (
      cellSize !== this.props.cellSize ||
      pageHeight !== this.props.pageHeight ||
      position !== this.props.position ||
      sortID !== this.props.sortID ||
      search.match !== this.props.search.match
    );
  }
  getPage = (rows, y, pageHeight) => {
    const pageEnd = y + pageHeight;
    return rows.slice(y, pageEnd);
  }
  checkRowSize = (names, fontSize) => (
    names.map(name => TrimText(name, 'BodyText', `${fontSize}px`, 98))
  )
  fontSize = cellSize => cellSize * 0.6
  updateFontSize = (cellSize, prevCellSize, rows) => {
    if (cellSize !== prevCellSize) {
      const fontSize = this.fontSize(cellSize);
      this.setState({
        fontSize,
        names: this.checkRowSize(rows, fontSize),
      });
    }
  }
  updatePage = (y, prevY, pageHeight, prevPageHeight, sortId, prevSortId, rows) => {
    if (
      y !== prevY ||
      pageHeight !== prevPageHeight ||
      sortId !== prevSortId
    ) {
      this.setState(({ fontSize }) => ({
        names: this.checkRowSize(
          this.getPage(rows, y, pageHeight),
          fontSize,
        ),
      }));
    }
  }
  render() {
    return (
      <Rows
        cellSize={this.props.cellSize}
        fontSize={this.state.fontSize}
        handleClick={this.props.handleClick}
        names={this.state.names}
        openContextMenu={this.props.openContextMenu}
        search={this.props.search}
        toggleTooltip={this.props.toggleTooltip}
      />
    );
  }
}

RowsContainer.defaultProps = {
  sortID: null,
};

RowsContainer.propTypes = {
  cellSize: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  openContextMenu: PropTypes.func.isRequired,
  pageHeight: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  search: PropTypes.shape({
    match: PropTypes.bool,
    rows: PropTypes.shape({}),
    term: PropTypes.string,
  }).isRequired,
  sortID: PropTypes.number,
  toggleTooltip: PropTypes.func.isRequired,
};

export default RowsContainer;
