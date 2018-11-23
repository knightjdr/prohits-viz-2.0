import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Rows from './heatmap-svg__rows';
import setFontSize from '../font-size/font-size';
import trimText from '../helpers/trim-text';

export class RowsContainer extends Component {
  constructor(props) {
    super(props);
    const {
      cellSize,
      pageHeight,
      rows,
      position,
    } = this.props;
    const fontSize = setFontSize(cellSize);
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
      updateID,
    } = nextProps;
    this.updateFontSize(cellSize, this.props.cellSize, rows);
    this.updatePage(
      position,
      this.props.position,
      pageHeight,
      this.props.pageHeight,
      sortID,
      this.props.sortID,
      updateID,
      this.props.updateID,
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
      updateID,
    } = nextProps;
    return (
      updateID !== this.props.updateID ||
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
    names.map(name => trimText(name, 'Lato', `${fontSize}px`, 98))
  )
  fontSize = cellSize => cellSize * 0.6
  openMenu = (e, target) => {
    this.props.openContextMenu(e, target, 'row');
  }
  updateFontSize = (cellSize, prevCellSize, rows) => {
    if (cellSize !== prevCellSize) {
      const fontSize = setFontSize(cellSize);
      this.setState({
        fontSize,
        names: this.checkRowSize(rows, fontSize),
      });
    }
  }
  updatePage = (
    y,
    prevY,
    pageHeight,
    prevPageHeight,
    sortId,
    prevSortId,
    updateID,
    prevUpdateID,
    rows,
  ) => {
    if (
      updateID !== prevUpdateID ||
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
        openContextMenu={this.openMenu}
        search={this.props.search}
        toggleTooltip={this.props.toggleTooltip}
      />
    );
  }
}

RowsContainer.defaultProps = {
  sortID: null,
  updateID: null,
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
  updateID: PropTypes.number,
};

export default RowsContainer;
