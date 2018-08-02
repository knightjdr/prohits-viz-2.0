import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ColumnsSelector from '../../../../state/selectors/visualization/columns-selector';
import Columns from './heatmap-svg__columns';
import DimensionsSelector from '../../../../state/selectors/visualization/dimension-selector';
import PositionSelector from '../../../../state/selectors/visualization/position-selector';
import SearchSelector from '../../../../state/selectors/visualization/search-selector';
import SettingSelector from '../../../../state/selectors/visualization/settings-selector';
import TrimText from '../helpers/trim-text';

export class ColumnsContainer extends Component {
  constructor(props) {
    super(props);
    const {
      cellSize,
      columns,
      dimensions,
      position,
    } = this.props;
    const fontSize = this.fontSize(cellSize);
    this.state = {
      fontSize,
      names: this.checkColumnSize(
        this.getPage(columns.names, position.x, dimensions.pageX),
        fontSize,
      ),
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const {
      cellSize,
      columns,
      dimensions,
      position,
    } = nextProps;
    this.updateFontSize(cellSize, this.props.cellSize, columns);
    this.updatePage(
      position.x,
      this.props.position.x,
      dimensions.pageX,
      this.props.dimensions.pageX,
      columns.names,
    );
  }
  shouldComponentUpdate = (nextProps) => {
    const {
      cellSize,
      columns,
      dimensions,
      position,
      search,
    } = nextProps;
    return (
      cellSize !== this.props.cellSize ||
      columns.ref !== this.props.columns.ref ||
      dimensions.pageX !== this.props.dimensions.pageX ||
      position.x !== this.props.position.x ||
      search.match
    );
  }
  getPage = (names, x, pageX) => {
    const pageEnd = x + pageX;
    return names.slice(x, pageEnd);
  }
  checkColumnSize = (names, fontSize) => (
    names.map(name => TrimText(name, 'BodyText', `${fontSize}px`, 98))
  )
  fontSize = cellSize => cellSize * 0.6
  updateFontSize = (cellSize, prevCellSize, columns) => {
    if (cellSize !== prevCellSize) {
      const fontSize = this.fontSize(cellSize);
      this.setState({
        fontSize,
        names: this.checkColumnSize(columns.names, fontSize),
      });
    }
  }
  updatePage = (x, prevX, pageX, prevPageX, names) => {
    if (x !== prevX || pageX !== prevPageX) {
      this.setState(({ fontSize }) => ({
        names: this.checkColumnSize(
          this.getPage(names, x, pageX),
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
        openContextMenu={this.props.openContextMenu}
        search={this.props.search}
        sortRows={this.props.sortRows}
        reference={this.props.columns.ref}
        toggleTooltip={this.props.toggleTooltip}
      />
    );
  }
}

ColumnsContainer.propTypes = {
  cellSize: PropTypes.number.isRequired,
  columns: PropTypes.shape({
    names: PropTypes.arrayOf(PropTypes.string),
    ref: PropTypes.string,
  }).isRequired,
  dimensions: PropTypes.shape({
    pageX: PropTypes.number,
  }).isRequired,
  openContextMenu: PropTypes.func.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
  }).isRequired,
  search: PropTypes.shape({
    columns: PropTypes.shape({}),
    match: PropTypes.bool,
    term: PropTypes.string,
  }).isRequired,
  sortRows: PropTypes.func.isRequired,
  toggleTooltip: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  cellSize: SettingSelector(state, 'cellSize'),
  columns: ColumnsSelector(state),
  dimensions: DimensionsSelector(state),
  position: PositionSelector(state),
  search: SearchSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(ColumnsContainer);

export default ConnectedContainer;
