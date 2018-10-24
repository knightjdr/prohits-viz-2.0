import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Columns from './heatmap-svg__columns';
import setFontSize from '../font-size/font-size';
import trimText from '../helpers/trim-text';

export class ColumnsContainer extends Component {
  constructor(props) {
    super(props);
    const {
      cellSize,
      columns,
      pageWidth,
      position,
    } = this.props;
    const fontSize = setFontSize(cellSize);
    this.state = {
      fontSize,
      names: this.checkColumnSize(
        this.getPage(columns.names, position, pageWidth),
        fontSize,
      ),
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const {
      cellSize,
      columns,
      pageWidth,
      position,
      updateID,
    } = nextProps;
    this.updateFontSize(cellSize, this.props.cellSize, columns);
    this.updatePage(
      position,
      this.props.position,
      pageWidth,
      this.props.pageWidth,
      updateID,
      this.props.updateID,
      columns.names,
    );
  }
  shouldComponentUpdate = (nextProps) => {
    const {
      cellSize,
      columns,
      pageWidth,
      position,
      search,
      updateID,
    } = nextProps;
    return (
      updateID !== this.props.updateID ||
      cellSize !== this.props.cellSize ||
      columns.ref !== this.props.columns.ref ||
      pageWidth !== this.props.pageWidth ||
      position !== this.props.position ||
      search.match !== this.props.search.match
    );
  }
  getPage = (names, x, pageWidth) => {
    const pageEnd = x + pageWidth;
    return names.slice(x, pageEnd);
  }
  checkColumnSize = (names, fontSize) => (
    names.map(name => trimText(name, 'BodyText', `${fontSize}px`, 98))
  )
  openMenu = (e, target) => {
    this.props.openContextMenu(e, target, 'column');
  }
  updateFontSize = (cellSize, prevCellSize, columns) => {
    if (cellSize !== prevCellSize) {
      const fontSize = setFontSize(cellSize);
      this.setState({
        fontSize,
        names: this.checkColumnSize(columns.names, fontSize),
      });
    }
  }
  updatePage = (x, prevX, pageWidth, prevPageWidth, updateID, prevUpdateID, names) => {
    if (
      updateID !== prevUpdateID ||
      x !== prevX ||
      pageWidth !== prevPageWidth
    ) {
      this.setState(({ fontSize }) => ({
        names: this.checkColumnSize(
          this.getPage(names, x, pageWidth),
          fontSize,
        ),
      }));
    }
  }
  render() {
    return (
      <Columns
        cellSize={this.props.cellSize}
        fontSize={this.state.fontSize}
        names={this.state.names}
        openContextMenu={this.openMenu}
        search={this.props.search}
        handleClick={this.props.handleClick}
        reference={this.props.columns.ref}
        toggleTooltip={this.props.toggleTooltip}
      />
    );
  }
}

ColumnsContainer.defaultProps = {
  updateID: null,
};

ColumnsContainer.propTypes = {
  cellSize: PropTypes.number.isRequired,
  columns: PropTypes.shape({
    names: PropTypes.arrayOf(PropTypes.string),
    ref: PropTypes.string,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  openContextMenu: PropTypes.func.isRequired,
  pageWidth: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  search: PropTypes.shape({
    columns: PropTypes.shape({}),
    match: PropTypes.bool,
    term: PropTypes.string,
  }).isRequired,
  toggleTooltip: PropTypes.func.isRequired,
  updateID: PropTypes.number,
};

export default ColumnsContainer;
